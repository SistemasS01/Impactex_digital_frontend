export const environment = {
  production: true,
  apiUrl: process.env?.['BITE_API_URL'] || (globalThis as any).BITE_API_URL || '',
};
