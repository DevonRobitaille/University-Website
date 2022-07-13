const express = require('express')
const router = express.Router();
const asyncHandler = require('../Helpers/asyncHandler')
const validate = require('validate.js')

// API ACCESS MODIFIERS
const admin_access = require('../middleware/admin_access')
const block_instructor = require('../middleware/block_instructor')
const block_ta = require('../middleware/block_ta')
const block_student = require('../middleware/block_student')

// SERVICES
const User_Service = require('../Services/Users/User_Service')

/*
@body
 - first_name : string
 - last_name : string
 - email : string
 - password : string
 - permission_id* : int
*/
router.post('/create', admin_access, asyncHandler( async (req, res) => {
    const constraints = {
        first_name: {
            presence: true,
            type: 'string',
            length:{maximum: 50}
        },
        last_name: {
            presence: true,
            type: 'string',
            length:{maximum: 50}
        },
        email: {
            presence: true,
            email: true
        },
        password: {
            presence: true,
            length:{minimum: 8, maximum: 20}
        }
    }

    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const email = req.body.email
    const password = req.body.password
    const permission_id = req.body.permission_id

    const validation = validate({first_name, last_name, email, password}, constraints)
    if (validation) return res.status(400).json({error: validation})

    // Forward/Invoke user service
    const found_user = await User_Service.ValidateUserExists(email)
    if (found_user) return res.status(400).json({error: `Email ${email} is already taken`})

    // Create new user
    const new_user = await User_Service.CreateNewUser({first_name, last_name, email, password, permission_id})
    return res.status(200).json({user: new_user})
}))

module.exports = router
