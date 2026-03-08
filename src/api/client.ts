import { getToken, getStoredApiUrl, removeToken } from './auth';

function getBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_API_URL?.replace(/\/$/, '') || '';
  if (fromEnv) return fromEnv;
  return getStoredApiUrl() || '';
}

export type AuthInvalidateCallback = () => void;
let onAuthInvalidate: AuthInvalidateCallback | null = null;

export function setAuthInvalidateCallback(cb: AuthInvalidateCallback) {
  onAuthInvalidate = cb;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const url = `${getBaseUrl()}/api${path}`;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(options.headers as Record<string, string>),
  };
  const token = getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  const res = await fetch(url, { ...options, headers });
  if (res.status === 401) {
    removeToken();
    onAuthInvalidate?.();
    throw new Error('Sesión expirada o no autorizada');
  }
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export const api = {
  get: <T>(path: string) => request<T>(path),
  post: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'POST', body: JSON.stringify(body) }),
  put: <T>(path: string, body: unknown) =>
    request<T>(path, { method: 'PUT', body: JSON.stringify(body) }),
  delete: (path: string) => request<void>(path, { method: 'DELETE' }),
};

export function isApiEnabled(): boolean {
  return Boolean(getBaseUrl());
}
