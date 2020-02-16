const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessageSchema = new Schema({
   author_name: {
      type: String,
      required: true
   },
   author_email: {
      type: String,
      required: true
   },
   content: {
      type: String,
      required: true
   },
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = Message = mongoose.model("Message", MessageSchema);
