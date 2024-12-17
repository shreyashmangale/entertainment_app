const express = require('express')
const { getTvseriesAll, getTvseriesSingle } = require('../controllers/tvseriesController')

const router = express.Router()

router.get("/", getTvseriesAll)
router.get("/:id", getTvseriesSingle)


module.exports = router