const express = require('express')
const controller = require('../controller/home')
const controllerP1 = require('../controller/project1')

const router = express.Router()

//route to the home page
router.get('/', controller.buildHome)

router.use('/', require('./swagger'))

//route to get all test collections
router.get('/test', controllerP1.getAll)

//route to get a single user
router.get('/test/:id', controllerP1.getSingle)

//route to create a new user
router.post('/',controllerP1.createItem)

//route to update the collection
router.put('/test/:id', controllerP1.updateItem)

//route to delete user
router.delete('/test/:id', controllerP1.deleteItem)




module.exports = router