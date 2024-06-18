/**
 * db.js
 * @description :: exports database connection using mongoose
 */

const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-auto-increment');

// const uri = process.env.DB_DEV_URL;
const uri = process.env.NODE_ENV === 'test' ? process.env.DB_DEV_URL : process.env.DB_URL;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true 
});

let db = mongoose.connection;

// Initialize auto-increment plugin
AutoIncrement.initialize(db);

db.once('open', () => {
  console.log('RP monolithic Connection Successful');
});

db.on('error', (error) => {
  console.log('error', error)
  console.log('Error in mongodb rP monolithic connection');
});

module.exports = mongoose;