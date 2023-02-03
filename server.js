const express = require('express')
const connectDB = require('./connectDB')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const Category = require('./model/categpryModel')
const Blog = require('./model/blogModel')
const path = require('path')
const flash = require('connect-flash')
const session = require('express-session')

// Creating App
app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));


// use Static Files
app.use(express.static('./public'));

// Set a view JS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// for uloading the File 
app.use(fileUpload({
    useTempFiles : true
}))


// Recuiring Routes
const users = require('./routes/userRoutes')
const blogs = require('./routes/blogRoutes')
const category = require('./routes/categoryRoutes')


// Default Routes
app.use('/user', users)
app.use('/blogs', blogs)
app.use('/category',category)




// rendering Pages

// Add New Page Routes
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

// Add New Category
app.get('/addNewCategory', (req,res)=>{
    res.render('addNewCategory')
})

// sign in Page
app.get('/', (req,res)=>{
    res.render('sign-in', {req})
})

// update Blog page
app.get('/updateBlogPage', (req,res)=>{
    // console.log(req.query);
    res.render('updateBlogPage')
})

// update Image Page
app.get('/updateImage', (req,res)=>{
    console.log(req.query);
    res.render('updateImage', { id : req.query.id})
})



// Listing App 
port = process.env.PORT || 3000;
app.listen(port, connectDB(port));
   