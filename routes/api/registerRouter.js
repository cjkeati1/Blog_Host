const express = require('express');
const registerRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const User = require('../../models/user');

// @route POST api/register
// @desc Register a user
// @access Public
registerRouter.post('/', async (req, res) => {
   const {name, email, password} = req.body;

   try { // Check if a user with the entered email already exists
      let user = await User.findOne({email: email});

      // If so, return bad request
      if (user) {
         return res.status(400).json({msg: 'A user with that email already exists'});
      }

      // Hash the password
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      // Make new user and save to db
      let newUser = await User.create({name, email, password: hashedPassword});

      // User has been registered. Now create a token for them
      const userForToken = {
         email,
         userId: newUser._id
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

module.exports = registerRouter;
