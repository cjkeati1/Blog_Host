import React, { useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from "../../actions/post";

const toggleModal = () => {
   document.getElementById("modal").classList.toggle('is-active');
};

const PostModalForm = ({addPost}) => {
   const [formData, setFormData] = useState({
      title: '',
      body: '',
      tags: '',
      category: '',
   });

   const [postError, setPostError] = useState(false);

   const onChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value});
   };

   const onFormSubmit = async e => {
      e.preventDefault();
      try {
         await addPost(formData);
         setFormData({
            title: '',
            body: '',
            tags: '',
            category: ''
         });
         toggleModal();

      } catch (err) {
         setPostError(true);
      }

   };
   return (
      <div id={'modal'} className="modal">
         <div className="modal-background"/>
         <div className="modal-card">
            <header className="modal-card-head">
               <p className="modal-card-title">Create a Post!</p>
               <button onClick={() => toggleModal()} className="delete" aria-label="close"/>
            </header>
            <section className="modal-card-body">
               <form onChange={(e) => onChange(e)} onSubmit={(e) => onFormSubmit(e)}>
                  <div className="field">
                     <label className="label">Title</label>
                     <div className="control">
                        <input className="input" value={formData.title} type="text" placeholder="Text input"
                               name={'title'} required/>
                     </div>
                  </div>
                  <div className="field">
                     <label className="label">Write a Post</label>
                     <div className="control">
                        <textarea className="textarea" value={formData.body} placeholder="What's on your mind?"
                                  name={'body'} required/>
                     </div>
                  </div>
                  <div className="field">
                     <label className="label">Category</label>
                     <div className="control">
                        <input className="input" type="text" value={formData.category} placeholder="Text input"
                               name={'category'} required/>
                     </div>
                  </div>
                  <div className="field">
                     <label className="label">Tags</label>
                     <div className="control">
                        <input className="input" type="text" value={formData.tags} name={'tags'}
                               placeholder="Text input"/>
                     </div>
                     <p className="help">Enter tags as comma separated values (e.g. food,bacon,breakfast)</p>
                  </div>
               </form>
            </section>
            <footer className="modal-card-foot">
               <button onClick={(e) => onFormSubmit(e)} className="button is-success">Create</button>
               <button onClick={() => toggleModal()} className="button">Cancel</button>
            </footer>
         </div>
      </div>
   );
};

PostModalForm.propTypes = {
   addPost: PropTypes.func.isRequired
};

export default connect(null, {addPost})(PostModalForm);

