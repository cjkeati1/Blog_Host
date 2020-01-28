const express = require('express');
const profileRouter = express.Router();
require('dotenv/config');
const Profile = require('../../models/profile');
const auth = require('../../middleware/auth');

// @route GET api/profile/me
// @desc Get current user's profile
// @access Private
profileRouter.get('/me', auth, async (req, res) => {
   try {
      console.log(req.user);
      // Check if current user has a profile already
      const profile = await Profile.findOne({user: req.user})
         .populate('user', ['name', 'email']);

      // If not, return bad request
      if (!profile) {
         return res.status(400).json({msg: 'There is no profile for your account'});
      }

      // Respond with profile
      return res.json(profile);
   } catch (e) {
      console.error(e);
      return res.status(500).send('Server Error');
   }
});

// @route POST api/profile
// @desc Create or update user profile
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
      // Search for the current user's profile
      let profile = await Profile.findOne({user: req.user.id});

      // If a profile with the current user's id is found, update it
      if (profile) {
         profile = await Profile.findOneAndUpdate(
            {user: req.user.id},
            {$set: profileFields},
            {new: true}
         );
         return res.json(profile);
      }

      // If not, create a profile for the current user
      profile = await Profile.create(profileFields);
      return res.json(profile);
   } catch (e) {
      console.log(e);
      return res.status(500).send('Server Error');
   }
});

module.exports = profileRouter;
