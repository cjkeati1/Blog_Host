const express = require('express');
const profileRouter = express.Router();
require('dotenv/config');
const Profile = require('../../models/profile');
const auth = require('../../middleware/auth');

// @route GET api/profile/me
// @desc Get my profile
// @access Private
profileRouter.get('/me', auth, async (req, res) => {
   res.send('Authorized');
});

module.exports = profileRouter;
