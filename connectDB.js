const mongoose = require('mongoose')

module.exports = (port)=>{
    mongoose.connect(`mongodb+srv://dhrumilZignuts:${process.env.MONGODB_PASS}@zignuts-technology.zveo5bz.mongodb.net/Blogs`,()=>{
        console.log(`DataBase Is SuccessFully Connected`);
        console.log(`Server is running on Port no: : ${port} `);
    })
}