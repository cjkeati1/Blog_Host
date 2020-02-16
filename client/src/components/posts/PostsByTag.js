import React, {Fragment, useEffect, useState} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Loader from "../loader/Loader";
import {getPostsByTag} from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostModalForm";

// TODO If tag is clicked the component does reload
const Posts = ({getPostsByTag, post: {posts, posts_by_tag, loading}, auth, match}) => {
   useEffect(() => {
      getPostsByTag(match.params.tag)
   }, [posts]);
   const [selectedPost, setSelectedPost] = useState(null);

   return loading || auth.loading ? <Loader/> : <Fragment>
      <br/>
      <h2 className={'subtitle'}>TAGGED IN</h2>
      <h1 className="title">{match.params.tag}</h1>
      <PostForm/>
      {posts_by_tag && posts_by_tag.length > 0 ? posts_by_tag.map(post => (
         <PostItem key={post._id} post={post} setPost={setSelectedPost} selectedPost={selectedPost}/>
      )) : <p>There are currently no posts with this tag.</p>}
   </Fragment>
};

const mapStateToProps = state => ({
   post: state.post,
   auth: state.auth
});

Posts.propTypes = {
   getPostsByTag: PropTypes.func.isRequired,
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, {getPostsByTag})(Posts);
