// Library Imports
const express = require("express")
const {uuid:v4} = require("uuid")
const cors = require("cors")
const bcrypt = require("bcrypt")
const {Pool} = require('pg')


// App setup
const HTTP_PORT = 3000
app = express()

app.use(express.json())
app.use(cors())


//PG Pool
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  password:"password",
  database: "postgres",
  port: 5433
});

// test connection to the database
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

//Start the server
app.listen(HTTP_PORT,(err)=>{
    if(err){
        console.log("💀 [FATAL ERROR]: Could Not Start Web Server")
        console.log(err)
    }else{
        console.log(`✅ [SUCCESS]: Started Web Server On Port ${HTTP_PORT}`)
    }
})

/**
 * GET /home
 * Gets the home page of the app
 */
app.get("/home",(req,res)=>{
    
})

/**
 * GET /user-home
 * Gets the user's individual home page
 * Auth JWT
 */
app.get("/user-home",(req,res)=>{

})

/**
 * POST /user
 * Creates a user in the database
 */

app.post("/user",(req,res)=>{

})

/**
 * PUT /user
 * Updates a user in the database
 * Auth JWT
 */
app.put("/user",(req,res)=>{

})

/**
 * GET /user
 * Gets the details for the user tied to the JWT token
 * AUTH JWT
 */
app.get("/user",(req,res)=>{

})

/**
 * POST /authenticate
 * Logs the user in and issues a JWT
 */
app.post("/authenticate",(req,res) =>{

})

/**
 * GET /user/public
 * Gets the publicly available details of a user from the database (name, email, troop)
 * Auth JWT
 */
app.get("/user/public", (req,res)=>{

})

/**
 * POST /points
 * Adds points to the user who is scanning
 * Auth JWT
 */

app.post("/points",(req,res)=>{

})

/**
 * GET /points
 * Gets the total points for a user
 */
app.get("/points",(req,res)=>{

})

/**
 * GET /leaderboard
 * Gets the leaderboard
 * Auth JWT
 */
app.get("/leaderboard", (req,res)=>{

})

/**
 * GET /leaderboard/topx
 * Gets the top x users on the leaderboard
 * Auth JWT
 */
app.get("/leaderboard/topx", (req,res)=>{

})

/**
 * GET /leaderboard/position
 * Gets the position of a user on the leaderboard
 * Auth JWT
 */
app.get("/leaderboard/position", (req,res)=>{

})