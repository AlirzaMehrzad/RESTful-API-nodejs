const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')

const usersControllers = require('../controllers/usersControllers')

router.get('/',[auth] ,usersControllers.usersList)
router.post('/', usersControllers.addUser)
router.get('/:id', usersControllers.getUser)
router.delete('/:id', usersControllers.deleteUser)
router.patch('/:id', usersControllers.updateUser)


module.exports = router