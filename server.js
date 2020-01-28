const express = require('express');
const connectDb = require('./config/db');
require('dotenv/config');
const app = express();

connectDb();
app.use(express.json());

app.use('/api/register', require('./routes/api/registerRouter'));
app.use('/api/login', require('./routes/api/loginRouter'));
app.use('/api/profile', require('./routes/api/profileRouter'));
app.use('/api/account', require('./routes/api/accountRouter'));
app.use('/api/posts', require('./routes/api/postRouter'));


app.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`);
});
