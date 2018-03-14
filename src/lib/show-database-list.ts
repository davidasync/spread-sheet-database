const { get } = require('lodash');

import constant from '../utils/constant';

import sgdResponse from '../interfaces/sgd-response';

export default (findFunction: Function) =>
  findFunction({ mimeType: constant.spreadSheetMimeType })
    .then((response: sgdResponse) => get(response, 'files'));
