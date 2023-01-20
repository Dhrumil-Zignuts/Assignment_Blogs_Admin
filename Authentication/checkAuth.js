const jwt = require('jsonwebtoken')

const checkAuth = (req,res,next)=>{
    const token = req.cookie.access_token

    if(!token){
        res.status(401).json({
            message:"token is Expired, Go and Login again"
        })
    }
    try{
        const data = jwt.verify(token, process.env.JWT_KEY)
        return next();
    }catch (err){
        res.status(500).json({
            error: err
        })        
    }
}