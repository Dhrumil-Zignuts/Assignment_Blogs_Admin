const express = require('express')
const connectDB = require('./connectDB')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const Category = require('./model/categpryModel')
const path = require('path')

app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());

// use Static Files
app.use(express.static('./public'));

// Set a view JS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));


app.use(fileUpload({
    useTempFiles : true
}))

const users = require('./routes/userRoutes')
const blogs = require('./routes/blogRoutes')
const category = require('./routes/categoryRoutes')

app.use('/user', users)
app.use('/blogs', blogs)
app.use('/category',category)



app.get('/addNewBlog', (req,res)=>{
    Category.find({}).then((data)=>{
        res.render('addNewBlog', {categorys : data})
    }).catch(err =>{
        res.status(500).json({
            message: "All Category is not Found",
            error : err
        })
    })
})

app.get('/addNewCategory', (req,res)=>{
    res.render('addNewCategory')
})

app.get('/', (req,res)=>{
    res.render('sign-in',)
})
app.get('/updateBlogPage', (req,res)=>{
    // console.log(req.query);
    res.render('updateBlogPage')
})

port = process.env.PORT || 3000;
app.listen(port, connectDB(port));
   