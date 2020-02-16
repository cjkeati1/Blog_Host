import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {deleteComment} from "../../actions/post";

const toggleModal = () => {
   document.getElementById("delete-comment-modal").classList.toggle('is-active');
};

const DeleteCommentConfirmationModal = ({postId, commentId, deleteComment}) => {
   const onFormSubmit = async e => {
      e.preventDefault();
      try {
         toggleModal();

         await deleteComment(postId, commentId);

      } catch (err) {
         //setPostError(true);
      }

   };

   return (
      <div id={'delete-comment-modal'} className="modal">
         <div className="modal-background"/>
         <div className="modal-card">
            <header className="modal-card-head">
               <p className="modal-card-title">Delete comment?</p>
               <button onClick={() => toggleModal()} className="delete" aria-label="close"/>
            </header>
            <footer className="modal-card-foot">
               <button onClick={(e) => onFormSubmit(e)} className="button is-danger">Yes</button>
               <button onClick={() => toggleModal()} className="button">No</button>
            </footer>
         </div>
      </div>
   );
};

DeleteCommentConfirmationModal.propTypes = {
   deleteComment: PropTypes.func.isRequired,
   postId: PropTypes.string.isRequired,
   commentId: PropTypes.string
};


export default connect(null, {deleteComment})(DeleteCommentConfirmationModal);

