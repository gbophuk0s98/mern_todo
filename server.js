const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT = 8080

app.use(express.json({ extended: true }))
app.use('/api/auth/', require('./routes/auth.routes'))

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