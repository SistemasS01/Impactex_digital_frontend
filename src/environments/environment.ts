const apiUrl =
  typeof process !== 'undefined' && process.env?.['BITE_API_URL']
    ? process.env['BITE_API_URL']
    : 'http://localhost:5118';

export const environment = {
  production: false,
  apiUrl,
};
