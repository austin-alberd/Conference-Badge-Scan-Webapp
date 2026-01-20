import { Outlet, Navigate } from "react-router-dom"
import { useEffect, useState } from 'react'


const ProtectedRoutes = () =>{
    const [isAuth,setIsAuth] = useState(null)

    // Check and make sure the user's cookie is valid and they are able to log in
    useEffect(()=>{
        const check_session = async () =>{
            try{
                const auth_status = await fetch("http://localhost:3000/authenticate/validate-cookie",{
                    method: "POST",
                    credentials:"include"
                })

                setIsAuth(auth_status.status === 200)
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