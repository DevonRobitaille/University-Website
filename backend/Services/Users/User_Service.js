const { EmailExists, CreateUser, FindUser } = require('./User_DB')
const bcrypt = require('bcryptjs')
const saltRounds = 10

ValidateUserExists = async (email) => {
    if (!email) throw new Error('Invalid number of args passed. Please pass an email.')

    let taken_valid_email = null

    if (email) {
        taken_valid_email = await EmailExists(email)
    }

    if (taken_valid_email) return taken_valid_email

    return null
}

CreateNewUser = async (args) => {
    if (args.password) args.password = await _Ecrypt(args.password)
    return await CreateUser(args)
}

UserSearch = async (credentials) => {
    return await FindUser(credentials)
}

module.exports = {
    ValidateUserExists,
    CreateNewUser,
    UserSearch
}

async function _Ecrypt(text) {
    return await bcrypt.hash(text, saltRounds)
}
