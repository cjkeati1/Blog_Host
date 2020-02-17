import React, {useState} from 'react';
import PropTypes from 'prop-types';
import UserItem from "./UserItem";

const toggleModal = () => {
   document.getElementById("followers-modal").classList.toggle('is-active');
};

const FollowersModal = ({followers}) => {
   return (
      <div id={'followers-modal'} className="modal">
         <div className="modal-background"/>
         <div className="modal-card">
            <header className="modal-card-head">
               <p className="modal-card-title">{followers.length} Follower{(followers.length !== 1) ? 's' : null}</p>
               <button onClick={() => toggleModal()} className="delete" aria-label="close"/>
            </header>
            <div className="modal-card-body">
               <div className="list is-hoverable">
                  {followers.map(follower => (
                     <UserItem key={follower._id} userId={follower.user._id} name={follower.user.name}/>
                  ))
                  }
               </div>
            </div>
            <footer className="modal-card-foot">
               <button onClick={() => toggleModal()} className="button">Close</button>
            </footer>
         </div>
      </div>
   );
};

FollowersModal.propTypes = {
   followers: PropTypes.array.isRequired
};


export default FollowersModal;

