const express = require('express');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv/config');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
   res.send('API listening');
});

app.listen(process.env.PORT, () => {
   console.log(`Listening on port ${process.env.PORT}`);
});
