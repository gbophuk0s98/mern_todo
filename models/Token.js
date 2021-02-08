const { model, Schema, Types } = require('mongoose')

const schema = new Schema({
    token: {type: String, required: true},
    secretKey: {type: String, require: true},
    owner: { type: Types.ObjectId, ref: 'users' }
})

module.exports = model('tokens', schema)