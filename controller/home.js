const express = ('express')

const router = require('../route')

const home = {};

home.buildHome = async function (req, res){
    //#swagger.tags=['we did it']
    res.send("we did it")
}

module.exports = home