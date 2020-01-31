import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from "../../actions/post";

const PostForm = ({addPost}) => {
   const [text, setText] = useState('');

   return (

      <div className="modal">
         <div className="modal-background"/>
         <div className="modal-card">
            <header className="modal-card-head">
               <p className="modal-card-title">Create a Post!</p>
               <button className="delete" aria-label="close"/>
            </header>
            <section className="modal-card-body">
               <div className="field">
                  <label className="label">What's On Your Mind?</label>
                  <div className="control">
                     <textarea className="textarea" placeholder="Textarea"/>
                  </div>
               </div>
            </section>
            <footer className="modal-card-foot">
               <button className="button is-success">Save changes</button>
               <button className="button">Cancel</button>
            </footer>
         </div>
      </div>

   );
};

PostForm.propTypes = {
   addPost: PropTypes.func.isRequired
};

export default connect(null, {addPost})(PostForm);

