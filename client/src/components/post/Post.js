import React, {Fragment, useEffect} from 'react';
import PropTypes from 'prop-types';
import {getPost} from "../../actions/post";
import {connect} from "react-redux";
import Loader from "../../loader/Loader";
import Moment from "react-moment";
import {body} from "express-validator";
import CommentItem from "./CommentItem";
import PostItem from "../posts/PostItem";

const Post = ({post: {loading, post}, match, auth, getPost}) => {
   useEffect(() => {
      console.log(match.params.id);
      getPost(match.params.id);
   }, []);

   return loading || auth.loading || post === null ? <Loader/> :
      <Fragment>
         <p className="title is-1 is-spaced has-text-centered has-text-left-mobile">{post.title}</p>
         <section className="has-text-centered has-text-left-mobile">
            <p className="subtitle ">{post.name}</p>
            <h2 className="subtitle">
               <Moment format={'MMMM DD, YYYY'}>{post.date}</Moment>
            </h2>
         </section>

         <section className="section">
            <div className="container">
               {post.body}
            </div>
         </section>
         {post.comments.length > 0 ? post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment}/>
         )) : <p>There are currently no comments on this post.</p>}

      </Fragment>
};

Post.propTypes = {
   getPost: PropTypes.func.isRequired,
   auth: PropTypes.object.isRequired,
   post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
   post: state.post,
   auth: state.auth
});

export default connect(mapStateToProps, {getPost})(Post);
