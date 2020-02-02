import React from 'react';
import PropTypes from 'prop-types';
import getDatePosted from "../../utils/getDatePosted";

const CommentItem = ({comment}) => {

   const datePosted = getDatePosted(comment.date);
   return (
      <div style={{marginBottom: '20px'}}>
         <article className="media">
            <div className="media-content">
               <div className="content">
                  <p>
                     <strong>{comment.name}</strong> <small>{datePosted}</small>
                     <br/>
                     {comment.body}
                  </p>
               </div>
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
