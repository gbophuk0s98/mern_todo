const { model, Schema, Types } = require('mongoose')

const schema = new Schema({
    text: { type: String, required: true },
    important: { type: Boolean, required: true, default: false },
    done: { type: Boolean, required: true, default: false },
    card: { type: Types.ObjectId, ref: 'cards' }
})

module.exports = model('todos', schema)