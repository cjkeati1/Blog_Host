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
         <div className="field">
            <p className="control has-icons-left has-icons-right">
               <input className="input" type="email" placeholder="Email"/>
               <span className="icon is-small is-left"><i className="fas fa-envelope"/></span>
               <span className="icon is-small is-right"><i className="fas fa-check"/></span>
            </p>
         </div>
         <div className="field">
            <p className="control has-icons-left">
               <input className="input" type="password" placeholder="Password"/>
               <span className="icon is-small is-left"><i className="fas fa-lock"/></span>
            </p>
         </div>
      </Fragment>
   );
};


export default Login;
