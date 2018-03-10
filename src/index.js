const createDatabase = require('../src/lib/create-database');

module.exports = async (clientID, clientSecret, refreshToken) => {
  const credential = { clientID, clientSecret, refreshToken };
  const sgd = require('selfish-google-drive')(credential);
  const { access_token } = await sgd.loadToken()

  
};
