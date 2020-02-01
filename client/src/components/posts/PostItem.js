import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import {connect} from "react-redux";
import {deletePost} from "../../actions/post";
import uuid from 'uuid/v4'
import {Link} from "react-router-dom";

const PostItem = ({
                     post: {_id, title, body, name, category, user, likes, comments, date, tags},
                     auth,
                     deletePost
                  }) => {

   const getDatePosted = () => {
      const postedDate = new Date(date);
      const now = new Date();

      // If posted today
      if (postedDate.getDate() === now.getDate() &&
         postedDate.getMonth() === now.getMonth() &&
         postedDate.getFullYear() === now.getFullYear()) {
         return <Moment fromNow>{date}</Moment>;
      }
      // If not posted today
      else {
         return <Moment
            format={`MMM ${(postedDate.getFullYear() === now.getFullYear()) ? 'D' : 'D, YYYY'}`}>{now}</Moment>;
      }
   };
   const postedDate = getDatePosted(date);

   return <Fragment>
      <div className="card">
         <header className="card-header">
            <p className="card-header-title">
               {title} by {name}
            </p>
            <a href="#" className="card-header-icon" aria-label="more options">
               {auth && auth.isAuthenticated && user === auth.user._id && <span className="icon">
       <i className="far fa-trash-alt" style={{color: 'red'}} onClick={() => deletePost(_id)}/>
      </span>}
            </a>
         </header>
         <div className="card-content">
            <div className="content">
               {body}
               {tags && <br/>}
               {tags && (tags.map(tag => (
                  <a key={uuid()} href="#">#{tag} </a>
               )))}
               <br/>
               {postedDate}
            </div>
         </div>
         <footer className="card-footer">
            <span className="card-footer-item">{comments.length} comments</span>
            <span className="card-footer-item">{likes.length} like{likes.length === 1 ? null : 's'}</span>
            <Link to={`/posts/${_id}`} className="card-footer-item">View</Link>
         </footer>
      </div>
   </Fragment>
};


PostItem.defaultProps = {
   showActions: true
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

