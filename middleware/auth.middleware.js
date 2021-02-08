const jwt = require('jsonwebtoken')
const Token = require('../models/Token')

const getDBToken = async (userId) => {
    try
    {
        return await Token.findOne({ owner: userId })
    }
    catch (e)
    {
        res.status(500).json({ message: 'Что-то пошло не так', devMessage: e.message })
    }
}

module.exports = async (req, res, next) => {
    if (req.method === 'OPTIONS') return next()

    try
    {
        const token = req.headers.authorization.split(' ')[1]
        const userId = req.headers.user.split(' ')[1]
 
        if (!token) return res.status(401).json({ message: 'Нет авторизации '})

        const tokenDB = await getDBToken(userId)

        const decoded = jwt.verify(token, 'gbophuk0s98' + tokenDB.secretKey)
        
        req.user = decoded
        next()
    }
    catch (e)
    {
        res.status(401).json({ message: 'Нет авторизации '})
    }
}