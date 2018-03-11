const Bluebird = require('bluebird');
const request = Bluebird.promisify(require('request'));

import { Url } from '../utils/constant';
import Database from '../interfaces/database';

export default (accessToken: string, database: Database) =>
  Bluebird.resolve()
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
        url: Url.createSpreadSheetUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        json: spreadSheet,
      });
    });
