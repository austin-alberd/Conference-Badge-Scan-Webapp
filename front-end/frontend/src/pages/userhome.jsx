import { useEffect, useState } from "react"
import "./userhome.css"
import QrCode from "react-qr-code"
import Footer from "../components/footer"

function UserHome(){
    const [firstName, setFirstName] = useState("NoName")
    const [points, setPoints] = useState("0")
    const [leaderboard, setLeaderBoard] = useState([])

    // Gets the data to build the home page for the user
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
                    setFirstName(data.firstName)
                    setPoints(data.pointTotal)
                    setLeaderBoard(data.leaderboard)
                })
            }
            get_data()
    },[])

    return(
        <>
        <div className="app">
            <div id="user-home-content" className="content">
                <h1>Hello {firstName}</h1>
                <p>You currently have {points} points</p>
                <h2>Leaderboard</h2>

                <table id="leaderboardTable">
                    <tr>
                        <th className="tableHeader">Username</th>
                        <th className="tableHeader">Points</th>
                    </tr>
                    {leaderboard.map(item=>(
                        <tr key={item.username}>
                            <td>{item.username}</td>
                            <td>{item.point_total}</td>
                        </tr>
                    ))}
                </table>
                
                <h2>Your QR Code</h2>
                <QrCode id="qr-code" value="hey"/>
            </div>

            <Footer/>
        </div>
        </>
    )
}

export default UserHome