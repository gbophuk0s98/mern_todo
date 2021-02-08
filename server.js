const express = require('express')
const favicon = require('express-favicon')
const mongoose = require('mongoose')
const app = express()
const path = require('path')
const PORT = process.env.PORT || 8080

app.use(express.json({ extended: true }))
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/todos', require('./routes/todos.routes'))

if (process.env.NODE_ENV == 'production'){
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })    
}

async function start(){
    try
    {
        await mongoose.connect('mongodb+srv://surta:123@cluster0.nqkum.mongodb.net/mern_todo?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }).then(() => {
            console.log('Mongo connected!')
        }).catch(() => {
            console.log('Mongo not connected!')
        })
        app.listen(PORT, () => {
            console.log(`Server has been started on port ${PORT}...`)
        })
    }
    catch (e)
    {
        console.log(`Server error ${e.message}`)
        process.exit(1)
    }
}

start()