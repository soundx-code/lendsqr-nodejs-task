const { check } = require('express-validator');
const database = require('../config/database')

 
const register = [
    check('first_name', 'First name is required. Please try again :)').not().isEmpty(),
    check('last_name', 'Last name is required. Please try again :)').not().isEmpty(),
    check('phone_number', 'Please provide a valid phone number').custom(value => {
        return database.select('*').from('users').where('phone_number', value).first().then(user => {
          if (user) {
            return Promise.reject('Phone Number exists');
          }
        })}),
    check('password', 'Password must not be less than 6 characters. Please try again :)').isLength({ min: 6 })
]

const login = [
    check('phone_number', 'Please provide a valid phone number. Please try again :)').not().isEmpty(),
    check('password', 'Password Invalid').isLength({ min: 6 })
]

module.exports = {
  register,
  login
  };