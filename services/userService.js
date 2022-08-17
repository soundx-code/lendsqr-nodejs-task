const db = require('../config/database')
const bcrypt = require('bcryptjs')
const jwtConfig = require("../config/jwt");

/**
 * Create a new User
 * @param {Object} userData
 * @returns {Promise<User>}
 */

const createUser = async(userData) => {

    const {first_name, last_name, phone_number, password } = userData
    const hashPassword = await bcrypt.hashSync(password, 10)

    const user = await db('users').insert( {first_name, last_name, phone_number, password: hashPassword })
    return user
}

  
/**
 * Find User By Phone Number
 * @param {String} phone_number
 * @returns {Promise<User>}
 */

const findUserByPhone = async(phone_number) => {
    const user = await db.select('*').from('users').where('phone_number', phone_number).first()
    return user
}

/**
 * Get User Profile
 * @param {Object} userData
 * @returns {Promise<User>}
 */

 const getUserProfile = async(userData) => {
    const user = await findUserByPhone(userData.phone_number)
    delete user.password
    return user
}


module.exports = {
    createUser,
    findUserByPhone,
    getUserProfile
  };