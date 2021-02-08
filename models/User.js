const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    name: { type: String, required: true },
    email: { type: String, require: true, unique: true },
    password: { type: String, required: true },
    todos: [{ type: Types.ObjectId, ref: 'todos' }]
})

module.exports = model('users', schema)