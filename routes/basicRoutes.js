const { getIndex, getAbout } = require('../controllers/basicController')
const router = require('express').Router()

router.get('/', getIndex)
router.get('/about', getAbout)


module.exports = router