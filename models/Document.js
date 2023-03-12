const { model, Schema } = require('mongoose');

const documentSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, default: "Untitled" },
    data: { type: Object },
    owner: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }

});

module.exports = model('Document', documentSchema, 'documents');