// Library Imports
const express = require("express")
const {uuid:v4} = require("uuid")
const cors = require("cors")
const bcrypt = require("bcrypt")

// App setup
const HTTP_PORT = 3000
app = express()

app.use(express.json())
app.use(cors())

app.listen(HTTP_PORT,(err)=>{
    if(err){
        console.log("💀 [FATAL ERROR]: Could Not Start Web Server")
        console.log(err)
    }else{
        console.log(`✅ [SUCCESS]: Started Web Server On Port ${HTTP_PORT}`)
    }
})