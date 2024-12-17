const express = require('express')
const { getData, insertData, deleteData } = require('../controllers/bookmarkedController')
const { authenticateToken } = require('../middleware/authenticatToken')

const router = express.Router()

router.get("/", authenticateToken, getData)
router.post("/", authenticateToken, insertData)
router.delete("/:id", authenticateToken, deleteData)


module.exports = router