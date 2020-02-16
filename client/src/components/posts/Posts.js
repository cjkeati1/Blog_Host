import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Loader from "../loader/Loader";
import {getPosts} from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostModalForm";
import {Link} from "react-router-dom";

const toggleModal = () => {
   document.getElementById("modal").classList.toggle('is-active');
};


const Posts = ({getPosts, post: {posts, loading}, auth}) => {
   useEffect(() => {
      getPosts();
   }, [getPosts]);
   const [selectedPost, setSelectedPost] = useState(null);
   return loading || auth.loading ? <Loader/> : <Fragment>

      <p className="title  is-1">Posts</p>
      <p className=" subtitle is-4">Explore fascinating stories...</p>

      {auth.isAuthenticated ? <button
         onClick={() => toggleModal()}
         className="button is-success is-inverted is-large is-paddingless	">
         Create a Post
      </button> : <p><Link to={{pathname: '/login', state: {from: '/posts'}}}>Log in</Link> to create a post</p>}
      <PostForm/>
      {posts.length > 0 ? posts.map(post => (
         <PostItem key={post._id} post={post} setPost={setSelectedPost} selectedPost={selectedPost}/>
      )) : <p>There are currently no posts.</p>}
   </Fragment>
};

const mapStateToProps = state => ({
   post: state.post,
   auth: state.auth
});

Posts.propTypes = {
   getPosts: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getPosts})(Posts);
