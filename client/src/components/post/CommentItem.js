import React from 'react';
import PropTypes from 'prop-types';
import getDatePosted from "../../utils/getDatePosted";
import {deleteComment} from "../../actions/post";
import {connect} from 'react-redux'
import {Link} from "react-router-dom";
import DeleteCommentConfirmationModal from "./DeleteCommentConfirmationModal";


const toggleModal = () => {
   document.getElementById("delete-comment-modal").classList.toggle('is-active');
};

// TODO, add a modal confirmation when deleting comments
const CommentItem = ({postId, comment, currentUser, deleteComment}) => {
   const datePosted = getDatePosted(comment.date);
   return (
      <div className={"is-size-6"} style={{marginBottom: '20px'}}>
         <article className="media">
            <div className="media-content">
               <div className="content">
                  <p>
                     <Link to={`/profile/user/${comment.author}`}
                           className={'author-name has-text-black'}><strong>{comment.author_name}</strong></Link>
                     <small> {datePosted}</small>
                     <br/>
                     {comment.content}
                  </p>
               </div>
            </div>
            <DeleteCommentConfirmationModal postId={postId} commentId={comment._id}/>
            {comment.author === currentUser && <div className="media-right">
               <span className="icon">
                  <i
                     onClick={() => toggleModal()}
                     className="far fa-trash-alt"
                     style={{color: 'red'}}/>
               </span>
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
