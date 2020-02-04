import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from "../../actions/post";

const CommentForm = ({addComment, postId}) => {
   const [content, setContent] = useState('');

   const onChange = e => {
      setContent(e.target.value);
   };

   const onFormSubmit = async e => {
      e.preventDefault();
      await addComment({content}, postId);
      setContent('');
   };

   return (
      <form onSubmit={e => onFormSubmit(e)} className="field">
         <label className="label">Write a Response</label>
         <div className="control">
            <textarea
               name={'content'}
               onChange={e => onChange(e)}
               className="textarea"
               placeholder="Add a comment"
               value={content}/>
         </div>
         <div className="field">
            <div className="control">
               <button className="button is-primary is-outlined" style={{marginTop: '5px'}}>Publish</button>
            </div>
         </div>
      </form>
   );
};

CommentForm.propTypes = {
   addComment: PropTypes.func.isRequired,
   postId: PropTypes.string.isRequired
};

export default connect(null, {addComment})(CommentForm);
