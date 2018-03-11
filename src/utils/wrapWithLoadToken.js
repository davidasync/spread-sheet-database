// @flow

/* ::
type credential = {
  clientID: string,
  clientSecret: string,
  refreshToken: string
};
*/

const sgd = require('selfish-google-drive');
const { get } = require('lodash');
const { reject } = require('bluebird');

const MAX_ERROR_TRY = 3;

module.exports = (credential /* :credential */, func /* :function */) =>
  (paramObject /* :any */) => {
    const { loadToken } = sgd(credential);
    const closure = {};
    closure.maxTry = MAX_ERROR_TRY;
    const wrappedFunction = shouldRefreshToken => loadToken(shouldRefreshToken)
      .then(response => get(response, 'access_token'))
      .then(accessToken => func(accessToken, paramObject))
      .then((response) => {
        const responseStatus = response.status || response.statusCode;

        if (responseStatus >= 400) {
          if (responseStatus !== 401) {
            return reject(response.message || response.error || response);
          }

          if (closure.maxTry <= 0) {
            return reject('Max try already exceeded');
          }

          closure.maxTry -= 1;
          // Force func load token to refresh token
          return wrappedFunction(true);
        }

        return get(response, 'body') || response;
      });

    return wrappedFunction();
  };
