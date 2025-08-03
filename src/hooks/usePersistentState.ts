import { useState, useEffect, useCallback } from 'react';
import { useKV } from '@github/spark/hooks';
import { setCookieJSON, getCookieJSON, areCookiesEnabled } from '@/lib/cookies';

/**
 * Hybrid persistence hook that uses both KV storage (primary) and cookies (fallback)
 * Provides better reliability across different environments and browser states
 * Cookie backup is enabled by default for better persistence.
 */
export function usePersistentState<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((current: T) => T)) => void, () => void] {
  // Primary storage using KV
  const [kvValue, setKvValue, deleteKvValue] = useKV(key, defaultValue);
  
  // Check cookie support - always enabled by default
  const [cookiesSupported] = useState(() => areCookiesEnabled());
  
  // Initialize from cookies if available and KV is at default
  useEffect(() => {
    if (!cookiesSupported) return;
    
    const cookieValue = getCookieJSON(`tz-${key}`, null);
    
    if (cookieValue !== null && JSON.stringify(kvValue) === JSON.stringify(defaultValue)) {
      setKvValue(cookieValue);
    }
  }, [cookiesSupported, key, kvValue, defaultValue, setKvValue]);
  
  // Enhanced setter that writes to both storages
  const setValue = useCallback((value: T | ((current: T) => T)) => {
    const newValue = typeof value === 'function' 
      ? (value as (current: T) => T)(kvValue)
      : value;
    
    // Update KV storage (primary)
    setKvValue(newValue);
    
    // Update cookie (fallback) - always enabled
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