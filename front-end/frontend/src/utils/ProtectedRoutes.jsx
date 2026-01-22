import { Outlet, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useAuth } from "./AuthContext"

const ProtectedRoutes = () =>{
    const [isAuth,setIsAuth] = useState(null)
<<<<<<< HEAD
    const { setUserId } = useAuth()
=======

    // Check and make sure the user's cookie is valid and they are able to log in
>>>>>>> 378a383de2f2d7d1ca5ccbcb3668394836d31ffb
    useEffect(()=>{
        const check_session = async () =>{
            try{
                const auth_status = await fetch("http://localhost:3000/authenticate/validate-cookie",{
                    method: "POST",
                    credentials:"include"
                }).then(response =>{
                    if(!response.ok){
                        setIsAuth(false)
                    }else{
                        setIsAuth(true)
                        return response.json()
                    }
                }).then(data=>{
                    
                    setIsAuth(true)
                    setUserId(data.user_id)
                })
            }catch(e){
                setIsAuth(false)
            }
        }
        check_session()
    },[])
    
    if(isAuth === null) return <p>Loading.....</p>
    return isAuth ? <Outlet/> : <Navigate to="/"/>
}

export default ProtectedRoutes 