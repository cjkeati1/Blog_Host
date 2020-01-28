const mongoose = require('mongoose');
require('dotenv').config();
const db = process.env.MONGO_URI;

const connectDB = async () => {
   try {
      await mongoose.connect(db, {
         useUnifiedTopology: true,
         useNewUrlParser: true,
         useCreateIndex: true,
         useFindAndModify: false
      });
      console.log('MongoDB Connected');
   } catch (e) {
      console.log(e.message);
      process.exit(1);
   }
};

module.exports = connectDB;
