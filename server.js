const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const connectDb = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const app = express();

connectDb();
app.use(express.json());

app.use('/api/register', require('./routes/api/registerRouter'));

app.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`);
});
