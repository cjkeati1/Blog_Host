import axios from 'axios';
import {
   REGISTER_SUCCESS,
   REGISTER_FAIL,
   USER_LOADED,
   AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL
} from "./types";
import setAuthToken from "../utils/setAuthToken";

// Load User --- Need to call this every request to keep the token in the header since jwt is stateless
export const loadUser = () => async dispatch => {
   if (localStorage.token) {
      setAuthToken(localStorage.token);
   }
   try {
      const res = await axios.get('/api/auth');

      dispatch({
         type: USER_LOADED,
         payload: res.data
      });
   } catch (err) {
      dispatch({
         type: AUTH_ERROR
      });
   }
};

// Register User
export const register = ({name, email, password}) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   };
   const body = JSON.stringify({name, email, password});

   try {
      const res = await axios.post('/api/register', body, config); // Returns the user's jwt if successful
      dispatch({
         type: REGISTER_SUCCESS,
         payload: res.data
      });

      dispatch(loadUser());
   } catch (e) {
      dispatch({
         type: REGISTER_FAIL
      });
   }
};

// Login User
export const login = ({email, password}) => async dispatch => {
   const config = {
      headers: {
         'Content-Type': 'application/json'
      }
   };
   const body = JSON.stringify({email, password});

   try {
      const res = await axios.post('/api/login', body, config); // Returns the user's jwt if successful
      dispatch({
         type: LOGIN_SUCCESS,
         payload: res.data
      });

      dispatch(loadUser());
   } catch (e) {
      dispatch({
         type: LOGIN_FAIL
      });
   }
};
