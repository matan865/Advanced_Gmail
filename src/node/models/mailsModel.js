
const { Schema, model } = require('mongoose');

const mailSchema = new Schema({
  ownerUserId: { type: String, required: true, index: true }, 
  from:        { type: String, required: true },              
  to:          [{ type: String, required: true }],           
  subject:     { type: String, default: '' },
  body:        { type: String, default: '' },
  labels:      [{ type: String, index: true }],              
  read:        { type: Boolean, default: false },
}, { timestamps: true });

mailSchema.index({ ownerUserId: 1, createdAt: -1 });

module.exports = model('Mail', mailSchema);