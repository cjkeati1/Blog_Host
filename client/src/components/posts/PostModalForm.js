import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {addPost} from "../../actions/post";

const toggleModal = () => {
   document.getElementById("modal").classList.toggle('is-active');
};

const PostModalForm = ({addPost}) => {
   const [formData, setFormData] = useState({
      title: '',
      content: '',
      tags: '',
      category: '',
   });

   // TODO Display error alert on a post error
   //const [postError, setPostError] = useState(false);

   const onChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value});
   };

   const onFormSubmit = async e => {
      e.preventDefault();
      try {
         await addPost(formData);
         toggleModal();

      } catch (err) {
         //setPostError(true);
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
               <form onSubmit={(e) => onFormSubmit(e)}>
                  <div className="field">
                     <label className="label">Title</label>
                     <div className="control">
                        <input onChange={(e) => onChange(e)} className="input" value={formData.title} type="text"
                               placeholder="Text input"
                               name={'title'} required/>
                     </div>
                  </div>
                  <div className="field">
                     <label className="label">Write a Post</label>
                     <div className="control">
                        <textarea onChange={(e) => onChange(e)} className="textarea" value={formData.content}
                                  placeholder="What's on your mind?"
                                  name={'content'} required/>
                     </div>
                  </div>
                  <div className="field">
                     <label className="label">Tags</label>
                     <div className="control">
                        <input onChange={(e) => onChange(e)} className="input" type="text" value={formData.tags}
                               name={'tags'}
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

