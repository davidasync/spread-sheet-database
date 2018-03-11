/* @flow */

/* ::
type database = {
  dbname: string,
  tables: Array<String>
};
*/

const { map } = require('lodash');
const Bluebird = require('bluebird');
const request = Bluebird.promisify(require('request'));

const { spreadsheet } = require('../utils/constant');

module.exports = (accessToken /* : string */, database /* : database */) /* : Promise<Object> */ =>
  Bluebird.resolve()
    .then(async () => {
      const { dbname, tables } = database;

      const sheetProperties = map(tables, table => ({
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
        url: spreadsheet.createUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        json: spreadSheet,
      });
    });
