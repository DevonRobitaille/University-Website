const db = require('../../models')
const Op = db.Sequelize.Op

/*
 Function checks if email already exists in database.
 Returns true if email already taken, null otherwise.
*/
EmailExists = async (email) => {
    console.log(email)
    if (email === null || email === undefined) {
        throw new Error('No email was passed as an argument')
    }

    const user = await db.user.findOne({
        where: { email }
    })

    if (user) return user

    return null
}

/*
 Function for finding a user based on their user id.
 @args
 - user_id : string

 @returns user object
*/
FindUser = async (credential) => {
    console.log("UserDB FindUser - ")
    console.log(credential)

        if (credential === null || credential === undefined) {
            throw new Error('No credential was passed as an argument')
        }

        let user = await db.user.findOne({
            where: {
                [Op.or]: [{id: credential}, {email: credential}]
            }
        })

        if (user) {
            user.dataValues.username = user.dataValues.email
            return user
        }

        return null
}

/*
 Function creates a new user in database.
*/
CreateUser = async (args) => {
    if (args === null || args === undefined) {
        throw new Error('No args was passed as an argument')
    }

    if (!args.email) throw new Error('Invalid argument: email')
    if (!args.first_name) throw new Error('Invalid argument: first_name')
    if (!args.last_name) throw new Error('Invalid argument: last_name')
    if (!args.password) throw new Error('Invalid argument: password')
    if (_ValidatePermissionId(args.permission_id) === null) args.permission_id = 4 // 4 is student default //throw new Error('Invalid argument: permission_id')

    let user = await db.user.create({
        first_name: args.first_name,
        last_name: args.last_name,
        email: args.email,
        password: args.password,
        permission_id: args.permission_id
    })
    user.dataValues.username = user.dataValues.email
    return user
}

module.exports = {
    EmailExists,
    FindUser,
    CreateUser
}


/*
 Function checks if permission already exists in database.
 Returns true if permission exists, false otherwise.
*/
async function _ValidatePermissionId(permission_id) {

    if (permission_id === null || permission_id === undefined) {
        throw new Error('No permission_id was passed as an argument')
    }

    const permissions = await db.permission.findOne({
        where: { id: permission_id }
    })

    if (permissions) return permissions

    return null
}
