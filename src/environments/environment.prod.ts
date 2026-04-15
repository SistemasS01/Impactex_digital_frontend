const apiUrl =
  typeof process !== 'undefined' && process.env?.['BITE_API_URL']
    ? process.env['BITE_API_URL']
    : 'https://api.corporacionimpactex.com';

export const environment = {
  production: true,
  apiUrl,
};
