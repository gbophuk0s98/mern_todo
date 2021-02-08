const jwt = require('jsonwebtoken')
const Token = require('../models/Token')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') return next()

    try
    {
        const token = req.headers.authorization.split(' ')[1]
        const userId = req.headers.user.split(' ')[1]

        if (!token) return res.status(401).json({ message: 'Нет авторизации '})
        console.log('..........................................')
        const tokenDB = Token.findOne({ owner: userId })
        console.log(tokenDB.secretKey)

        const decoded = jwt.verify(token, tokenDB.secretKey)
        req.user = decoded
        next()
    }
    catch (e)
    {
        res.status(401).json({ message: 'Нет авторизации '})
    }
}