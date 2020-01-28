const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      type: String,
      required: true,
      unique: true
   },
   password: {
      type: String,
      required: true
   },

   followers: [
      {
         user: {
            type: Schema.Types.ObjectID,
            ref: 'User'
         }
      }
   ],
   following: [
      {
         user: {
            type: Schema.Types.ObjectID,
            ref: 'User'
         }
      }
   ]
});

module.exports = User = mongoose.model("User", UserSchema);
