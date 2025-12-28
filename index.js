// Library Imports
const express = require("express")
const {uuid:v4} = require("uuid")
const cors = require("cors")
const bcrypt = require("bcrypt")
const {Pool, Client} = require('pg')


// App setup
const HTTP_PORT = 3000
app = express()

app.use(express.json())
app.use(cors())



const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password:"password",
  database: "postgres",
  port: 5433
});

(async () =>{
    try {
        const {rows} = await pool.query('SELECT current_user')
        const currentUser = rows[0]['current_user']
        console.log(`✅ [SUCCESS]: Started Postgres Server and Using User:  ${currentUser}`)

    } catch (err) {
        console.log("💀 [FATAL ERROR]: Could Not Connect to Database")
        console.log(err.stack);
    }
})()


app.listen(HTTP_PORT,(err)=>{
    if(err){
        console.log("💀 [FATAL ERROR]: Could Not Start Web Server")
        console.log(err)
    }else{
        console.log(`✅ [SUCCESS]: Started Web Server On Port ${HTTP_PORT}`)
    }
})