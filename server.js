const express = require('express')
const connectDB = require('./connectDB')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')

app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

app.use(fileUpload({
    useTempFiles : true
}))

const users = require('./routes/userRoutes')
const blogs = require('./routes/blogRoutes')

app.use('/user', users)
app.use('/blogs', blogs)


port = process.env.PORT || 3000;
app.listen(port, connectDB(port));
   