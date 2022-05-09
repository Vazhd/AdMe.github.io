const Router = require('express')
const router = new Router()
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware= require('./middlewaree/authMiddleware')
const roleMiddleware= require('./middlewaree/roleMiddlaware')


router.post('/registration',[
   check('username', "Имя пользователя не может быть пустым").notEmpty(),
    check('password',"Пароль должен быть больше 8 символов").isLength({min:4,max:100})
], controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddleware(['admin']),controller.getUsers)

module.exports = router