import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import Loader from "../../loader/Loader";
import auth from "../../reducers/auth";

const Home = ({auth: {user, loading, isAuthenticated}}) => {
   return (loading ? <Loader/> : (isAuthenticated ? user && <p> Welcome, {user.name}</p> : <p>Welcome, stranger</p>))
};
const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps, null)(Home);
