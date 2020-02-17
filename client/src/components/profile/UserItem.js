import React from 'react';
import PropTypes from 'prop-types';
import {Link} from "react-router-dom";

const UserItem = ({name, userId}) => {
   return (
      <Link to={`/profile/user/${userId}`} className="list-item">{name}</Link>

   );
};

UserItem.propTypes = {
   name: PropTypes.string.isRequired,
   userId: PropTypes.string.isRequired
};

export default UserItem;
