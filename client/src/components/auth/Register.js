import React, {Fragment, useState, useEffect} from 'react';
import {Link, Redirect} from "react-router-dom";
import {register} from "../../actions/auth";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

const Register = ({register, isAuthenticated}) => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   });

   const [passwordError, setPasswordError] = useState('');
   const [passwordsVerified, setPasswordsVerified] = useState(false);
   const [emailTaken, setEmailTaken] = useState(false);

   const {name, email, password, password2} = formData;

   // Verify passwords on every input
   useEffect(() => {

      // TODO check if email is available on every input then update emailTaken state

      if (password.length > 0 || password2.length > 0)
         if (password.length < 6) {
            setPasswordsVerified(false);
            setPasswordError('Password length must be 6 characters or more');
         } else if (password !== password2) {
            setPasswordsVerified(false);
            setPasswordError('Passwords do not match');
         } else {
            setPasswordsVerified(true);
            setPasswordError('');
         }
   }, [formData.password, formData.password2, formData.email]);


   const onChange = async e => {
      await setFormData({...formData, [e.target.name]: e.target.value});
   };

   const onSubmit = async e => {
      e.preventDefault();
      register(formData);

   };
   if (isAuthenticated) {
      return <Redirect to={'/dashboard'}/>
   }
   return (
      <Fragment>
         <div className={'title'}>
            <h1 className="title is-1 has-text-centered">Sign Up!</h1>
            <p className="subtitle is-6 has-text-centered">Join to create stories and follow your favorite authors and
               topics.</p>
         </div>

         <div className="field">
            <label className="label">Name</label>
            <div className="control">
               <input
                  onChange={(e) => onChange(e)}
                  name={'name'}
                  className="input"
                  type="text"
                  placeholder="Name"
                  required
               />
            </div>
         </div>

         <div className="field">
            <label className="label">Email</label>
            <div className="control has-icons-left has-icons-right">
               <input
                  onChange={(e) => onChange(e)}
                  name={'email'}
                  className={"input " + (emailTaken ? 'is-danger' : '')}
                  type="email"
                  placeholder="Email"
                  value={email}
                  required/>
               <span className="icon is-small is-left"><i className="fas fa-envelope"/></span>
               <span className="icon is-small is-right"><i className="fas fa-exclamation-triangle"/></span>
            </div>
            {emailTaken && <p className="help is-danger">{'This email has been taken. Choose another'}</p>}
         </div>
         <div className="field">
            <label className="label">Password</label>
            <div className="control has-icons-left has-icons-right">
               <input
                  className={"input " + (passwordError ? 'is-danger' : passwordsVerified ? 'is-primary' : '')}
                  type="password"
                  placeholder="Password"
                  name="password"
                  minLength="6"
                  value={password}
                  onChange={e => onChange(e)}
                  required
               />
               <span className="icon is-small is-left"><i className="fas fa-lock"/></span>
               <span className="icon is-small is-right">
                  <i className={`fas fa-check has-text-${passwordError ? 'danger' : passwordsVerified ? 'primary' : ''}`}/> </span>
            </div>
            {passwordError && <p className="help is-danger">{passwordError}</p>}
         </div>
         <div className="field">
            <label className="label">Confirm Password</label>
            <div className="control has-icons-left has-icons-right">
               <div className="form-group">
                  <input
                     className={"input " + (passwordError ? 'is-danger' : passwordsVerified ? 'is-primary' : '')}
                     type="password"
                     placeholder="Confirm Password"
                     name="password2"
                     minLength="6"
                     value={password2}
                     onChange={e => onChange(e)}
                     required
                  />
               </div>
               <span className="icon is-small is-left"><i className="fas fa-lock"/></span>
               <span className="icon is-small is-right">
                  <i className={`fas fa-check has-text-${passwordError ? 'danger' : passwordsVerified ? 'primary' : ''}`}/>
               </span>
            </div>
            {passwordError && <p className="help is-danger">{passwordError}</p>}
         </div>

         <div className="field">
            <div className="control">
               <label className="checkbox">
                  <input type="checkbox"/> Email me about popular stories from my favorite categories
               </label>
            </div>
         </div>

         <div className="field is-grouped" onClick={e => onSubmit(e)}>
            <div className="control">
               <button className="button is-link">Sign Up</button>
            </div>
         </div>
      </Fragment>
   );
};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated,
   register
});

Register.propTypes = {
   register: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps, {register})(Register);
