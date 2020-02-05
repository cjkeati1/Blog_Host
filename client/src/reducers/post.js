import {
   GET_POSTS,
   GET_POST,
   GET_POSTS_BY_TAG,
   POST_ERROR,
   ADD_POST,
   DELETE_POST,
   ADD_COMMENT,
   DELETE_COMMENT,
   UPDATE_LIKES
} from '../actions/types'

const initialState = {
   posts: [],
   post: null,
   loading: true,
   error: {}
};

export default function (state = initialState, action) {
   const {type, payload} = action;

   switch (type) {
      case GET_POSTS:
         return {
            ...state,
            posts: payload,
            loading: false
         };
      case GET_POST:
         return {
            ...state,
            post: payload,
            loading: false
         };
      case GET_POSTS_BY_TAG:
         return {
            ...state,
            posts_by_tag: payload,
            loading: false
         };
      case ADD_POST:
         return {
            ...state,
            posts: [payload, ...state.posts],
            loading: false
         };
      case DELETE_POST:
         return {
            ...state,
            posts: state.posts.filter(post => post._id !== payload.postId),
            loading: false
         };
      case ADD_COMMENT:
         return {
            ...state,
            post: {...state.post, comments: payload},
            loading: false
         };
      case DELETE_COMMENT:
         return {
            ...state,
            post: {
               ...state.post, comments: state.post.comments.filter(comment => comment._id !== payload.commentId),
               loading: false
            }
         };
      case UPDATE_LIKES:
         return {
            ...state,
            post: {...state.post, likes: payload.likes},
            loading: false
         };
      case POST_ERROR:
         return {
            ...state,
            error: payload,
            loading: false
         };
      default:
         return state
   }

}
