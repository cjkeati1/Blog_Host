import React from 'react';

const CategoryItem = () => {
   return (
      <div onClick={() => {
         alert('clicked')
      }} className="card">
         <div className={'category'}>
            <div className="card-image">
               <figure className="image is-4by3">
                  <img
                     src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
                     alt="Placeholder"/>
               </figure>
            </div>
            <header className="card-header">
               <p className="card-header-title">
                  Technology
               </p>
               <div className="card-header-icon" aria-label="more options">
                  <span className="icon"><i className="fas fa-laptop" aria-hidden="true"/></span>
               </div>
            </header>
         </div>

      </div>
   );
};

CategoryItem.propTypes = {};

export default CategoryItem;
