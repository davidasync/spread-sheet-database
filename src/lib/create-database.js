/* @flow */

const Bluebird = require('bluebird');
const request = Bluebird.promisify(require('request'));

const { spreadsheet } = require('../utils/constant');

module.exports = (accessToken /* : string */, dbname /* : string */) /* : Promise<any> */ =>
  Bluebird.resolve()
    .then(async () => {
      const requestObject = {
        properties: {
          title: dbname,
        },
      };

      return request({
        method: 'POST',
        url: spreadsheet.createUrl,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        json: requestObject,
      });
    });
