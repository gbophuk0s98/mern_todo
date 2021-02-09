const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const Token = require('../models/Token')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = Router()

generateToken = (userId, secretKey) => {
    return token = jwt.sign(
        { userId: userId },
        'gbophuk0s98' + secretKey,
        { expiresIn: '23h' },
    )
}

router.post(
    '/register', 
    [
        check('name').exists().withMessage('Имя не может быть пустым'),
        check('email').isEmail().withMessage('Некорректный email'),
        check('password').isLength({ min: 3 }).withMessage('Пароль должен содержать минимум 3 символов')
    ],
    async (req, res) => {
        try
        {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), message: 'Ошибки в форме' })

            const { name, email, password } = req.body
            
            const candidate = await User.findOne({ email })
            if (candidate) return res.status(200).json({ message: 'Такой пользователь уже существует' })

            const hashedPassword = await bcrypt.hash(password, 5)

            const user = new User({ name, email, password: hashedPassword })
            await user.save()

            const secretKey = Date.now().toString()
            const token = generateToken(user.id, secretKey)

            await res.status(201).json({ token: token, userId: user.id, message: 'Пользователь создан' })

        }
        catch (e)
        {
            res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
        }
    })

router.post(
    '/login', 
    [
        check('email').isEmail().withMessage('Некорректный email'),
        check('password').isLength({ min: 3 }).withMessage('Пароль должен содержать минимум 3 символов')
    ],
    async (req, res) => {
        try
        {
            const errors = validationResult(req)
            if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array(), message: 'Ошибки в форме' })

            const { email, password } = req.body
            
            const user = await User.findOne({ email })
            if (!user) return res.status(200).json({ message: 'Пользователь не найден' })

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({ message: 'Неверный пароль' })

            const secretKey = Date.now().toString()

            const tokenDB = await Token.findOne({ owner: user.id })
            if (!tokenDB){
                tokenDB = generateToken(user.id, secretKey)
                await new Token({ token, secretKey, owner: user.id }).save()
            }

            await res.status(201).json({ token: tokenDB, userId: user.id, message: 'Вход успешно выполнен' })

        }
        catch (e)
        {
            res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
        }
    })

router.post('/getToken', async (req, res) => {

    const { token, userId } = req.body
    console.log(req.body)
    res.status(200).json({ message: 'Токен найден' })

})

router.delete('/deleteToken', async (req, res) => {
    try
    {
        await Token.deleteOne({ token: req.body.jwtToken, owner: req.body.id })
        res.status(200).json({ message: 'Успешно удалено!' })
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутрення ошибка сервера', devMessage: `${e.message}` })
    }
})

module.exports = router