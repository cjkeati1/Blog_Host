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
   user: {type: Schema.Types.ObjectId, ref: 'User'},
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
         user: {
            type: Schema.Types.ObjectID,
            ref: 'User'
         },
         body: {
            type: String,
            required: true
         },
         name: {
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

module.exports = User = mongoose.model("Post", PostSchema);
