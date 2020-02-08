import React, {Fragment} from 'react';
import {connect} from "react-redux";
import Loader from "../loader/Loader";

const title = () => {
   return <section className="hero is-medium is-dark is-bold">
      <div className="hero-body">
         <div className="container">
            <h1 className="title">
               Welcome to Easy Blogs
            </h1>
            <h2 className="subtitle">
               Read and write stories &mdash; all in one place.
            </h2>
         </div>
      </div>
   </section>
};
const Home = ({auth: {loading}}) => {
   return (loading ? <Loader/> :
      (
         <Fragment>
            {title()}
         </Fragment>
      ))
};
const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, null)(Home);
