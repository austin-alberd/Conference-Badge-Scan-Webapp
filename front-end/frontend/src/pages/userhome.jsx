import { useEffect, useState } from "react"
import "./userhome.css"

function UserHome(){
    const [firstName, setFirstName] = useState("NoName")
    const [points, setPoints] = useState("0")
    const [leaderboard, setLeaderBoard] = useState()

    useEffect(()=>{
        const fill_data = async ()=>{
            const user_data = await fetch("http://localhost:3000/user",{
                method:"GET",
                credentials:"include"
            }).then(response =>{
                if(!response.ok){throw new Error("Error" + response.statusText)}
                return response.json()
            }).then(data =>{
                setFirstName(data.first_name)
            })
            
            const points = await fetch("http://localhost:3000/points",{
                method:"GET",
                credentials:"include"
            }).then(response =>{
                if(!response.ok){throw new Error("Error" + response.statusText)}
                return response.json()
            }).then(data =>{
                setPoints(data.pointTotal)
            })

            const leaderboard = await fetch("http://localhost:3000/leaderboard",{
                method:"GET",
                credentials:"include"
            }).then(response =>{
                if(!response.ok){throw new Error("Error" + response.statusText)}
                return response.json()
            }).then(data =>{
                setLeaderBoard(data)
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