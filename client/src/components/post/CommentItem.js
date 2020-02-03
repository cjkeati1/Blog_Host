import React from 'react';
import PropTypes from 'prop-types';
import getDatePosted from "../../utils/getDatePosted";
import {deleteComment} from "../../actions/post";
import {connect} from 'react-redux'
import {Link} from "react-router-dom";

// TODO, add a modal confirmation when deleting comments
const CommentItem = ({postId, comment, currentUser, deleteComment}) => {
   const datePosted = getDatePosted(comment.date);
   return (
      <div style={{marginBottom: '20px'}}>
         <article className="media">
            <div className="media-content">
               <div className="content">
                  <p>
                     <Link to={`/profile/user/${comment.user}`}
                           className={'author-name has-text-black'}><strong>{comment.name}</strong></Link>
                     <small> {datePosted}</small>
                     <br/>
                     {comment.body}
                  </p>
               </div>
            </div>
            {comment.user === currentUser && <div className="media-right">
               <button onClick={() => deleteComment(postId, comment._id)} className="delete"/>
            </div>
            }
         </article>
      </div>
   );
};

CommentItem.propTypes = {
   comment: PropTypes.object.isRequired,
   currentUser: PropTypes.string.isRequired,
   postId: PropTypes.string.isRequired,
   deleteComment: PropTypes.func.isRequired
};


export default connect(null, {deleteComment})(CommentItem);
