import { useEffect, useState } from "react"
import "./userhome.css"

function UserHome(){
    const [firstName, setFirstName] = useState("NoName")
    const [points, setPoints] = useState("0")
    const [leaderboard, setLeaderBoard] = useState([])

    useEffect(()=>{
            const get_data = async ()=>{
                const res = await fetch("http://localhost:3000/user-home-data",{
                    method:"GET",
                    credentials:"include"
                }).then(response =>{
                    if(!response.ok){
                        throw new Error('Network response was not ok: ' + response.statusText)
                    }

                    return response.json()
                }).then(data =>{
                    console.log(data)
                    setFirstName(data.firstName)
                    setPoints(data.pointTotal)
                    setLeaderBoard(data.leaderboard)
                })
            }
            get_data()
    },[])

    return(
        <>
            <h1>Hello {firstName}</h1>
            <p>You currently have {points} points</p>
            <h2>Leaderboard</h2>
            <ul>
                {leaderboard.map(item=>(
                    <li key={item.username}>
                        {item.username} - {item.point_total}
                    </li>
                ))}
            </ul>
        </>
    )
}

export default UserHome