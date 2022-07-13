require('dotenv').config()
const config = require('./config/config')

const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const logger = require('morgan')
const passport = require('passport')
const session = require('express-session')
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require('./models')
const cors = require('cors')
const fileUpload = require('express-fileupload');

// API ACCESS MODIFIERS
const auth_user_access = require('./middleware/auth_user_access')

const app = express()

// Connect to database
db.sequelize.sync()
    .then(() => {
        console.log("Database synced")
    })
    .catch(err => console.log("Error: Database not synced"))

app.use(fileUpload({
    createParentPath: true
}));

app.use(logger('dev'))
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cookieParser(process.env.SESSION_SECRET))

const allowOrigins = ['http://localhost:3000', 'http://localhost:3002']

app.use(cors( {
    origin: true,
    credentials: true
}))

const sessionStore = new SequelizeStore({ db: db.sequelize })

// session setup
app.use(session({
    secret: config.SESSION_SECRET,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000*60*60*24
    }
}))

// // passport authentication
app.use(passport.initialize())
app.use(passport.session())

// Used to assign permissions to users, which can then be used to route them to the appropriate pages
app.use(require('./middleware/user_identification'))

require('./API_Gateways/passport')

// Check login credentials for validity
app.use('/auth', require('./API_Gateways/Auth_Routes'))

// Application Gateways
app.use('/user', auth_user_access, require('./API_Gateways/User_Gateway')) // handle creating and editing users
app.use('/course', auth_user_access, require('./API_Gateways/Course_Gateway')) // handle courses and materials
app.use('/material', auth_user_access, require('./API_Gateways/Material_Gateway')) // handle courses and materials

// Logout Route
app.get('/logout', (req,res,next) => {
    console.log("LOGGING USER OUT")
    next()
},(req, res) => {
    sessionStore.destroy(req.sessionID, err => {
        console.log("Session Store Error: " + err)
    })
    req.session.destroy((err) => {
        console.log("Req.Session Error: " + err)
    })
    res.clearCookie('connect.sid')
    res.status(200).json({message: "User Logged Out"});
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(create(404))
})

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    res.status(err.status || 500)
    res.status(500)
})

const PORT = process.env.PORT || 3002
app.listen(PORT, async () => {
    console.log(`Server has started, listening on PORT: ${PORT}`)
})
