const express = require('express');
const postRouter = express.Router();
const auth = require('../../middleware/auth');
require('dotenv/config');

const Post = require('../../models/post');
const User = require('../../models/user');


// @route GET api/posts
// @desc Get all posts
// @access Public
postRouter.get('/', async (req, res) => {
   try {
      // Get all posts in the DB
      const posts = await Post.find();

      // Return them all
      res.json({posts});
   } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
   }
});

// @route POST api/posts
// @desc Create a post
// @access Private
postRouter.post('/', auth, async (req, res) => {
   const {title, body, name} = req.body;

   try {
      // Get user, leave out the password
      const user = await User.findById(req.user).select('-password');

      // Make new post and save to db
      let newPost = await Post.create({title, body, name: user.name, user});

      return res.json(newPost);

   } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
   }
});

// @route POST api/posts
// @desc Show an individual post
// @access public
postRouter.get('/:id', async (req, res) => {
   try {
      // Get the post by ID
      const post = await Post.findById(req.params.id);

      // If it doesn't exist, send bad request
      if (!post)
         return res.status(400).json({msg: 'Post not found'});

      res.json({post});
   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(400).json({msg: 'Post not found'});
      }
      return res.status(500).send('Server Error');
   }
});

module.exports = postRouter;
