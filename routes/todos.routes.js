const { Router } = require('express')
const router = Router()
const Todos = require('../models/Todos')
const Card = require('../models/Card')
const auth = require('../middleware/auth.middleware')

router.post('/getCardTodo', auth, async (req, res) => {
    try
    {
        const { cardId } = req.body
        const todos = await Todos.find({ card: cardId })
        res.status(200).json(todos)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.get('/allCards', auth, async (req, res) => {
    try
    {
        const cards = await Card.find({ owner: req.user.userId })      
        res.status(200).json(cards)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}`})
    }
})

router.post('/createCard', auth, async (req, res) => {
    try
    {
        const { title, category } = req.body
        
        const card =  new Card({ title, category, owner: req.user.userId})
        await card.save()

        res.status(201).json(card)
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}`})
    }
})

router.post('/createTodo', auth, async (req, res) => {
    try
    {
        const { idCard , text, done, important } = req.body
        const todo = new Todos({ text, done, important, card: idCard }) 
        await todo.save()

        res.status(201).json({ message: 'Тудушка создана!' })
    }
    catch
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
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
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})


router.put('/updateDone', auth, async (req, res) => {
    try
    {
        const { done, _id } = req.body
        
        await Todos.updateOne({ _id: _id }, { done: !done }, { upsert: false })

        res.status(200).json({ message: 'Успешно обновлен!' })
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

router.put('/updateImportant', auth, async (req, res) => {
    try
    {
        const { important, _id } = req.body

        await Todos.updateOne({ _id: _id }, { important: !important }, { upsert: false })

        res.status(200).json({ message: 'Успешно обновлен!' })
    }
    catch (e)
    {
        res.status(500).json({ message: 'Внутренняя ошибка сервера', devMessage: `${e.message}` })
    }
})

module.exports = router