import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {deletePost} from "../../actions/post";
import uuid from 'uuid/v4'
import {Link} from "react-router-dom";
import getDatePosted from "../../utils/getDatePosted";
import DeletePostConfirmationModal from "../post/DeletePostConfirmationModal";


const toggleModal = () => {
   document.getElementById("delete-post-modal").classList.toggle('is-active');
};


const PostItem = ({
                     post: {_id, content, title, author_name, author, likes, comments, date, tags},
                     auth,
                     setPost,
                     selectedPost
                  }) => {

// TODO figure out a way to use <Link> on tag click and make it refresh the page if already in PostsByTag component
   const postedDate = getDatePosted(date);
   return <Fragment>

      <DeletePostConfirmationModal postId={selectedPost}/>

      <div className="card">
         <header className="card-header">
            <div className="card-header-title">
               <div className="content">
                  <strong>{title}</strong> <span className={'is-size-7'}>&bull;</span> <Link
                  to={`/profile/user/${author}`}><small
                  className={'author-name has-text-weight-normal is-italic has-text-black'}>{author_name}</small></Link>
               </div>
            </div>
            {auth && auth.isAuthenticated && auth.user && author === auth.user._id &&
            <Fragment><a href="#" className="card-header-icon" aria-label="more options" onClick={() => {
               setPost(_id);
               toggleModal(selectedPost)
            }}>
              <span className="icon">
       <i className="far fa-trash-alt" style={{color: 'red'}}/>
      </span>
            </a>
            </Fragment>}
         </header>
         <div className="card-content">
            <div className="content">
               {content.length > 100 ? content.substring(0, 50) + '...' : content}
               {tags && <Fragment>
                  <br/><br/>
                  {
                     (tags.map(tag => (
                        <a href={`/tag/${tag}`}><span key={uuid()} className="tag">{tag}</span></a>
                     )))
                  }
               </Fragment>}
               <br/>
               {postedDate}
            </div>
         </div>
         <footer className="card-footer">
            <span className="card-footer-item"><i
               className={'far fa-comment has-text-grey fa-fw'}/>{` ${comments.length}`}</span>
            <span className="card-footer-item">
               <i className="far fa-thumbs-up has-text-grey fa-fw"/>{likes.length}</span>
            <Link to={`/posts/${_id}`} className="card-footer-item">View</Link>
         </footer>
      </div>
   </Fragment>
};

PostItem.propTypes = {
   post: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
   deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, {deletePost})(PostItem);

