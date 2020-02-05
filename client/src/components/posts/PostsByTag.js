import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import Loader from "../loader/Loader";
import {getPostsByTag} from "../../actions/post";
import PostItem from "./PostItem";
import PostForm from "./PostModalForm";

const Posts = ({getPostsByTag, post: {posts_by_tag, loading}, auth, match}) => {
   useEffect(() => {
      getPostsByTag(match.params.tag)
   }, []);
   return loading || auth.loading ? <Loader/> : <Fragment>
      <p className="has-text-grey">TAGGED IN</p>
      <h1 className={'title has-text-left is-marginless'}>{match.params.tag}</h1>

      <PostForm/>
      {posts_by_tag && posts_by_tag.length > 0 ? posts_by_tag.map(post => (
         <PostItem key={post._id} post={post}/>
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
