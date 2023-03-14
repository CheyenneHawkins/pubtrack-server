const { model, Schema } = require('mongoose');

const userSchema = new Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    name: { type: String, default: null },
    email: { type: String, unique: true },
    password: { type: String },
    token: { type: String }

});

module.exports = model('User', userSchema, 'users');