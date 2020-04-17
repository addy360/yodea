const { login, register, postLogin, postRegister } = require('../controllers/authController')
const router = require('express').Router()

router.get('/login', login)
router.post('/login', postLogin)
router.get('/register', register)
router.post('/register', postRegister)


module.exports = router