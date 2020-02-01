import React from 'react';
import Moment from "react-moment";

export default date => {
   const postedDate = new Date(date);
   const now = new Date();

   // If posted today
   if (postedDate.getDate() === now.getDate() &&
      postedDate.getMonth() === now.getMonth() &&
      postedDate.getFullYear() === now.getFullYear()) {
      return <Moment fromNow>{date}</Moment>;
   }
   // If not posted today
   else {
      return <Moment
         format={`MMM ${(postedDate.getFullYear() === now.getFullYear()) ? 'D' : 'D, YYYY'}`}>{now}</Moment>;
   }
};
