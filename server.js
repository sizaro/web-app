const express = require('express');
const app = express()
const router = require('./route');
const mongodb = require('./database/mongoDB');

const port = process.env.port || 3000
app.use('/', router)

app.use('/test', router)

mongodb.initDB((err) => {
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, ()=> {console.log(`Running on port ${port}`)})
    }
})
