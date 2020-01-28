const express = require('express');
const connectDb = require('./config/db');
require('dotenv/config');
const app = express();

connectDb();
app.use(express.json());


// TODO Decide on making resource names plural or singlular (Ex. /api/post vs. /api/posts)
app.use('/api/register', require('./routes/api/registerRouter'));
app.use('/api/login', require('./routes/api/loginRouter'));
app.use('/api/profile', require('./routes/api/profileRouter'));
app.use('/api/account', require('./routes/api/accountRouter'));
app.use('/api/posts', require('./routes/api/postRouter'));
app.use('/api/users', require('./routes/api/userRouter'));


app.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`);
});
