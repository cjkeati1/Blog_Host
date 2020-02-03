import axios from 'axios';
import {
   GET_PROFILE,
   CLEAR_PROFILE,
   PROFILE_ERROR,
   UPDATE_FOLLOWS
} from "./types";

import {UNFOLLOW} from "../utils/enums";

// Get Profile By User ID
export const getProfileById = userId => async dispatch => {
   try {
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

// Follow a User
export const updateFollows = (userId, type) => async dispatch => {
   try {
      const res = await axios.put(`/api/users/${userId}/${type === UNFOLLOW ? 'un' : ''}follow`);

      dispatch({
         type: UPDATE_FOLLOWS,
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

