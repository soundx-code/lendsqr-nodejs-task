require('dotenv/config');

const jwt_config = {
  key: process.env.APP_SECRET_KEY || 'lendsqrsecret',
};

module.exports = jwt_config
