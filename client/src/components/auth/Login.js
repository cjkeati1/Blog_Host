import React, {Fragment, useState} from 'react';
import {Link, Redirect} from "react-router-dom";

const Login = () => {
   const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      password2: ''
   });

   const {name, email, password, password2} = formData;

   const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

   const onSubmit = async e => {
      e.preventDefault();

   };

   return (
      <Fragment>
         <div className={'title'}>
            <h1 className="title is-1 has-text-centered">Login</h1>

         </div>
         <div className="field">
            <p className="control has-icons-left has-icons-right">
               <input className="input" type="email" placeholder="Email"/>
               <span className="icon is-small is-left"><i className="fas fa-envelope"/></span>
            </p>
         </div>
         <div className="field">
            <p className="control has-icons-left">
               <input className="input" type="password" placeholder="Password"/>
               <span className="icon is-small is-left"><i className="fas fa-lock"/></span>
            </p>
         </div>

         <div className="field is-grouped" onClick={e => onSubmit(e)}>
            <div className="control">
               <button className="button is-link">Login</button>
            </div>
         </div>
      </Fragment>

   );
};


export default Login;
