const express = require('express');
const tagRouter = express.Router();
require('dotenv/config');

const Post = require('../../models/post');

// @route GET api/tag/:tag_name
// @desc Get posts with the tag param
// @access Public
tagRouter.get('/:tag_name', async (req, res) => {
   try {
      console.log(999);
      // Get all posts in the DB
      const posts = await Post.find({tags: req.params.tag_name});

      // Return them all
      res.json(posts);
   } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
   }
});


module.exports = tagRouter;
