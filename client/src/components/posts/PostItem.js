import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import Moment from "react-moment";
import {connect} from "react-redux";

const PostItem = ({
                     post: {_id, title, body, name, category, user, likes, comments, date, tags},
                     auth
                  }) => {
   return <Fragment>
      <div className="card">
         <header className="card-header">
            <p className="card-header-title">
               {title}
            </p>
         </header>
         <div className="card-content">
            <div className="content">
               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec iaculis mauris.
               <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
               <br/>
               Posted on <Moment format={'l'}>{date}</Moment> at <Moment format={'h:mm:ss a'}>{date}</Moment>
            </div>
         </div>
         <footer className="card-footer">
            <span className="card-footer-item">{comments.length} comments</span>
            <span  className="card-footer-item">{likes.length} likes</span>
            <span  className="card-footer-item">View</span>
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
