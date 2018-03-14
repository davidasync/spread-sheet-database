const bluebird = require('bluebird');
const request = bluebird.promisify(require('request'));

import constant from '../utils/constant';

import database from '../interfaces/database';

export default (accessToken: string, database: database): Promise<Object> =>
  bluebird.resolve()
    .then(async () => {
      const { dbname, tables } = database;

      const sheetProperties = tables.map(table => ({
        properties: {
          title: table,
        },
      }));

      const spreadSheet = {
        properties: {
          title: dbname,
        },
        sheets: sheetProperties,
      };

      return request({
        method: 'POST',
        url: constant.createSpreadSheetUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        json: spreadSheet,
      });
    });
