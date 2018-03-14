const bluebird = require('bluebird');
const request = bluebird.promisify(require('request'));

import constant from '../utils/constant';

export default (accessToken: string, tables: [string], databaseId: string) =>
  bluebird.resolve()
    .then(() => {
      const requestCreateSheet = tables.map((table) => {
        return {
          addSheet: {
            properties: {
              title: table,
            },
          },
        };
      });

      const requestObject = {
        requests: requestCreateSheet,
      };

      const endPoint = `${constant.batchUpdateUrl}/${databaseId}:batchUpdate`;

      return request({
        method: 'POST',
        url: endPoint,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        json: requestObject,
      });
    });
