const apiUrl =
  typeof process !== 'undefined' && process.env?.['BITE_API_URL']
    ? process.env['BITE_API_URL']
    : '';

export const environment = {
  production: false,
  apiUrl,
};
