const _ = require('lodash');

const sgd = require('selfish-google-drive');

import credential from './interfaces/credential';

import createDatabase from './lib/create-database';
import showDatabaseList from './lib/show-database-list';
import getDatabaseByName from './lib/get-database-by-name';
import getDatabaseById from './lib/get-database-by-id';
import createTable from './lib/create-table';
import showTableList from './lib/show-table-list';

import wrapWithLoadToken from './utils/wrap-with-load-token';

module.exports = (credential: credential): Object => {
  const { clientID, clientSecret, refreshToken } = credential;

  if (!clientID || !clientSecret || !refreshToken) {
    throw new Error('clientID, clientSecret, refreshToken cannot be found');
  }

  const { find } = sgd(credential);

  return {
    getDatabaseByName: (name: string) => getDatabaseByName(find, name),
    showDatabaseList: () => showDatabaseList(find),
    createDatabase: wrapWithLoadToken(credential, createDatabase),
    getDatabaseById: wrapWithLoadToken(credential, getDatabaseById),
    useDatabase: (databaseId: string) => {
      return {
        createTable: wrapWithLoadToken(credential, createTable, databaseId),
        showTableList: wrapWithLoadToken(credential, showTableList, databaseId),
      };
    },
  };
};
