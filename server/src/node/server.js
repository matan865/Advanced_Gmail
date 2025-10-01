require('dotenv').config({ path: './secret.env' });
const mongoose = require('mongoose');
const app = require('./app');

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/gmailapp';

(async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(MONGO_URL);
    console.log('✅ Mongo connected');
    //console.log('MONGO_URL:', process.env.MONGO_URL);
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
})();

process.on('unhandledRejection', err => console.error('unhandledRejection', err));
process.on('uncaughtException', err => { console.error('uncaughtException', err); process.exit(1); });
