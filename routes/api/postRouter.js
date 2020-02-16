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
      const posts = await Post.find().sort({date: -1});

      // Return them all
      res.json(posts);
   } catch (err) {
      console.error(err);
      return res.status(500).send('Server Error');
   }
});

// @route POST api/posts
// @desc Create or update a post
// @access Private
postRouter.post('/', auth, async (req, res) => {
   const {title, content, tags, postId} = req.body;

   try {
      console.log(title);
      console.log(content);
      console.log(postId);
      console.log(tags);
      // Get user, leave out the password
      const user = await User.findById(req.user).select('-password');

      const postFields = {};
      postFields.author = user;
      postFields.title = title;
      postFields.content = content;
      postFields.author_name = user.name;

      if (!Array.isArray(tags)) { // If we're editing a post and don't change tags, they will come in as an array
         // Extract tags, if any, (Which should be comma separated) and insert into an array
         let postTags = [];
         if (tags) {
            postTags = tags.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
         }
         postFields.tags = postTags;
      } else {
         postFields.tags = tags;
      }


      let post = null;
      if (postId !== null)
         post = await Post.findById(postId); // Find post with the ID


      if (post) { // Update the post if found and current user is the author

         if (post.author.toString() !== user._id.toString()) {
            return res.status(400).json({msg: 'Cannot edit a post that is not yours'});
         } else {
            post = await Post.findOneAndUpdate(
               {_id: postId},
               {$set: postFields},
               {new: true}
            );
            return res.json(post);
         }
      }

      // There is no post so create one
      let newPost = await Post.create(postFields);

      return res.json(newPost);

   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Post not found'});
      }
      console.error(err);
      return res.status(500).send('Server Error');
   }
});

// @route GET api/posts/:id
// @desc Show an individual post
// @access Public
postRouter.get('/:id', async (req, res) => {
   try {
      // Get the post by ID
      const post = await Post.findById(req.params.id);

      // If it doesn't exist, send not found
      if (!post)
         return res.status(404).json({msg: 'Post not found'});

      res.json(post);
   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Post not found'});
      }
      return res.status(500).send('Server Error');
   }
});

// @route DELETE api/posts/:id
// @desc Delete a post
// @access Private
postRouter.delete('/:id', auth, async (req, res) => {
   try {
      // Get the post by ID
      const post = await Post.findById(req.params.id);

      // If it doesn't exist, send not found
      if (!post)
         return res.status(404).json({msg: 'Post not found'});

      // If the current user is not the author of the post, return unauthorized
      if (req.user !== post.author.toString())
         return res.status(401).json({msg: 'You cannot delete a post that is not yours'});

      // If verified, delete the post
      post.remove();

      res.json({msg: 'Post deleted'});
   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Post not found'});
      }
      return res.status(500).send('Server Error');
   }
});

// @route PUT api/posts/:id/like
// @desc Like a post
// @access Private
postRouter.put('/:id/like', auth, async (req, res) => {
   try {
      // Get the post by ID
      let post = await Post.findById(req.params.id);

      // If it doesn't exist, send not found
      if (!post)
         return res.status(404).json({msg: 'Post not found'});

      // Check if current user has already liked the post
      if (post.likes.filter(like => (like.user.toString() === req.user)).length > 0) {
         return res.status(400).json({msg: 'Cannot like a post more than once'});
      }

      // If not, add user to likes array
      post.likes.unshift({user: req.user});
      await post.save();

      res.send(post.likes);

   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Post not found'});
      }
      return res.status(500).send('Server Error');
   }
});

// @route PUT api/posts/:id/unlike
// @desc Unlike a post
// @access Private
postRouter.put('/:id/unlike', auth, async (req, res) => {
   try {
      // Get the post by ID
      let post = await Post.findById(req.params.id);

      // If it doesn't exist, send not found
      if (!post)
         return res.status(404).json({msg: 'Post not found'});

      // Find index of the user's like if there is one
      const removeIndex = post.likes.map(like => like.user.toString()).indexOf(req.user);

      // If user has not already liked the post
      if (removeIndex === -1) {
         return res.status(400).json({msg: 'Cannot unlike a post you haven\'t already liked'});
      }

      // Remove the like from the array
      post.likes.splice(removeIndex, 1);
      await post.save();

      res.send(post.likes);
   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Post not found'});
      }
      return res.status(500).send('Server Error');
   }
});

// @route POST api/posts/:id/comment
// @desc Comment on a post
// @access Private
postRouter.post('/:id/comment', auth, async (req, res) => {
   const {content} = req.body;
   try {
      // Get the post by ID
      let post = await Post.findById(req.params.id);

      // Get user by ID
      let user = await User.findById(req.user);

      // If it doesn't exist, send not found
      if (!post)
         return res.status(404).json({msg: 'Post not found'});

      // Create a comment object
      const newComment = {
         author: req.user,
         content,
         author_name: user.name
      };

      // Add comment to comments array
      post.comments.unshift(newComment);

      await post.save();

      res.send(post.comments);
   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Post not found'});
      }
      return res.status(500).send('Server Error');
   }
});

// @route POST api/posts/:postId/comment/:commentId
// @desc Delete a comment
// @access Private
postRouter.delete('/:postId/comment/:commentId', auth, async (req, res) => {
   try {
      // Get the post by ID
      let post = await Post.findById(req.params.postId);

      // If post doesn't exist, send not found
      if (!post)
         return res.status(404).json({msg: 'Post not found'});


      // Find index of the user's comment if there is one
      const removeIndex = post.comments.map(comment => comment._id.toString()).indexOf(req.params.commentId);

      // If comment does not exist, return not found
      if (removeIndex === -1) {
         return res.status(400).json({msg: 'Comment not found'});
      }

      // If current user is not the author of the comment
      if (req.user !== post.comments[removeIndex].author.toString())
         return res.status(401).json({msg: 'Cannot delete a comment that is not yours'});

      // Remove the comment from the array
      post.comments.splice(removeIndex, 1);
      await post.save();

      res.send(post.comments);
   } catch (err) {
      if (err.kind === 'ObjectId') {
         return res.status(404).json({msg: 'Post not found'});
      }
      return res.status(500).send('Server Error');
   }
});

module.exports = postRouter;
