const express = require('express');
const router = require('./route');

const app = express()

app.set("view engine", "express-layout")


app.get('/', router)

const port = process.env.port || 3000

app.listen(port)

console.log("server listening at port", port)
