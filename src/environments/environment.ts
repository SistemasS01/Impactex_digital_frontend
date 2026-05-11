const rawApiUrl =
  (typeof process !== 'undefined' && process.env?.['BITE_API_URL']) ||
  (typeof globalThis !== 'undefined' && (globalThis as any).BITE_API_URL) ||
  'http://impactex-web-api.runasp.net'; // Backend que sí responde en local/dev

const apiUrl = rawApiUrl ? rawApiUrl.replace(/\/+$/, '') : '';

export const environment = {
  production: false,
  apiUrl,
};
