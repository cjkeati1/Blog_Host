import React from 'react';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import PropTypes from 'prop-types'

const Home = () => {
   return <div>Home</div>
};
const mapStateToProps = state => ({
   auth: state.auth
});

export default connect(mapStateToProps)(Home);
