// SERVICES
const User_Service = require('../Services/Users/User_Service')

// each request that comes through will have a req.user if the user is logged in
module.exports = (req, res, next) => {
    const user_id = req.user ? req.user : null
    if (user_id) {
        User_Service.UserSearch(user_id.dataValues.id)
            .then(user => {
                if (user) {
                    req.user_permission = user.dataValues.permission_id
                } else {
                }
                console.log("AUTHENTICATED")
                next();
        }).catch(err => next())
    } else {
        console.log("NO USER ID")
        next();
    }
}
