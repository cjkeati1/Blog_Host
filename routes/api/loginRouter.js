const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const User = require('../../models/user');

// @route POST api/login
// @desc Login a user
// @access Public
loginRouter.post('/', async (req, res) => {
   const {email, password} = req.body;

   try {
      let user = await User.findOne({email: email});

      if (!user) {
         return res.status(400).json({msg: 'User not found'});
      }

      // If user exists, verify the password with the hashed password in db
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
         return res.status(400).json({msg: 'Invalid credentials'});
      }

      // User has been verified. Now create a token for them
      const userForToken = {
         user: {
            id: user._id
         }
      };

      // Make a token and send in the response
      jwt.sign(
         userForToken,
         process.env.JWT_SECRET_KEY,
         {expiresIn: '1d'},
         (err, token) => {
            if (err) throw err;
            res.json({token, email});
         });

   } catch (err) {
      console.log(err.message);
      res.status(500).send('Server error');
   }
});

module.exports = loginRouter;
