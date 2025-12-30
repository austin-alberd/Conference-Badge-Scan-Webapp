// Library Imports
const express = require("express")
const {v4:uuidv4} = require("uuid")
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
//TODO Create Route 
app.get("/home",async (req,res)=>{

})

/**
 * GET /user-home
 * Gets the user's individual home page
 * Auth JWT
 */
//TODO Create Route 
app.get("/user-home",async (req,res)=>{
    //Maybe database stuff
})

/**
 * POST /user
 * Creates a user in the database
 */
//TODO Create Route 
app.post("/user",async (req,res)=>{
    // INSERT INTO tblUsers VALUES()
    try{
        let username = req.body.username
        let password = req.body.password
        password = bcrypt.hashSync(password,10)
        let troop = req.body.troop
        let email = req.body.email
        let firstName = req.body.firstName
        let userID = uuidv4()
        const _ = await pool.query("INSERT INTO tblUsers VALUES($1,$2,$3,$4,$5,$6)",[userID,username,password,troop,email,firstName])
        res.status(201).json({"status":"success","message":"Successfully Added User"})
    }catch(e){
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
    }
})

/**
 * PUT /user
 * Updates a user in the database
 * Auth JWT
 */
//TODO Create Route 
app.put("/user",async (req,res)=>{

})

/**
 * GET /user
 * Gets the details for the user tied to the JWT token
 * AUTH JWT
 */
//TODO Create Route 
app.get("/user",async (req,res)=>{
    // SELECT * FROM tblUsers WHERE UserID = 
})

/**
 * POST /authenticate
 * Logs the user in and issues a JWT
 */
//TODO Create Route 
app.post("/authenticate",async (req,res) =>{
    try{
        let username = req.body.userName
        let password = req.body.password
    }catch(e){
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
    }
})

/**
 * GET /user/public
 * Gets the publicly available details of a user from the database (name, email, troop)
 * Auth JWT
 */
//DONE
app.get("/user/public", async (req,res)=>{
    //
    try{
        let userID = req.query.userid
        const {rows} = await pool.query("SELECT firstname, email, troop FROM tblUsers WHERE UserID = $1",[userID])
        if(rows.length == 0){
            res.status(404).json({"status":"error","message":"Could not find the user"})
        }else{
            res.status(200).json(rows[0])
        }
    }catch(e){
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
    }
})

/**
 * POST /points
 * Adds points to the user who is scanning
 * Auth JWT
 */
//TODO Create Route 
app.post("/points",async (req,res)=>{
    //Create a new updated points total
    //SELECT Points FROM tblUserPointValues

    //Get the user point totals 
    //SELECT Points FROM tblUserPoints

    //Fix it all
    // UPDATE tblUserPoints SET PointTotal = newPoints WHERE UserID = UserID
})

/**
 * GET /points
 * Gets the total points for a user
 */
//TODO Create Route 
app.get("/points",async (req,res)=>{
    // SELECT Points from tblUserPoints WHERE UserID = UserID

})

/**
 * GET /leaderboard
 * Gets the leaderboard
 * Auth JWT
 */
//DONE
app.get("/leaderboard", async (req,res)=>{
    try{
        const {rows} = await pool.query('SELECT tblUserPointTotals.pointtotal, tblUsers.username FROM tblUSerPointTotals JOIN tblUsers on tblUserPointTotals.userid = tblUsers.userID ORDER BY tblUserPointTotals.pointtotal DESC LIMIT 3')
        res.status(200).json({"leaderboard":rows})
    }catch (err){
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
    }
    
})

/**
 * GET /leaderboard/topx
 * Gets the top x users on the leaderboard
 * Auth JWT
 */
//DONE
app.get("/leaderboard/topx", async (req,res)=>{
    // SELECT tblUserPointTotals.pointtotal, tblUsers.username FROM tblUSerPointTotals JOIN tblUsers on tblUserPointTotals.userid = tblUsers.userID ORDER BY tblUserPointTotals.pointtotal DESC LIMIT 5 
    try{
        let topQueryParam = req.query.topx
        if(topQueryParam <= 0){
            res.status(400).json({"status":"error","message":"Please provide a valid input"})
        }
        const {rows} = await pool.query('SELECT tblUserPointTotals.pointtotal, tblUsers.username FROM tblUSerPointTotals JOIN tblUsers on tblUserPointTotals.userid = tblUsers.userID ORDER BY tblUserPointTotals.pointtotal DESC LIMIT $1',[topQueryParam])
        res.status(200).json({"leaderboard":rows})
    }catch(e){
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
    }
})

/**
 * GET /leaderboard/position
 * Gets the position of a user on the leaderboard
 * Auth JWT
 */
//TODO Create Route 
app.get("/leaderboard/position", async (req,res)=>{
    //SELECT Username FROM tblUsers ORDER BY PointTotal
    //Itterate through all of that and output the count in the provided array to output everything
})
