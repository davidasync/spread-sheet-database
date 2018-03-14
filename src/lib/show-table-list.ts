const { flowRight, get } = require('lodash');
const bluebird = require('bluebird');

import getDatabaseById from './get-database-by-id';

export default (accessToken: string, id: string): Promise<Object> =>
  bluebird.resolve()
    .then(() => getDatabaseById(accessToken, id))
    .then((response: any) => {
      const responseStatus = response.status || response.statusCode;

      if (responseStatus !== 200) {
        return bluebird.reject(response);
      }

      const parsedBody = JSON.parse(response.body);
      const tables = get(parsedBody, 'sheets');

      return {
        body: tables,
        status: responseStatus,
      };
    });
