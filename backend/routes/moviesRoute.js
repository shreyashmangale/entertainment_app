const express = require('express')
const {getMovies} = require('../controllers/moviesController')
const {getMovie} = require('../controllers/moviesController')

const router = express.Router()

router.get("/", getMovies)
router.get("/:id", getMovie)


module.exports = router