/* @flow */

/* ::
type credential = {
  clientID: string,
  clientSecret: string,
  refreshToken: string
};
*/

const createDatabase = require('../src/lib/create-database');

const wrapWithLoadToken = require('./utils/wrapWithLoadToken');

const library = {
  createDatabase,
};

module.exports = (credential /* :credential */) /* :any */ => {
  const { clientID, clientSecret, refreshToken } = credential;

  if (!clientID || !clientSecret || !refreshToken) {
    throw new Error('clientID, clientSecret, refreshToken cannot be found');
  }

  return {
    createDatabase: wrapWithLoadToken(credential, library.createDatabase),
  };
};
