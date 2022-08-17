require('dotenv/config');

const environment = process.env.NODE_ENV || 'development';   
const config = require('../knexfile')[environment];   
const database = require('knex')(config);
const { attachPaginate } = require('knex-paginate');
attachPaginate();

module.exports = database