

import credential from './interfaces/credential';
import createDatabase from './lib/create-database';
import wrapWithLoadToken from './utils/wrap-with-load-token';

const library = {
  createDatabase,
};

module.exports = (credential: credential): Object => {
  const { clientID, clientSecret, refreshToken } = credential;

  if (!clientID || !clientSecret || !refreshToken) {
    throw new Error('clientID, clientSecret, refreshToken cannot be found');
  }

  return {
    createDatabase: wrapWithLoadToken(credential, library.createDatabase),
  };
};
