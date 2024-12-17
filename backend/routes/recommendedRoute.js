const express = require('express')
const { getRecommended } = require('../controllers/recommendedController')

const router = express.Router()

router.get("/", getRecommended)


module.exports = router