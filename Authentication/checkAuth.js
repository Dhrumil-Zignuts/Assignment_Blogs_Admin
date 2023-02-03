const jwt = require('jsonwebtoken')


// Check the User 
const checkAuth = async (req,res,next)=>{
    
    const token = req.cookies.access_token;
    // console.log(token);

    if(!token){
        res.redirect('/')
    }else{
        try{
            const data = await jwt.verify(token, process.env.JWT_KEY)
            return next();
        }catch (err){
            res.redirect('/')       
        }
    }
}

module.exports = checkAuth