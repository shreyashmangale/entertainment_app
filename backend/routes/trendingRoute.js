const express = require('express')
const { getTrendingData } = require('../controllers/trendingController')

const router = express.Router()

router.get("/", getTrendingData)


module.exports = router