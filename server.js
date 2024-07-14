const express = require('express');
const app = express()
const router = require('./route');
const authRoutes = require('./route/auth')
const mongodb = require('./database/mongoDB');
const bodyParser = require('body-parser');
const session = require('express-session')
const passport = require('passport')
const passportSetup = require('./passportConfig/passport-setup')

const port = process.env.port || 3000
app.use(bodyParser.json())
app.set("view engine", "ejs")
app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    next();
})

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use('/', router)
app.use('/auth', authRoutes)

mongodb.initDB((err) => {
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, ()=> {console.log(`Running on port ${port}`)})
    }
})
