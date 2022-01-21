const express = require('express')
const router = express.Router()
const sessionsControllers = require('../controllers/sessionsController')

router.post('/new', sessionsControllers.newSession)

module.exports = router