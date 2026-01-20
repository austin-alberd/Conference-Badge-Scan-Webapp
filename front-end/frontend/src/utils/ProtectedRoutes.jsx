import { Outlet, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react'
import { useAuth } from "./AuthContext"

const ProtectedRoutes = () =>{
    const [isAuth,setIsAuth] = useState(null)
    const { setUserId } = useAuth()
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