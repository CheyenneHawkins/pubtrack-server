const { model, Schema } = require('mongoose');

const gadgetSchema = new Schema({
    _id: { type: String, required: true },
    title: { type: String, default: "Untitled" },
    data: { type: Object },
    owner: { type: String },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
    // name: { type: String },
    // color: { type: String },
    // shape: { type: String },
    // weight: { type: Object },
});

module.exports = model('Gadget', gadgetSchema, 'gadgets');