const Bluebird = require('bluebird');
// const request = Bluebird.promisifyAll(require('request'));
const request = Bluebird.promisify(require('request'));

const { spreadsheet } = require('../utils/constant');

module.exports = (accessToken, dbname) => Bluebird.resolve()
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
