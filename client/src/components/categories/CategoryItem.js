import React from 'react';
import PropTypes from 'prop-types';

const CategoryItem = props => {
   return (
      <div onClick={() => {
         alert('clicked')
      }} className="card">
         <div className={'category'}>
            <div className="card-image">
               <figure className="image is-4by3">
                  <img
                     src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                     alt="Placeholder image"/>
               </figure>
            </div>
            <header className="card-header">
               <p className="card-header-title">
                  Technology
               </p>
               <a href="#" className="card-header-icon" aria-label="more options">
                  <span className="icon"><i className="fas fa-laptop" aria-hidden="true"/></span>
               </a>
            </header>
         </div>

      </div>
   );
};

CategoryItem.propTypes = {};

export default CategoryItem;
