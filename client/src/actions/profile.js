import axios from 'axios';
import {
   GET_POSTS,
   GET_POST,
   ADD_POST,
   DELETE_POST,
   POST_ERROR,
   ADD_COMMENT,
   DELETE_COMMENT,
   LIKE_POST,
   UNLIKE_POST,
   GET_PROFILE,
   CLEAR_PROFILE,
   PROFILE_ERROR
} from "./types";

// Get Profile By User ID
export const getProfileById = userId => async dispatch => {
   try {
      console.log('hit action');
      const res = await axios.get(`/api/profile/user/${userId}`);

      dispatch({
         type: GET_PROFILE,
         payload: res.data
      });

   } catch (e) {
      dispatch({type: CLEAR_PROFILE});
      dispatch({
         type: PROFILE_ERROR,
         payload: {msg: e.response.statusText, status: e.response.status}
      });
   }
};
