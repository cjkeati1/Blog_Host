import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Loader from "../../loader/Loader";
import {getPosts} from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({getPosts, post: {posts, loading}}) => {
   useEffect(() => {
      getPosts();
   }, [getPosts]);
   return loading ? <Loader/> : <Fragment>
      <h1 >Posts</h1>
      <p>
         <i className="fas fa-user"/> Welcome to the community
      </p>

         {posts.length > 0 ? posts.map(post => (
            <PostItem key={post._id} post={post}/>
         )) : <p>There are currently no posts.</p>}

   </Fragment>
};

const mapStateToProps = state => ({
   post: state.post
});

Posts.propTypes = {
   getPosts: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getPosts})(Posts);
