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
userRouter.put('/:id/follow', auth, async (req, res) => {
   // Cannot follow self
   if (req.user === req.params.id)
      return res.status(400).json({msg: 'You cannot follow yourself'});

   try {
      // Find current user by ID
      const user = await User.findById(req.user);

      // Find followee by ID
      const followee = await User.findById(req.params.id);

      // Verify that they both exist
      if (!user)
         return res.status(400).json({msg: 'Token does not match any user in the database'});
      if (!followee)
         return res.status(400).json({msg: 'Cannot follow. A user with that ID does not exist'});

      // If user has already followed the intended followee, send bad request
      if (user.following.filter(followee => (followee.user.toString() === req.params.id)).length > 0) {
         return res.status(400).json({msg: 'Cannot follow a user more than once'});
      }
      console.log('hit');
      // Add followee to current users 'following' array
      // Add current user to followee's 'followers' array
      user.following.unshift({user: followee._id});
      followee.followers.unshift({user: req.user});

      await user.save();
      await followee.save();

      res.send(user.following);
   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Post not found'});
      }
      return res.status(500).send('Server Error');
   }
});

module.exports = userRouter;
