const mongoose = require('mongoose')

// module.exports = (port)=>{
//     mongoose.connect(`mongodb://dhrumilam:${process.env.MONGODB_PASS}@15.206.7.200:28017/dhrumilam`,()=>{
//         console.log(`DataBase Is SuccessFully Connected`);
//         console.log(`Server is running on Port no: : ${port} `);
//     })
// }
// module.exports = (port)=>{
//     mongoose.connect(`mongodb+srv://dhrumilZignuts:2782001Ads@zignuts-technology.zveo5bz.mongodb.net/Blogs`,()=>{
//         console.log(`DataBase Is SuccessFully Connected`);
//         console.log(`Server is running on Port no: : ${port} `);
//     })
// }
module.exports = (port)=>{
    mongoose.connect(`mongodb://dhrumilam:QFGGgsH135RDTwpEMDtI@15.206.7.200:28017/dhrumilam?authSource=admin&readPreference=primary&directConnection=true&ssl=false`,()=>{
        console.log(`DataBase Is SuccessFully Connected`);
        console.log(`Server is running on Port no: : ${port} `);
    })
}





0
// module.exports = (port)=>{
//     mongoose.connect(`mongodb://dhrumilam:${process.env.MONGODB_PASS}@${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/dhrumilam?authSource=admin&readPreference=primary&directConnection=true&ssl=false`,()=>{
//         console.log(`DataBase Is SuccessFully Connected`);
//         console.log(`Server is running on Port no: : ${port} `);
//     })
// }