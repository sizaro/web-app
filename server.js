const express = require('express');
const app = express()
const router = require('./route');
const mongodb = require('./database/mongoDB');
const bodyParser = require('body-parser');

const port = process.env.port || 3000
app.use(bodyParser.json())
app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
         'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods','GET, POST, PUT, DELETE, OPTIONS');
    next();
})
app.use('/', router)

mongodb.initDB((err) => {
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, ()=> {console.log(`Running on port ${port}`)})
    }
})
