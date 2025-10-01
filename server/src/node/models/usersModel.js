
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username:  { type: String, required: true, unique: true, lowercase: true, trim: true },
  email:     { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:  { type: String, required: true },  
  name:      { type: String, default: '' },
  avatarUrl: { type: String, default: '' },
}, { timestamps: true });

module.exports = model('User', userSchema);