const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
   title: {
      type: String,
      required: true
   },
   content: {
      type: String,
      required: true
   },
   author_name: {
      type: String,
      required: true
   },
   author: {type: Schema.Types.ObjectId, ref: 'User'},
   category: {type: String, required: true},
   tags: [
      {
         type: String,
         required: false
      }
   ],
   likes: [
      {
         user: {
            type: Schema.Types.ObjectID,
            ref: 'User'
         }
      }
   ],
   comments: [
      {
         author: {
            type: Schema.Types.ObjectID,
            ref: 'User'
         },
         content: {
            type: String,
            required: true
         },
         author_name: {
            type: String
         },
         date: {
            type: Date,
            default: Date.now
         }
      }
   ],
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = Post = mongoose.model("Post", PostSchema);
