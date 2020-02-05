import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import {connect} from "react-redux";
import {deletePost} from "../../actions/post";
import uuid from 'uuid/v4'
import {Link} from "react-router-dom";
import getDatePosted from "../../utils/getDatePosted";

const PostItem = ({
                     post: {_id, content, title, author_name, author, likes, comments, date, tags},
                     auth,
                     deletePost
                  }) => {


   const postedDate = getDatePosted(date);

   return <Fragment>
      <div className="card">
         <header className="card-header">
            <div className="card-header-title">
               <div className="content">
                  <strong>{title}</strong> <span className={'is-size-7'}>&bull;</span> <Link
                  to={`/profile/user/${author}`}><small
                  className={'author-name has-text-weight-normal is-italic has-text-black'}>{author_name}</small></Link>
               </div>
            </div>
            <a href="#" className="card-header-icon" aria-label="more options">
               {auth && auth.isAuthenticated && author === auth.user._id && <span className="icon">
       <i className="far fa-trash-alt" style={{color: 'red'}} onClick={() => deletePost(_id)}/>
      </span>}
            </a>
         </header>
         <div className="card-content">
            <div className="content">
               {content.length > 100 ? content.substring(0, 50) + '...' : content}
               {tags && <Fragment>
                  <br/><br/>
                  {
                     (tags.map(tag => (
                        <span key={uuid()} className="tag">{tag}</span>
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

