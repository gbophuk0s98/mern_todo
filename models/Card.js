const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: false },
    owner: { type: Types.ObjectId, ref: 'users' }
})

module.exports = model('cards', schema)