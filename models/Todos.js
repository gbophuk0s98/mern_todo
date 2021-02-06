import { model, Schema } from 'mongoose'

const schema = new Schema({
    text: { type: String, required: true },
    important: { type: Boolean, required: true, default: false },
    done: { type: Boolean, required: true, default: false },
})

module.exports = model('todos', schema)