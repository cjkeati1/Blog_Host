import React, {useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {sendMessage} from "../../actions/contact";
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';

const Contact = ({sendMessage}) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      message: '',
   });

   const history = useHistory();

   const onChange = e => {
      setFormData({...formData, [e.target.name]: e.target.value});
   };

   const onFormSubmit = async e => {
      e.preventDefault();
      try {
         await sendMessage(formData);

         let path = `/contact/confirmation`;
         history.push(path);
      } catch (err) {
         //setPostError(true);
      }
   };

   return (
      <section className="hero is-fullheight">
         <div className="hero-body">
            <div className="container has-text-centered">
               <div className="columns is-8 is-variable ">
                  <div className="column is-two-thirds has-text-left">
                     <h1 className="title is-1">Contact Us</h1>
                     <p className="is-size-4">Feel free to let us know about any questions/concerns you may have. </p>
                  </div>
                  <div className="column is-one-third has-text-left">
                     <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                           <input className="input is-medium"
                                  name={"name"}
                                  type="text"
                                  onChange={e => onChange(e)}/>
                        </div>
                     </div>
                     <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                           <input
                              className="input is-medium"
                              name={"email"}
                              type="text"
                              onChange={e => onChange(e)}/>
                        </div>
                     </div>
                     <div className="field">
                        <label className="label">Message</label>
                        <div className="control">
                           <textarea
                              className="textarea is-medium"
                              name={"message"}
                              onChange={e => onChange(e)}/>
                        </div>
                     </div>
                     <div className="control">
                        <button
                           type="submit"
                           className="button is-link is-fullwidth has-text-weight-medium is-medium"
                           onClick={e => onFormSubmit(e)}>Send Message
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
};

Contact.propTypes = {
   sendMessage: PropTypes.func.isRequired
};

export default connect(null, {sendMessage})(Contact);
