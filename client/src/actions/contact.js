import axios from 'axios';
import {
   SEND_MESSAGE,
   POST_ERROR
} from "./types";


// Send Message To Website Creator
export const sendMessage = formData => async dispatch => {
   try {
      const res = await axios.post('/api/contact', formData);

      dispatch({
         type: SEND_MESSAGE,
         payload: res.data
      });

   } catch (e) {
      dispatch({
         type: POST_ERROR,
         payload: {msg: e.response.statusText, status: e.response.status}
      });
   }
};
