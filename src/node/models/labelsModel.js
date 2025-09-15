
const { Schema, model } = require('mongoose');

const labelSchema = new Schema({
  name:  { type: String, required: true, trim: true },
  color: { type: String, default: 'gray', trim: true },
}, { timestamps: true });

module.exports = model('Label', labelSchema);