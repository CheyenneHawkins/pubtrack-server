const { model, Schema } = require('mongoose');

const docSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, default: "Untitled" },
    data: { type: Object },
    owner: { type: String, ref: 'User' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }


});

module.exports = model('Document', docSchema, 'documents');