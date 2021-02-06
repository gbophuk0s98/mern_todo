const { Router } = require('express')
const router = Router()
const Todos = require('../models/Todos')
const auth = require('../middleware/auth.middleware')

router.get('/all', auth, async (req, res) => {
    try
    {
        const todos = await Todos.find({ owner: req.user.userId })
        res.status(200).json(todos)
    }

    catch (e)
    {
        res.status(500).json({ message: 'Внутрення ошибка сервера', devMessage: `${e.message}` })
    }

})

router.post('/create', auth, async (req, res) => {
    try
    {
        const { text, done, important } = req.body
        console.log(req.body)
        const todo = new Todos({ text, done, important, owner: req.user.userId }) 
        await todo.save()

        res.status(201).json({ message: 'Тудушка создана!' })
    }
    catch
    {
        res.status(500).json({ message: 'Внутрення ошибка сервера', devMessage: `${e.message}` })
    }
})

router.delete('/delete', auth, async (req, res) => {
    try
    {
        const todo = await Todos.deleteOne({ _id: req.body._id })
        res.status(200).json({ message: 'Успешно удалено!' })
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутрення ошибка сервера', devMessage: `${e.message}` })
    }
})

module.exports = router