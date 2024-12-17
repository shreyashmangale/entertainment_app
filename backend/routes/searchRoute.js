const express = require('express')
const { getSearchedData } = require('../controllers/searchController')

const router = express.Router()

router.get("/", getSearchedData)


module.exports = router