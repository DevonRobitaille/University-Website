const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

// SERVICES
const User_Service = require('../Services/Users/User_Service')

passport.serializeUser(function(user, done) {
    console.log("\nSERIALIZE - " + user.id + "\n")
    done(null, user.id)
})

passport.deserializeUser(function(id, done) {
    console.log("\nDESERIALIZE: " + id + "\n")
    User_Service.UserSearch(id)
        .then(user => {
            done(null, user)
        })
})

passport.use(new LocalStrategy(
  function(email, password, done) {
      console.log("\nUsing passport - email: " + email + "\n")
      User_Service.UserSearch(email)
        .then(user => {
            // console.log(user)
            if (!user) return done(null, false)
            bcrypt.compare(password, user.dataValues.password)
                .then(match => {
                    if (match) {
                        console.log("\nVALID PASSWORD\n")
                        return done(null, user)
                    }
                    else {
                        console.log("\nINVALID PASSWORD\n")
                        return done(null, false)
                    }
                })
        }).catch(e => done(e))
    }
));
