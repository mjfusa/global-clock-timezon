import { useState, useEffect, useCallback } from 'react';
import { useKV } from '@github/spark/hooks';
import { setCookieJSON, getCookieJSON, areCookiesEnabled } from '@/lib/cookies';

/**
 * Hybrid persistence hook that uses both KV storage (primary) and cookies (fallback)
 * Provides better reliability across different environments and browser states
 */
export function usePersistentState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((current: T) => T)) => void, () => void] {
  // Primary storage using KV
  const [kvValue, setKvValue, deleteKvValue] = useKV(key, defaultValue);
  
  // Track if we've initialized from cookies
  const [initialized, setInitialized] = useState(false);
  
  // Check cookie support on mount
  const [cookiesSupported] = useState(() => areCookiesEnabled());
  
  // Initialize from cookies if KV is empty and cookies are available
  useEffect(() => {
    if (initialized || !cookiesSupported) return;
    
    // Only read from cookies if KV appears to be at default value
    // This prevents overriding intentionally set KV values
    const cookieValue = getCookieJSON(`tz-${key}`, null);
    
    if (cookieValue !== null && JSON.stringify(kvValue) === JSON.stringify(defaultValue)) {
      setKvValue(cookieValue);
    }
    
    setInitialized(true);
  }, [initialized, cookiesSupported, key, kvValue, defaultValue, setKvValue]);
  
  // Enhanced setter that writes to both storages
  const setValue = useCallback((value: T | ((current: T) => T)) => {
    const newValue = typeof value === 'function' 
      ? (value as (current: T) => T)(kvValue)
      : value;
    
    // Update KV storage (primary)
    setKvValue(newValue);
    
    // Update cookie (fallback) if supported
    if (cookiesSupported) {
      setCookieJSON(`tz-${key}`, newValue, {
        expires: 365, // 1 year
        sameSite: 'lax'
      });
    }
  }, [kvValue, setKvValue, key, cookiesSupported]);
  
  // Enhanced delete function
  const deleteValue = useCallback(() => {
    deleteKvValue();
    
    if (cookiesSupported) {
      // Set cookie to default value rather than deleting
      // This maintains consistency with KV behavior
      setCookieJSON(`tz-${key}`, defaultValue, {
        expires: 365,
        sameSite: 'lax'
      });
    }
  }, [deleteKvValue, key, defaultValue, cookiesSupported]);
  
  return [kvValue, setValue, deleteValue];
}