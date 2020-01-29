import React from 'react';
import {Link} from "react-router-dom";
import 'react-bulma-components/dist/react-bulma-components.min.css';

const Navbar = () => {
   const toggleHamburger = () => {
      document.getElementById("navbarBasicExample").classList.toggle('is-active');
      document.getElementById("button").classList.toggle('is-active');
   };
   return (
      <nav className="navbar" role="navigation" aria-label="main navigation">
         <div className="navbar-brand">
            <Link className="navbar-item" to="/">
               <i className="fas fa-blog"/> <span className={'has-text-weight-bold'}>&nbsp;Blog Host</span>
            </Link>

            <a id="button" role="button" className="navbar-burger burger is-active" aria-label="menu"
               aria-expanded="false"
               data-target="navbarBasicExample" onClick={() => toggleHamburger()}>
               <span aria-hidden="true"/>
               <span aria-hidden="true"/>
               <span aria-hidden="true"/>
            </a>
         </div>

         <div id="navbarBasicExample" className="navbar-menu is-active">
            <div className="navbar-start">
               <Link className="navbar-item">
                  Home
               </Link>

               <div className="navbar-item has-dropdown is-hoverable">
                  <Link className="navbar-link">
                     More
                  </Link>

                  <div className="navbar-dropdown">
                     <Link className="navbar-item">
                        About
                     </Link>
                     <Link className="navbar-item">
                        Jobs
                     </Link>
                     <Link className="navbar-item">
                        Contact
                     </Link>
                     <hr className="navbar-divider"/>
                     <a className="navbar-item">
                        Report an issue
                     </a>
                  </div>
               </div>

               <Link className="navbar-item">
                  <div className="field has-addons">
                     <div className="control">
                        <input className="input is-normal" type="text" placeholder="Find a post"/>
                     </div>
                     <div className="control">
                        <a className="button is-info is-normal">
                           <i className="fas fa-search"/>
                        </a>
                     </div>
                  </div>
               </Link>
            </div>

            <div className="navbar-end">
               <div className="navbar-item">
                  <div className="buttons">
                     <a className="button is-primary">
                        <strong>Sign up</strong>
                     </a>
                     <a className="button is-light">
                        Log in
                     </a>
                  </div>
               </div>
            </div>
         </div>
      </nav>
   )
};


export default Navbar;
