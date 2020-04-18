const { login, logout, register, postLogin, postRegister } = require('../controllers/authController')
const router = require('express').Router()

router.get('/login', login)
router.post('/login', postLogin)
router.get('/register', register)
router.post('/register', postRegister)
router.get('/logout', logout)


module.exports = router