const bluebird = require('bluebird');
const request = bluebird.promisify(require('request'));

import constant from '../utils/constant';

export default (accessToken: string, id: string): Promise<Object> =>
  bluebird.resolve()
    .then(() => {
      const endPoint = `${constant.getSpreadSheetByIdUrl}/${id}`;

      return request({
        method: 'GET',
        url: endPoint,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    });
