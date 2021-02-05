const { Router } = require('express')
const { check, validationResult } = require('express-validator')
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const router = Router()

generateToken = (userId) => {
    return jwt.sign(
        { userId: userId },
        'gbophuk0s98',
        { expiresIn: '1h' },
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

            const token = generateToken(user.id)

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

            const token = generateToken(user.id)

            await res.status(201).json({ token: token, userId: user.id, message: 'Вход успешно выполнен' })

        }
        catch (e)
        {
            res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
        }
    })

module.exports = router