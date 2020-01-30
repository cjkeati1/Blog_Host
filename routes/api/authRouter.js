const express = require('express');
const authRouter = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../../models/user');
require('dotenv').config();

// @route GET api/auth
// @desc Get user on every request using the currently stored token
// @access Private
authRouter.get('/', auth, async (req, res) => {
   try {
      const user = await User.findById(req.user).select('-password');
      return res.json(user);
   } catch (e) {
      console.log(e);
      return res.status(500).send('Server error');
   }
});


module.exports = authRouter;
