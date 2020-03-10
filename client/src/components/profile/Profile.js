import React, {useEffect, Fragment} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getProfileById, updateFollows} from "../../actions/profile";
import Loader from "../loader/Loader";
import {FOLLOW, UNFOLLOW} from "../../utils/enums";
import FollowersModal from "./FollowersModal";
import FollowingModal from "./FollowingModal";

const Profile = ({
                    getProfileById,
                    updateFollows,
                    profile: {profile, loading},
                    auth,
                    match
                 }) => {

   const toggleEditModal = () => {
      document.getElementById("edit-preferences-modal").classList.toggle('is-active');
   };
   const toggleFollowersModal = () => {
      document.getElementById("followers-modal").classList.toggle('is-active');
   };
   const toggleFollowingModal = () => {
      document.getElementById("following-modal").classList.toggle('is-active');
   };

   useEffect(() => {
      getProfileById(match.params.id)
   }, [getProfileById, match.params.id]);
   return (
      <Fragment>
         {profile === null || loading || profile.user._id !== match.params.id ? <Loader/> :
            <Fragment>
               <div className='columns'>
                  <div className='container profile'>
            {/*         <div className='modal' id='edit-preferences-modal'>*/}
            {/*            <div className='modal-background'/>*/}
            {/*            <div className='modal-card'>*/}
            {/*               <header className='modal-card-head'>*/}
            {/*                  <p className='modal-card-title'>Edit Profile</p>*/}
            {/*                  <button className='delete' onClick={() => toggleEditModal()}/>*/}
            {/*               </header>*/}
            {/*               <section className='modal-card-body'>*/}
            {/*                  <label className='label'>Name</label>*/}
            {/*                  <p className='control'>*/}
            {/*                     <input className='input' placeholder='Text input' type='text'/>*/}
            {/*                  </p>*/}
            {/*                  <div className='control'>*/}
            {/*                     <div className='control-label is-pulled-left'>*/}
            {/*                        <label className='label'>Date of Birth</label>*/}
            {/*                     </div>*/}
            {/*                     <span>*/}
            {/*  <span className='select'>*/}
            {/*    <select>*/}
            {/*      <option>Month</option>*/}
            {/*      <option>With options</option>*/}
            {/*    </select>*/}
            {/*  </span>*/}
            {/*  <span className='select'>*/}
            {/*    <select>*/}
            {/*      <option>Day</option>*/}
            {/*      <option>With options</option>*/}
            {/*    </select>*/}
            {/*  </span>*/}
            {/*  <span className='select'>*/}
            {/*    <select>*/}
            {/*      <option>Year</option>*/}
            {/*      <option>With options</option>*/}
            {/*    </select>*/}
            {/*  </span>*/}
            {/*</span>*/}
            {/*                  </div>*/}
            {/*                  <label className='label'>Description</label>*/}
            {/*                  <p className='control'>*/}
            {/*                     <textarea className='textarea' placeholder='Describe Yourself!'/>*/}
            {/*                  </p>*/}
            {/*                  <div className='content'>*/}
            {/*                     <h1>Optional Information</h1>*/}
            {/*                  </div>*/}
            {/*                  <label className='label'>Phone Number</label>*/}
            {/*                  <p className='control has-icon has-icon-right'>*/}
            {/*                     <input className='input' placeholder='Text input' type='text' value='+1 *** *** 0535'/>*/}
            {/*                  </p>*/}
            {/*                  <label className='label'>Work</label>*/}
            {/*                  <p className='control has-icon has-icon-right'>*/}
            {/*                     <input className='input' placeholder='Text input' type='text'*/}
            {/*                            value='Greater Washington Publishing'/>*/}
            {/*                  </p>*/}
            {/*                  <label className='label'>School</label>*/}
            {/*                  <p className='control has-icon has-icon-right'>*/}
            {/*                     <input className='input' placeholder='Text input' type='text'*/}
            {/*                            value='George Mason University'/>*/}
            {/*                  </p>*/}
            {/*               </section>*/}
            {/*               <footer className='modal-card-foot'>*/}
            {/*                  <a className='button is-primary modal-save' onClick={() => toggleEditModal()}>Save*/}
            {/*                     changes</a>*/}
            {/*                  <a className='button modal-cancel' onClick={() => toggleEditModal()}>Cancel</a>*/}
            {/*               </footer>*/}
            {/*            </div>*/}
            {/*         </div>*/}
                     <div className='section profile-heading'>
                        <div className='columns is-mobile is-multiline'>
                           <div className='column is-4-tablet is-10-mobile name'>
                              <p>
                                 <span className='title is-bold'>{profile.user ? profile.user.name : 'No Name'}</span>
                                 <br/>
                                 {/*{auth.isAuthenticated && auth.loading === false && auth.user._id ===*/}
                                 {/*profile.user._id &&*/}
                                 {/*<a className='button is-primary is-outlined' href='#' id='edit-preferences'*/}
                                 {/*   style={{margin: '5px 0'}}*/}
                                 {/*   onClick={() => toggleEditModal()}>*/}
                                 {/*   Edit Profile*/}
                                 {/*</a>}*/}
                                 <br/>
                              </p>
                              <p className='tagline'>
                                 {/*{bio}*/}
                              </p>
                           </div>
                           <div onClick={() => toggleFollowersModal()}
                                className='follow-stats column is-2-tablet is-4-mobile has-text-centered'>
                              <p className='stat-val'>{profile.user.followers.length}</p>
                              <p className='stat-key'>Follower{(profile.user.followers.length !== 1) ? 's' : null} </p>
                           </div>
                           <FollowersModal name={profile.user.name} followers={profile.user.followers}/>


                           <div onClick={() => toggleFollowingModal()}
                                className='follow-stats column is-2-tablet is-4-mobile has-text-centered'>
                              <p className='stat-val'>{profile.user.following.length}</p>
                              <p className='stat-key'>Following</p>
                           </div>
                           <FollowingModal following={profile.user.following}/>


                           {auth.isAuthenticated && auth.loading === false && auth.user._id !==
                           profile.user._id && <div className='column has-text-centered '>
                              {profile.user.followers
                                 .find(follower => follower.user._id === auth.user._id) ?
                                 <button
                                    onClick={() => updateFollows(profile.user, UNFOLLOW)}
                                    className='button is-danger is-light'>
                                    Unfollow
                                 </button> :
                                 <button
                                    onClick={() => updateFollows(profile.user, FOLLOW)}
                                    className='button is-primary is-light'>
                                    Follow
                                 </button>
                              }
                           </div>}
                        </div>
                     </div>
                  </div>
               </div>
            </Fragment>}
      </Fragment>
   );
};

const mapStateToProps = state => ({
   profile: state.profile,
   auth: state.auth
});

Profile.propTypes = {
   getProfileById: PropTypes.func.isRequired,
   updateFollows: PropTypes.func.isRequired,
   profile: PropTypes.object.isRequired,
   auth: PropTypes.object.isRequired,
};

export default connect(mapStateToProps, {getProfileById, updateFollows})(Profile);
