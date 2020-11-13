const mongoose = require('mongoose');      //db name
const config = require('config');
    
// mongoose.connect('mongodb://localhost:27017/3010', {useNewUrlParser: true, useUnifiedTopology: true}); local host
mongoose.connect(`mongodb+srv://einavtayari:${config.get("dbPass")}@cluster0.udwme.mongodb.net/shop`, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.connect('mongodb+srv://einavtayari:fuckyou5990@cluster0.udwme.mongodb.net/shop', {useNewUrlParser: true, useUnifiedTopology: true});


//בדיקה שהתחבר ותקין
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongo connected')
  // we're connected!
});

module.exports = db;
