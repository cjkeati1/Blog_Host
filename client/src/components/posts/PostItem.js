import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import {connect} from "react-redux";

const PostItem = ({
                     post: {_id, title, body, name, category, user, likes, comments, date, tags},
                     auth
                  }) => {

   // TODO Delete post when user presses on delete icon
   return <Fragment>
      <div className="card">
         <header className="card-header">
            <p className="card-header-title">
               {title} by {name}
            </p>
            <a href="#" className="card-header-icon" aria-label="more options">
               {auth && auth.isAuthenticated && user === auth.user._id && <span className="icon">
       <i className="far fa-trash-alt" style={{color: 'red'}}/>
      </span>}
            </a>
         </header>
         <div className="card-content">
            <div className="content">
               {body}
               <br/>
               Posted on <Moment format={'l'}>{date}</Moment> at <Moment format={'h:mm:ss a'}>{date}</Moment>
            </div>
         </div>
         <footer className="card-footer">
            <span className="card-footer-item">{comments.length} comments</span>
            <span className="card-footer-item">{likes.length} likes</span>
            <span className="card-footer-item">View</span>
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
};

const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps)(PostItem);
