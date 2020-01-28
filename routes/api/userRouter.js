const express = require('express');
const userRouter = express.Router();
require('dotenv/config');
const User = require('../../models/user');

const auth = require('../../middleware/auth');

// @route GET api/users/me/followers
// @desc Get all current user's followers
// @access Private
userRouter.get('/me/followers', auth, async (req, res) => {
   try {
      // Find current user by ID
      const user = await User.findById(req.user).populate('followers', ['name', '_id']);

      // If user DNE, return not found
      if (!user)
         res.status(404).json({msg: 'User not found'});

      // Return them all
      res.send(user.followers);
   } catch (err) {
      console.error(err);
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Profile not found'});
      }
      return res.status(500).send('Server Error');
   }
});

// @route PUT api/users/:id/follow
// @desc Follow a user
// @access Private
postRouter.put('/:id/follow', auth, async (req, res) => {
   try {
      // Find current user by ID

      // Find followee by ID

      // Verify that they both exist

      // Add followee to current users 'following' array

      // Add current user to followee's 'followers' array

      // Return current user's 'following' array

   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Post not found'});
      }
      return res.status(500).send('Server Error');
   }
});

module.exports = userRouter;
