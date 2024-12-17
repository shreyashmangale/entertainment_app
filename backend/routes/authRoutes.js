const express = require('express')
const { register, login, logout } =  require("../controllers/authController.js")
const { authenticateToken } = require('../middleware/authenticatToken.js')

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout)

module.exports = router