// Library Imports
const express = require("express")
const {v4:uuidv4} = require("uuid")
const cors = require("cors")
const bcrypt = require("bcrypt")
const {Pool} = require('pg')
const cookieParser = require("cookie-parser")
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
                return next()
            }
        })
        
    }
}

module.exports = {
    authorization
}