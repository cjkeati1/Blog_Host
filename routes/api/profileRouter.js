const express = require('express');
const profileRouter = express.Router();
require('dotenv/config');
const Profile = require('../../models/profile');
const User = require('../../models/user');

const auth = require('../../middleware/auth');

// @route GET api/profile/me
// @desc Get current user's profile
// @access Private
profileRouter.get('/me', auth, async (req, res) => {
   try {
      // Check if current user has a profile already
      const profile = await Profile.findOne({user: req.user})
         .populate('user', ['name', 'email', 'followers', 'following']);

      // If not, return bad request
      if (!profile) {
         return res.status(400).json({msg: 'There is no profile for your account'});
      }

      // Respond with profile
      return res.json(profile);
   } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
   }
});

// @route POST api/profile
// @desc Update user profile
// @access Private
profileRouter.post('/', auth, async (req, res) => {
   const {
      company,
      website,
      location,
      bio,
      youtube,
      facebook,
      twitter,
      instagram
   } = req.body;

   // Build profile object
   const profileFields = {};
   profileFields.user = req.user;
   if (company) profileFields.company = company;
   if (website) profileFields.website = website;
   if (location) profileFields.location = location;
   if (bio) profileFields.bio = bio;

   // Build social object
   profileFields.social = {};
   if (youtube) profileFields.social.youtube = youtube;
   if (twitter) profileFields.social.twitter = twitter;
   if (facebook) profileFields.social.facebook = facebook;
   if (instagram) profileFields.social.instagram = instagram;

   try {
      let profile = await Profile.findOneAndUpdate(
         {user: req.user},
         {$set: profileFields},
         {new: true}
      );
      return res.json(profile);

   } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
   }
});

// @route GET api/profile/user/:user_id
// @desc Get another user's profile
// @access Public
profileRouter.get('/user/:user_id', async (req, res) => {
   try {
      // Find the corresponding Profile to the user ID
      const profile = await Profile.findOne({user: req.params.user_id})
         .populate('user', ['name', 'email', 'followers', 'following']);

      profile.user = await User.findById(req.params.user_id)
         .populate('followers.user', ['name', '_id'])
         .populate('following.user', ['name', '_id']);

      // If no profile, return not found
      if (!profile)
         return res.status(404).json({error: 'Profile not found'});

      // Else, return the profile
      res.json(profile);
   } catch (err) {
      console.log(err.message);
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Profile not found'});
      }
      return res.status(500).send('Server Error');
   }
});

// @route DELETE api/profile
// @desc Delete profile
// @access Private
profileRouter.delete('/', auth, async (req, res) => {
   try {
      // Remove profile
      const profile = await Profile.findOneAndRemove({user: req.user});

      if (!profile)
         return res.status(400).json({msg: 'There is no profile to delete'});

      return res.json({msg: 'Profile deleted'});

   } catch (err) {
      console.log(err.message);
      return res.status(500).send('Server Error');
   }
});

module.exports = profileRouter;
