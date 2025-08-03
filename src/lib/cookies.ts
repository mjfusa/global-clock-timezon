/**
 * Cookie utility functions for persisting user preferences
 * Provides a fallback mechanism when KV storage is unavailable
 */

export interface CookieOptions {
  expires?: number; // Days until expiration
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'strict' | 'lax' | 'none';
}

const DEFAULT_COOKIE_OPTIONS: CookieOptions = {
  expires: 365, // 1 year
  path: '/',
  sameSite: 'lax'
};

/**
 * Set a cookie value
 */
export function setCookie(name: string, value: string, options: CookieOptions = {}): void {
  const opts = { ...DEFAULT_COOKIE_OPTIONS, ...options };
  
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
  
  if (opts.expires) {
    const date = new Date();
    date.setTime(date.getTime() + (opts.expires * 24 * 60 * 60 * 1000));
    cookieString += `; expires=${date.toUTCString()}`;
  }
  
  if (opts.path) {
    cookieString += `; path=${opts.path}`;
  }
  
  if (opts.domain) {
    cookieString += `; domain=${opts.domain}`;
  }
  
  if (opts.secure) {
    cookieString += `; secure`;
  }
  
  if (opts.sameSite) {
    cookieString += `; samesite=${opts.sameSite}`;
  }
  
  document.cookie = cookieString;
}

/**
 * Get a cookie value
 */
export function getCookie(name: string): string | null {
  const nameEQ = encodeURIComponent(name) + '=';
  const cookies = document.cookie.split(';');
  
  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }
  
  return null;
}

/**
 * Delete a cookie
 */
export function deleteCookie(name: string, options: Omit<CookieOptions, 'expires'> = {}): void {
  setCookie(name, '', { ...options, expires: -1 });
}

/**
 * Check if cookies are enabled in the browser
 */
export function areCookiesEnabled(): boolean {
  try {
    setCookie('test', 'test', { expires: 1 });
    const enabled = getCookie('test') === 'test';
    if (enabled) {
      deleteCookie('test');
    }
    return enabled;
  } catch {
    return false;
  }
}

/**
 * Store a JSON object as a cookie
 */
export function setCookieJSON<T>(name: string, value: T, options?: CookieOptions): void {
  try {
    const jsonString = JSON.stringify(value);
    setCookie(name, jsonString, options);
  } catch (error) {
    console.warn('Failed to serialize value to JSON for cookie:', error);
  }
}

/**
 * Retrieve a JSON object from a cookie
 */
export function getCookieJSON<T>(name: string, defaultValue: T): T {
  try {
    const value = getCookie(name);
    if (value === null) {
      return defaultValue;
    }
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn('Failed to parse JSON from cookie:', error);
    return defaultValue;
  }
}