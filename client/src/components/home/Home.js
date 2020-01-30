import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import Loader from "../../loader/Loader";

const Home = () => {
   return <Loader/>
};
const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps)(Home);
