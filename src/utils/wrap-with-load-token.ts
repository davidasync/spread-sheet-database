
const sgd = require('selfish-google-drive');
const { get } = require('lodash');
const { reject } = require('bluebird');

import credential from '../interfaces/credential';
import sgdToken from '../interfaces/sgd-token';

const MAX_ERROR_TRY = 3;

export default (credential: credential, func: Function, options?: any) => 
  (paramObject: Object) => {
    const { loadToken } = sgd(credential);
    const closure = {
      maxTry: 0,
    };

    const params = paramObject || options;

    closure.maxTry = MAX_ERROR_TRY;

    const wrappedFunction = (shouldRefreshToken: Boolean) => loadToken(shouldRefreshToken)
      .then((response: sgdToken) => get(response, 'access_token'))
      .then((accessToken: string) => func(accessToken, params, options))
      .then((response: any) => {
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
      })
      .catch((response:any) => {
        return response.message || response.body || response.error || response;
      });

    return wrappedFunction(false);
  };
