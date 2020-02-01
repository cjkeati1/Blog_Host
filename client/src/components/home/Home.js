import React, {Fragment} from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import Loader from "../../loader/Loader";
import auth from "../../reducers/auth";

const title = () => {
   return <section className="hero is-medium is-dark is-bold">
      <div className="hero-body">
         <div className="container">
            <h1 className="title">
               Welcome to Blog Host
            </h1>
            <h2 className="subtitle">
               Read and write stories &mdash; all in one place.
            </h2>
         </div>
      </div>
   </section>
};
const Home = ({auth: {user, loading, isAuthenticated}}) => {
   return (loading ? <Loader/> :
      (
         <Fragment>
            {title()}
            <figure className="image ">
               <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80"/>
               <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"/>

            </figure>
         </Fragment>
      ))
};
const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, null)(Home);
