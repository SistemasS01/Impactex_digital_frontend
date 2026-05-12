const normalizeApiUrl = (value: string): string => {
  const trimmed = value.trim().replace(/\/+$/, '');
  if (!trimmed) {
    return '';
  }

  return trimmed.endsWith('/api') ? trimmed : `${trimmed}/api`;
};

const rawApiUrl =
  (typeof process !== 'undefined' && process.env?.['BITE_API_URL']) ||
  (typeof globalThis !== 'undefined' && (globalThis as any).BITE_API_URL) ||
  'http://impactex-web-api.runasp.net'; // Backend cloud para desarrollo local

export const environment = {
  production: false,
  apiUrl: normalizeApiUrl(rawApiUrl),
};
