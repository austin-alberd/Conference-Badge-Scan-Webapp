import { useNavigate } from "react-router-dom" 
import {useEffect} from "react"
import {useState} from "react"

function LogOut(){
    const [statusState, setStatusState] = useState("")
    useEffect(()=>{
        const logout = async ()=>{
            try{
                const res = fetch("http://localhost:3000/logout")

                if(res.ok){
                    setStatusState(res)
                    Navigate("/")
                }else{
                setStatusState(res)
                }
            }catch (e){
                setStatusState(e) 
            }
            
        }
        logout()
    },[])
    return(
        <p>{statusState}</p>
    )
}

export default LogOut