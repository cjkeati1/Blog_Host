import {
   REGISTER_SUCCESS,
   REGISTER_FAIL
} from "../actions/types";

const initialState = {
   // TODO Retrieve token from a cookie? localstorage?
   isAuthenticated: false,
   loading: true,
   user: null
};


export default function (state = initialState, action) {
   const {type, payload} = action;

   switch (type) {
      case REGISTER_SUCCESS:
         // TODO Set token using cookie
         return {
            ...state,
            ...payload,
            isAuthenticated: true,
            loading: false
         };
      case REGISTER_FAIL:
         // TODO Remove token from cookie
         return {
            ...state,
            token: null,
            isAuthenticated: false,
            loading: false
         };
      default:
         return state;
   }
}
