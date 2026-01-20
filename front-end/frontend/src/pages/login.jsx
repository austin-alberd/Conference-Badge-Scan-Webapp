import { useState } from "react"
import { useNavigate } from "react-router-dom" 
import {useEffect} from "react"

import './login.css'
function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const Navigate = useNavigate()

  useEffect(()=>{
    const AuthPreCheck = async ()=>{
        try{
            const authPreCheck = await fetch("http://localhost:3000/authenticate/validate-cookie",{
                method:"POST",
                credentials:"include"
            })
            if(authPreCheck.ok){
                Navigate("/user-home")
            }
        }catch(e){
            console.log("An error has occoured in Auth pre check")
        }
    }
    AuthPreCheck()
  },[])
  const handleSubmit = async (e) =>{
    e.preventDefault()
    try{
        const res = await fetch("http://localhost:3000/authenticate",{
            method: "POST",
            credentials:"include",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify({ username, password })
        })

        if(res.ok){
            Navigate("/user-home")
        }else{
            setError("Oh No! An error occoured please check your credentials.")
            console.log("error")
        }
    }catch(e){
        console.log(e)
    }
  }

  return(
    <>  <div id="flexArea">
            <form onSubmit={handleSubmit}>
                <div className="inputItem">
                    <input type="text" name="username" id="username" value={username} onChange={(e)=> setUsername(e.target.value)} /><br></br>
                    <label htmlFor="username">Username</label>
                </div>
                <div className="inputItem">
                    <input type="password" name="password" id="username" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                    <br></br><label htmlFor="password">Password</label>
                </div>
                <button type="submit" id="login_button">Login</button>
                {error && <div style={{ color: "red", marginTop: "10px" }}>{error}</div>}
            </form>
        </div>
    
    </>
  )
}

export default Login