const express = require('express');
const postRouter = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const User = require('../../models/user');

// @route POST api/posts
// @desc Get all posts
// @access Public
postRouter.get('/', async (req, res) => {
   try {
      // Get all posts in the DB

      // Return them all
   } catch (err) {

   }


});

module.exports = postRouter;
