const express = ('express')

const router = require('../route')

const home = {};

home.buildHome = async function (req, res){
    res.send("we did it")
}

module.exports = home