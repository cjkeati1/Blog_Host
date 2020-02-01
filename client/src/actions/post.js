import axios from 'axios';
import {
   GET_POSTS,
   ADD_POST,
   DELETE_POST,
   POST_ERROR
} from "./types";

// Get Posts
export const getPosts = () => async dispatch => {
   try {
      const res = await axios.get('/api/posts');

      dispatch({
         type: GET_POSTS,
         payload: res.data
      });

   } catch (e) {
      dispatch({
         type: POST_ERROR,
         payload: {msg: e.response.statusText, status: e.response.status}
      });
   }
};

// Add Post
export const addPost = formData => async dispatch => {
   try {
      const config = {
         headers: {'Content-Type': 'application/json'}
      };
      const res = await axios.post('/api/posts', formData, config);
      dispatch({
         type: ADD_POST,
         payload: res.data
      });

   } catch (e) {
      dispatch({
         type: POST_ERROR,
         payload: {msg: e.response.statusText, status: e.response.status}
      });
      throw e;
   }
};

// Delete Post
export const deletePost = postId => async dispatch => {
   try {
      await axios.delete(`/api/posts/${postId}`);
      dispatch({
         type: DELETE_POST,
         payload: {postId}
      });

   } catch (e) {
      dispatch({
         type: POST_ERROR,
         payload: {msg: e.response.statusText, status: e.response.status}
      });
      throw e;
   }
};
