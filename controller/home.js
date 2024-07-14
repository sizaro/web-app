const express = ('express')

const router = require('../route')

const home = {};

home.buildHome = async function (req, res){
    //#swagger.tags=['we did it']
    res.send('your welcome')
}

module.exports = home