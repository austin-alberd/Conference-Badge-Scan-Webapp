
const jwt = require("jsonwebtoken")

var JWT_SECRET = "HelloWorld"

function authorization(req,res,next){
    const token = req.cookies.access_token
    if(!token){
        res.sendStatus(403)
    }else{
        console.log("Hit")
        jwt.verify(token,JWT_SECRET,(err, user)=>{
            if(err){
                res.sendStatus(403)
            }else{
                console.log(user)
                req.body.JWTUserID = user.user_id
                return next()
            }
        })
        
    }
}

module.exports = {
    authorization
}