const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
   user: {
      type: Schema.Types.ObjectID,
      ref: 'User'
   },
   company: {
      type: String
   },
   website: {
      type: String
   },
   location: {
      type: String
   },
   bio: {
      type: String
   },
   social: {
      youtube: {
         type: String
      },
      twitter: {
         type: String
      },
      facebook: {
         type: String
      },
      instagram: {
         type: String
      }
   },
   date: {
      type: Date,
      default: Date.now
   }
});

module.exports = Profile = mongoose.model("Profile", ProfileSchema);
