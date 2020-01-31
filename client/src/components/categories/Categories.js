import React, {Fragment, useEffect} from 'react';
import CategoryItem from "./CategoryItem";
import {BrowserRouter as Router} from "react-router-dom";


const Categories = () => {

   return <Fragment>
      <section className="hero is-medium is-light is-bold">
         <div className="hero-body">
            <div className="container">
               <h1 className="title">
                  Categories
               </h1>
               <h2 className="subtitle">
                  Don't waste time. Dive right into the topics that interest you.
               </h2>
            </div>
         </div>
      </section>
      <div className={'container'}>

         <div className="columns">
            <div className="column">
               <CategoryItem/>
            </div>
            <div className="column">
               <CategoryItem/>
            </div>
            <div className="column">
               <CategoryItem/>
            </div>
         </div>
         <div className="columns">
            <div className="column">
               <CategoryItem/>
            </div>
            <div className="column">
               <CategoryItem/>
            </div>
            <div className="column">
               <CategoryItem/>
            </div>
         </div>
         <div className="columns">
            <div className="column">
               <CategoryItem/>
            </div>
            <div className="column">
               <CategoryItem/>
            </div>
            <div className="column">
               <CategoryItem/>
            </div>
         </div>
      </div>
   </Fragment>
};


export default Categories;
