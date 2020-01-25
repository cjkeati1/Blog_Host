const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   body: {
      type: String,
      required: true
   },
   name: {
      type: String,
      required: true
   },
   user: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = User = mongoose.model("Post", PostSchema);
