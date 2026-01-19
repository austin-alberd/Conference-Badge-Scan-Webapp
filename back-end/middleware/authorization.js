
const jwt = require("jsonwebtoken")
require("dotenv").config()

var JWT_SECRET = process.env.JWT_SECRET

function authorization(req,res,next){
    const token = req.cookies.access_token
    if(!token){
        return res.sendStatus(403)
    }else{
        jwt.verify(token,JWT_SECRET,(err, user)=>{
            if(err){
                return res.sendStatus(403)
            }else{
                req.jwtUserID = user.user_id
                return next()
            }
        })
        
    }
}

module.exports = {
    authorization
}