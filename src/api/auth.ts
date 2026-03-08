const TOKEN_KEY = 'ats_token';
const API_URL_KEY = 'ats_api_url';
const DEMO_AUTH_KEY = 'ats_demo_auth';

export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token: string, apiBaseUrl?: string): void {
  localStorage.setItem(TOKEN_KEY, token);
  if (apiBaseUrl != null && apiBaseUrl !== '') {
    localStorage.setItem(API_URL_KEY, apiBaseUrl.replace(/\/$/, ''));
  }
}

export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

export function getStoredApiUrl(): string | null {
  return localStorage.getItem(API_URL_KEY);
}

export function isDemoAuthenticated(): boolean {
  return localStorage.getItem(DEMO_AUTH_KEY) === '1';
}

export function setDemoAuthenticated(isAuthenticated: boolean): void {
  if (isAuthenticated) {
    localStorage.setItem(DEMO_AUTH_KEY, '1');
  } else {
    localStorage.removeItem(DEMO_AUTH_KEY);
  }
}
