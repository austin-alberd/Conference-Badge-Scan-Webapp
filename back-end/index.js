// Library Imports
const express = require("express")
const {v4:uuidv4} = require("uuid")
const cors = require("cors")
const bcrypt = require("bcrypt")
const {Pool} = require('pg')
const cookieParser = require("cookie-parser")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const authorization = require("./middleware/authorization")

//JWT Setup
var JWT_SECRET = process.env.JWT_SECRET
// App setup
const HTTP_PORT = 3000
app = express()

app.use(express.json())
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))
app.use(cookieParser())


//PG Pool
const pool = new Pool({
  user: "postgres",
  host: "127.0.0.1",
  password:"password",
  database: "postgres",
  port: 5432
});

// test connection to the database
(async () =>{
    try {
        const {rows} = await pool.query('SELECT current_user')
        const currentUser = rows[0]['current_user']
        console.log(`✅ [SUCCESS]: Started Postgres Server and Using User:  ${currentUser}`)

    } catch (err) {
        console.log(err.stack)
        console.log(err)
        console.error("💀 [FATAL ERROR]: Could Not Connect to Database")
    }
})()

//Start the server
app.listen(HTTP_PORT,(err)=>{
    if(err){
        console.log(err.stack)
        console.log(err)
        console.error("💀 [FATAL ERROR]: Could Not Start Web Server")
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
//DONE Create Route 
app.post("/user",async (req,res)=>{
    // INSERT INTO tblUsers VALUES()
    try{
        console.log(req.body)
        let username = req.body.username
        let password = req.body.password
        password = bcrypt.hashSync(password,10)
        let troop = req.body.troop
        let email = req.body.email
        let firstName = req.body.firstName
        let userPointValue = req.body.userPointValue
        let userID = uuidv4()
        const _ = await pool.query("INSERT INTO tblUsers VALUES($1,$2,$3,$4,$5,$6)",[userID,firstName,username,password,troop,email])
        const __ = await pool.query("INSERT INTO tblUserPointValues VALUES($1,$2,$3)",[uuidv4(),userID,userPointValue])
        const ___ = await pool.query("INSERT INTO tblUserPointTotals VALUES($1,$2,$3)",[uuidv4(),userID,0])
        res.status(201).json({"status":"success","message":"Successfully Added User"})
    }catch(e){
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
        console.log(e)
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
//DONE Create Route 
app.get("/user",authorization.authorization,async (req,res)=>{
    // SELECT * FROM tblUsers WHERE UserID = 
    try{
        let userID = req.jwtUserID
        console.log(userID)
        const {rows} = await pool.query('SELECT first_name, troop, username from tblUsers WHERE user_id = $1',[userID])
        if(rows.length > 0 ){
            res.status(200).json(rows[0])
            console.log("Hit")
        }else{
            res.status(404).json({"status":"failed","message":"Could not find user"})
        }
    }catch(e){
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
    }
})

/**
 * POST /authenticate
 * Logs the user in and issues a JWT
 */
//DONE Create Route 
app.post("/authenticate",async (req,res) =>{
    try{
        let username = req.body.username
        let password = req.body.password
        const {rows} = await pool.query('SELECT * from tblUsers WHERE username = $1',[username])
        const passwordHash = rows[0]['password_hash']
        if(bcrypt.compareSync(password,passwordHash,10)){
            // issue the JWT
            const token = jwt.sign({"user_id":rows[0]['user_id'],"first_name":rows[0]['first_name'],"troop":rows[0]['troop'],"email":rows[0]['email']},JWT_SECRET)
            return res.cookie("access_token",token,{httpOnly:true,secure:true,sameSite:"none"}).status(200).json({"status":"success","message":"Logged in successfully"})
        }else{
            res.status(401).json({"status":"unauthorized","message":"Your credentails are incorrect. Please make sure they are correctly typed in."})
        }
    }catch(e){
        console.log(e)
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
    }
})

/**
 * GET /user/public
 * Gets the publicly available details of a user from the database (name, email, troop)
 * Auth JWT
 */
//TODO Reconsider this route
app.get("/user/public",authorization.authorization, async (req,res)=>{
    //
    try{
        let userID = req.query.username
        const {rows} = await pool.query("SELECT first_name, email, troop FROM tblUsers WHERE username = $1",[userID])
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
//DONE Create Route 
app.post("/points",authorization.authorization,async (req,res)=>{
    //Create a new updated points total
    //SELECT Points FROM tblUserPointValues

    //Get the user point totals 
    //SELECT Points FROM tblUserPoints

    //Fix it all
    // UPDATE tblUserPoints SET PointTotal = newPoints WHERE UserID = UserID
    try{
        let scannedUserUserID = req.body.scannedUserUserID // Who got scanned gets passed in from the front end
        let scanningUserUserID = req.jwtUserID // Who is scanning comes from JWT

        //Get the Scanned User Point Values
        let {rows} = await pool.query('SELECT point_value AS pv FROM tblUserPointValues WHERE user_id = $1 ',[scannedUserUserID])
        let scannedUserPointValues = parseInt(rows[0].pv)

        //Update the scanning user's point total
        let response = await pool.query("UPDATE tblUserPointTotals SET point_total = point_total + $1 WHERE user_id = $2 ",[scannedUserPointValues,scanningUserUserID])
        if(response.rowCount > 0){
            response = await pool.query("INSERT INTO tblPointRewardRecord VALUES($1,$2,$3,$4)", [scannedUserUserID+scanningUserUserID,scannedUserUserID,scanningUserUserID,scannedUserPointValues])
            if(response.rowCount >0){
                res.status(200).json({"status":"success","message":"Successfully added points to your total"})
            }else{
                res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
            }
        }else{
            res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
        }
    }catch(e){
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
    }

})

/**
 * GET /points
 * Gets the total points for a user
 */
//TODO Create Route 
app.get("/points",authorization.authorization,async (req,res)=>{
    // SELECT Points from tblUserPoints WHERE UserID = UserID
    try{
        let {rows} = await pool.query('SELECT point_total AS pt FROM tblUserPointTotals WHERE user_id = $1 ',[req.jwtUserID])
        res.status(200).json({"status":"success","pointTotal":rows[0].pt})
    }catch(e){
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
    }
})

/**
 * GET /leaderboard
 * Gets the leaderboard
 * Auth JWT
 */
//DONE
app.get("/leaderboard", authorization.authorization,async (req,res)=>{
    try{
        const {rows} = await pool.query('SELECT tblUserPointTotals.point_total, tblUsers.username FROM tblUSerPointTotals JOIN tblUsers on tblUserPointTotals.user_id = tblUsers.user_id ORDER BY tblUserPointTotals.point_total DESC LIMIT 3')
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
app.get("/leaderboard/topx", authorization.authorization,async (req,res)=>{
    // SELECT tblUserPointTotals.pointtotal, tblUsers.username FROM tblUSerPointTotals JOIN tblUsers on tblUserPointTotals.userid = tblUsers.userID ORDER BY tblUserPointTotals.pointtotal DESC LIMIT 5 
    try{
        let topQueryParam = req.query.topx
        if(topQueryParam <= 0){
            res.status(400).json({"status":"error","message":"Please provide a valid input"})
        }
        const {rows} = await pool.query('SELECT tblUserPointTotals.point_total, tblUsers.username FROM tblUserPointTotals JOIN tblUsers on tblUserPointTotals.user_id = tblUsers.user_id ORDER BY tblUserPointTotals.point_total DESC LIMIT $1',[topQueryParam])
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


app.post("/authenticate/validate-cookie", (req,res)=>{
    try{
        const token = req.cookies.access_token
        if(!token){
            res.sendStatus(403)
        }else{
            jwt.verify(token,JWT_SECRET,(err, user)=>{
                if(err){
                    res.sendStatus(403)
                }else{
                    res.sendStatus(200)
                }
            })
        }
    }catch(e){
        res.status(500).json({"status":"error","message":"Oh No! An Error Has Occurred Please Contact an App Administrator"})
    }
})