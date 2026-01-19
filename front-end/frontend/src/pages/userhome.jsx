import { useEffect, useState } from "react"
import "./userhome.css"

function UserHome(){
    const [firstName, setFirstName] = useState("NoName")
    const [points, setPoints] = useState("0")

    useEffect(()=>{
        const fill_data = async ()=>{
            let user_data = await fetch("http://localhost:3000/user",{
                method:"GET",
                credentials:"include"
            }).then(response =>{
                if(!response.ok){throw new Error("Error" + response.statusText)}
                return response.json()
            }).then(data =>{
                setFirstName(data.first_name)
            })

        }

        fill_data()
    },[])

    return(
        <>
            <h1>Hello {firstName}</h1>
            <p>You currently have {points} points</p>
        </>
    )
}

export default UserHome