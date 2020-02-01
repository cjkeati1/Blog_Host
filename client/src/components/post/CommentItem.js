import React from 'react';
import PropTypes from 'prop-types';
import getDatePosted from "../../utils/getDatePosted";

const CommentItem = ({comment}) => {

   const datePosted = getDatePosted(comment.date);
   return (
      <div>
         <article className="media">

            <div className="media-content">
               <div className="content">
                  <p>
                     <strong>{comment.name}</strong> <small>{datePosted}</small>
                     <br/>
                     {comment.body}
                  </p>
               </div>
               {/*<nav className="level is-mobile">*/}
               {/*   <div className="level-left">*/}
               {/*      <a className="level-item">*/}
               {/*         <span className="icon is-small"><i className="fas fa-reply"/></span>*/}
               {/*      </a>*/}

               {/*      <a className="level-item">*/}
               {/*         <span className="icon is-small"><i className="fas fa-thumbs-up"/></span>*/}
               {/*      </a>*/}

               {/*      <a className="level-item">*/}
               {/*         <span className="icon is-small"><i className="fas fa-thumbs-down"/></span>*/}
               {/*      </a>*/}
               {/*   </div>*/}
               {/*</nav>*/}
            </div>
            <div className="media-right">
               <button className="delete"/>
            </div>
         </article>
      </div>
   );
};

CommentItem.propTypes = {
   comment: PropTypes.object.isRequired
};

export default CommentItem;
