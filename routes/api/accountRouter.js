const express = require('express');
const accountRouter = express.Router();
require('dotenv/config');
const Profile = require('../../models/profile');
const Post = require('../../models/post');
const User = require('../../models/user');

const auth = require('../../middleware/auth');

// @route DELETE api/account
// @desc Delete account (incl. posts & profile)
// @access Private
accountRouter.delete('/', auth, async (req, res) => {
   try {
      // Remove user posts
      await Post.deleteMany({user: req.user});

      // Remove profile
      await Profile.findOneAndRemove({user: req.user});

      // Remove user
      const user = await User.findByIdAndRemove(req.user);

      if (!user)
         return res.json({msg: 'Account already deleted'});

      return res.json({msg: 'Account deleted'});

   } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
   }
});

module.exports = accountRouter;
