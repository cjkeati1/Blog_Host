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
      const user = await User.findById(req.user).populate('followers.user', ['name', '_id']);

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

      // Add followee to current users 'following' array
      // Add current user to followee's 'followers' array
      user.following.unshift({user: followee._id});
      followee.followers.unshift({user: req.user});

      await user.save();
      await followee.save();

      res.send(followee.followers);
   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'User not found'});
      }
      return res.status(500).send('Server Error');
   }
});

// @route PUT api/posts/:id/unfollow
// @desc Unfollow a user
// @access Private
userRouter.put('/:id/unfollow', auth, async (req, res) => {
   // Cannot unfollow self
   if (req.user === req.params.id)
      return res.status(400).json({msg: 'You cannot unfollow yourself'});

   try {
      // Find current user by ID
      const user = await User.findById(req.user);

      // Find followee by ID
      const followee = await User.findById(req.params.id);

      // Verify that they both exist
      if (!user)
         return res.status(404).json({msg: 'Token does not match any user in the database'});
      if (!followee)
         return res.status(404).json({msg: 'A user with that ID was not found'});

      // Find index of the followee in current user's following array
      const removeFolloweeIndex = user.following.map(followee => followee.user.toString()).indexOf(req.params.id);

      // Find index of the current user in followee's followers array
      const removeFollowerIndex = followee.followers.map(follower => follower.user.toString()).indexOf(req.user);

      if (removeFolloweeIndex === -1 || removeFollowerIndex === -1) {
         return res.status(400).json({msg: 'Cannot unfollow someone you\'re not already following'});
      }

      user.following.splice(removeFolloweeIndex, 1);
      followee.followers.splice(removeFollowerIndex, 1);

      await user.save();
      await followee.save();

      res.send(followee.followers);
   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'A user with that ID was not found'});
      }
      return res.status(500).send('Server Error');
   }
});

module.exports = userRouter;
