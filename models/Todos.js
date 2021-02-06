const { model, Schema, Types } = require('mongoose')

const schema = new Schema({
    text: { type: String, required: true },
    important: { type: Boolean, required: true, default: false },
    done: { type: Boolean, required: true, default: false },
    owner: { type: Types.ObjectId, ref: 'users' },
})

module.exports = model('todos', schema)