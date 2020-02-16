import React from 'react';
import PropTypes from 'prop-types';

const UserItem = ({name, profileId}) => {
   return (
      <span >{name}</span>

   );
};

UserItem.propTypes = {
   name: PropTypes.string.isRequired,
   userId: PropTypes.string.isRequired
};

export default UserItem;
