const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
   // Get token from header
   const authorization = req.get('authorization');
   let token = null;
   if (authorization && authorization.toLowerCase().startsWith('bearer '))
      token = authorization.substring(7);

   // Check if no token
   if (token === null)
      return res.status(401).json({msg: 'No token. Authorization denied'});

   // Verify token
   try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded.user.id;
      console.log(decoded);
      next();
   } catch (err) {
      return res.status(401).json({msg: 'Token is invalid'});
   }
};
