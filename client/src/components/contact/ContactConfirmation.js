import React from 'react';
import {Link} from "react-router-dom";

const ContactConfirmation = () => {
   return (
      <div>
         <p>Thanks for the message. We'll review it soon.</p>
         <Link to={'/posts'}>Back to Posts</Link>
      </div>
   );
};

export default ContactConfirmation;
