const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
   // Get token from header
   const authorization = req.get('Authorization');
   let token = null;
   if (authorization && authorization.startsWith('Bearer '))
      token = authorization.substring(7);

   // Check if no token
   if (!token) {
      return res.status(401).json({msg: 'No token. Authorization denied'});
   }
   // Verify token
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded.user.id;
      next();
   } catch (err) {
      return res.status(401).json({msg: 'Token is invalid'});
   }
};
