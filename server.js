const express = require('express')
const connectDB = require('./connectDB')
const router = require('./routes/userRoutes')

app = express();

app.use(express.json());
app.use(express.urlencoded());

const users = require('./routes/userRoutes')

app.use('/user', users)


port = process.env.PORT || 3000;
app.listen(connectDB(port));
   