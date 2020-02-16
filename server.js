const express = require('express');
const connectDb = require('./config/db');
require('dotenv/config');
const app = express();
const path = require('path');

connectDb();
app.use(express.json());

// TODO Decide on making resource names plural or singlular (Ex. /api/post vs. /api/posts)
app.use('/api/register', require('./routes/api/registerRouter'));
app.use('/api/login', require('./routes/api/loginRouter'));
app.use('/api/profile', require('./routes/api/profileRouter'));
app.use('/api/account', require('./routes/api/accountRouter'));
app.use('/api/posts', require('./routes/api/postRouter'));
app.use('/api/users', require('./routes/api/userRouter'));
app.use('/api/auth', require('./routes/api/authRouter'));
app.use('/api/tag', require('./routes/api/tagRouter'));
app.use('/api/contact', require('./routes/api/contactRouter'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
   // Set static folder
   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

app.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`);
});
