const rawApiUrl =
  (typeof process !== 'undefined' && process.env?.['BITE_API_URL']) ||
  (typeof globalThis !== 'undefined' && (globalThis as any).BITE_API_URL) ||
  '';

const apiUrl = rawApiUrl ? rawApiUrl.replace(/\/+$/, '') : '';

export const environment = {
  production: true,
  apiUrl,
};
