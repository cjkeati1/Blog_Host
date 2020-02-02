import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {logout} from "../../actions/auth";

// TODO add login, signup, and logout icons
const Navbar = ({auth: {isAuthenticated, loading}, logout}) => {
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

            <div id="button" role="button" className="navbar-burger burger" aria-label="menu"
                 aria-expanded="false"
                 data-target="navbarBasicExample" onClick={() => toggleHamburger()}>
               <span aria-hidden="true"/>
               <span aria-hidden="true"/>
               <span aria-hidden="true"/>
            </div>
         </div>

         <div id="navbarBasicExample" className="navbar-menu">
            <div className="navbar-start">
               <Link className="navbar-item" to={'/'} onClick={() => toggleHamburger()}>
                  Home
               </Link>
               <Link className="navbar-item" to={'/posts'} onClick={() => toggleHamburger()}>
                  Posts
               </Link>
               <Link className="navbar-item" to={'/categories'} onClick={() => toggleHamburger()}>
                  Categories
               </Link>
               <div className="navbar-item has-dropdown is-hoverable">
                  <div className="navbar-link">
                     More
                  </div>

                  <div className="navbar-dropdown">
                     <Link className="navbar-item" to={'/about'} onClick={() => toggleHamburger()}>
                        About
                     </Link>
                     <Link className="navbar-item" to={'/contact'} onClick={() => toggleHamburger()}>
                        Contact
                     </Link>
                     <hr className="navbar-divider"/>
                     <Link className="navbar-item" to={'/report-issue'} onClick={() => toggleHamburger()}>
                        Report an issue
                     </Link>
                  </div>
               </div>

               <div className="navbar-item">
                  <div className="field has-addons">
                     <div className="control">
                        <input className="input is-normal" type="text" placeholder="Search"/>
                     </div>
                     <div className="control">
                        <div className="button is-info is-normal" onClick={() => toggleHamburger()}>
                           <i className="fas fa-search"/>
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            {isAuthenticated ? <div className="navbar-end">
               <div className="navbar-item">
                  <div className="buttons">
                     <a className="button is-danger is-inverted" onClick={() => {
                        logout();
                        toggleHamburger();
                     }}>
                        Log Out
                     </a>
                  </div>
               </div>
            </div> : <div className="navbar-end">
               <div className="navbar-item">
                  <div className="buttons">
                     <Link className="button is-primary is-inverted" to={'/register'} onClick={() => toggleHamburger()}>
                        Sign Up
                     </Link>
                     <Link className="button is-inverted is-info" to={'/login'} onClick={() => toggleHamburger()}>
                        Log In
                     </Link>
                  </div>
               </div>
            </div>}
         </div>
      </nav>
   )
};
const mapStateToProps = state => ({
   auth: state.auth,
   logout: PropTypes.func.isRequired
});

export default connect(mapStateToProps, {logout})(Navbar);
