import React from 'react';
import {Link} from "react-router-dom";

const ContactConfirmation = () => {
   return (
      <div>
         <h1 className={'title is-4'}>Thanks for the message. We'll review it soon.</h1>
         <Link to={'/posts'}>Back to Posts</Link>
      </div>
   );
};

export default ContactConfirmation;
