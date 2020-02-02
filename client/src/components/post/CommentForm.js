import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addComment} from "../../actions/post";

const CommentForm = ({addComment, postId}) => {
   const [body, setBody] = useState('');


   const onChange = e => {
      setBody(e.target.value);
   };

   const onFormSubmit = async e => {
      e.preventDefault();
      await addComment({body}, postId,);
      setBody('');
   };

   return (
      <form onSubmit={e => onFormSubmit(e)} className="field">
         <label className="label">Write a Response</label>
         <div className="control">
            <textarea
               name={'body'}
               onChange={e => onChange(e)}
               className="textarea"
               placeholder="Add a comment"
               value={body}/>
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
