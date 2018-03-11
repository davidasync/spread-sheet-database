/* @flow */

const { mapValues, get } = require('lodash');
const Bluebird = require('bluebird');

const createDatabase = require('../src/lib/create-database');
const sgd = require('selfish-google-drive');

const MAX_ERROR_TRY = 3;
const library = {
  createDatabase,
};

/* ::
type credential = {
  clientID: string,
  clientSecret: string,
  refreshToken: string
};
*/

module.exports = (credential /* :credential */) /* :Promise<Array<function>> */ => {
  const { clientID, clientSecret, refreshToken } = credential;

  if (!clientID || !clientSecret || !refreshToken) {
    throw new Error('clientID, clientSecret, refreshToken cannot be found');
  }

  const { loadToken } = sgd(credential);

  return mapValues(library, _func => (param) => {
    const func = shouldRefreshToken => loadToken(credential, shouldRefreshToken)
      .then(response => get(response, 'access_token'))
      .then(accessToken => _func(accessToken, param))
      .then(response => get(response, 'body') || response);

    const closure = {};

    closure.maxTry = MAX_ERROR_TRY;

    return func()
      .catch((response) => {
        const responseStatus = response.status || response.statusCode;

        // 401 can happened because access token already expired
        if (responseStatus !== 401) {
          return Bluebird.reject(response.message || response.error || response);
        }

        if (closure.maxTry <= 0) {
          return Bluebird.reject('Max try already exceeded');
        }

        closure.maxTry -= 1;

        // Force func load token to refresh token
        return func(true);
      });
  });
};
