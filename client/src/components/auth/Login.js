import React, {Fragment, useState} from 'react';
import {Redirect} from "react-router-dom";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from "../../actions/auth";
import {useHistory} from 'react-router-dom';

const Login = ({isAuthenticated, login, location}) => {
   const [formData, setFormData] = useState({
      email: '',
      password: ''
   });

   const [loginError, setLoginError] = useState(false);

   const {email, password} = formData;

   const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

   const history = useHistory();

   const onSubmit = async e => {
      e.preventDefault();
      await login(formData);

      if (!isAuthenticated) {
         setLoginError(true);
      }

   };
   if (isAuthenticated) {
      if (location.state && location.state.from) {
         history.replace(location.state.from);
      }
      // else go to home
      else {
         history.replace('/');
      }
   }
   return (
      <Fragment>
         <form onSubmit={e => onSubmit(e)}>
            <div className={'title'}>
               <h1 className="title is-1 has-text-centered">Log In</h1>
            </div>

            <div className="field">
               <label className="label">Email</label>
               <div className="control has-icons-left has-icons-right">
                  <input
                     onChange={(e) => onChange(e)}
                     name={'email'}
                     className={"input " + (loginError ? 'is-danger' : '')}
                     type="email"
                     placeholder="Email"
                     value={email}
                     required/>
                  <span className="icon is-small is-left"><i className="fas fa-envelope"/></span>

               </div>
               {loginError &&
               <p className="help is-danger">{'Invalid email or password. Try again'}</p>}
            </div>
            <div className="field">
               <label className="label">Password</label>
               <div className="control has-icons-left has-icons-right">
                  <input
                     onChange={(e) => onChange(e)}
                     className={"input " + (loginError ? 'is-danger' : '')}
                     type="password"
                     placeholder="Password"
                     name="password"
                     minLength="6"
                     value={password}
                     required
                  />
                  <span className="icon is-small is-left"><i className="fas fa-lock"/></span>

               </div>
               {loginError &&
               <p className="help is-danger">{'Invalid email or password. Try again'}</p>}            </div>


            <div className="field is-grouped">
               <div className="control">
                  <button className="button is-link">Log In</button>
               </div>
            </div>
         </form>
      </Fragment>

   );
};
const mapStateToProps = state => ({
   isAuthenticated: state.auth.isAuthenticated
});
Login.propTypes = {
   login: PropTypes.func.isRequired,
   isAuthenticated: PropTypes.bool.isRequired
};
export default connect(mapStateToProps, {login})(Login);
