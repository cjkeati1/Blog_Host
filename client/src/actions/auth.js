import axios from 'axios';

import {
   REGISTER_SUCCESS,
   REGISTER_FAIL
} from "./types";

// Register User
export const register = ({name, email, password}) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   };
   const body = JSON.stringify({name, email, password});
   console.log(body);
   try {
      const res = await axios.post('/api/register', body, config);
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
      })
   } catch (e) {
      const errors = e.response.data.errors;
      console.log(errors);

      dispatch({
         type: REGISTER_FAIL,
      })
   }

};
