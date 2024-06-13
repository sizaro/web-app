const express = require('express')
const controller = require('../controller/home')

const router = express.Router()

router.get('/', controller.buildHome)

module.exports = router