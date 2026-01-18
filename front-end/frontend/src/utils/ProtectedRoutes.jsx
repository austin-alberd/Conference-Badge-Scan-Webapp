import { Outlet, Navigate } from "react-router-dom"

const ProtectedRoutes = () =>{
    if (cookies.access_token){
        console.log(cookies)
        return <Outlet/>
    }else{
        return <Navigate to="/"/>
    }
}

export default ProtectedRoutes