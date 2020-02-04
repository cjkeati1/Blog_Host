import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {getPost, updateLikes} from "../../actions/post";
import {connect} from "react-redux";
import Loader from "../loader/Loader";
import Moment from "react-moment";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import {Link} from "react-router-dom";
import {LIKE, UNLIKE} from "../../utils/enums";

const Post = ({post: {loading, post}, match, auth, getPost, updateLikes}) => {
   useEffect(() => {
      getPost(match.params.id);
   }, [getPost, match.params.id]);

   return loading || auth.loading || post === null ? <Loader/> :
      <Fragment>
         <p className="title is-1 is-spaced has-text-centered has-text-left-mobile">{post.title}</p>
         <section className="has-text-centered has-text-left-mobile">
            <p className="subtitle">{post.author_name}</p>
            <h2 className="subtitle is-size-6">
               <Moment format={'MMMM DD, YYYY'}>{post.date}</Moment>
            </h2>
         </section>

         <section className="section">
            {post.content}
         </section>

         <div className="field is-grouped is-grouped-multiline">
            <div className="control">
               <div className="tags has-addons">
                  <span className="tag is-white">
                     <i onClick={() => auth.user ? updateLikes(post._id, LIKE) : null}
                        className={`far fa-thumbs-up has-text-${
                           post.likes.find(like =>
                              auth.user && like.user === auth.user._id) !== undefined ?
                              'primary' : 'grey'} fa-fw control`}/>
                  </span>
                  <span className="tag is-white">
               <i className={'control'}>{post.likes.length}</i>
                  </span>
                  <span className="tag is-white">
               <i className="far fa-thumbs-down has-text-grey fa-fw control"
                  onClick={() => auth.user ? updateLikes(post._id, UNLIKE) : null}/>
                  </span>
               </div>
            </div>

         </div>
         {auth.isAuthenticated ? <CommentForm postId={post._id}/>
            : <div><p>You must be <Link to={'/login'}>logged in</Link> to reply</p><br/></div>}
         <p className="title is-5 is-spaced has-text-centered has-text-left-mobile is-marginless">Replies</p>
         <hr className={'style10'}/>
         {post.comments.length > 0 ? post.comments.map(comment => (
            <CommentItem postId={post._id} currentUser={auth.user ? auth.user._id : null} key={comment._id}
                         comment={comment}/>
         )) : <p>There are currently no comments on this post.</p>}

      </Fragment>
};

Post.propTypes = {
   getPost: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired,
   updateLikes: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   post: state.post,
   auth: state.auth
});

export default connect(mapStateToProps, {getPost, updateLikes})(Post);
