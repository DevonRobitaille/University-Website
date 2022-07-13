const express = require('express')
const router = express.Router();
const passport = require('passport')

// // Auth Route
router.post('/', (req, res, next) => {
    console.log("Authenticating...")
    next()
}, passport.authenticate('local'), (req, res) => {
    // If you made it here, the user is real and authentic
    res.status(200).json({user: req.user.dataValues.username, permission: req.user_permission})
})

module.exports = router
