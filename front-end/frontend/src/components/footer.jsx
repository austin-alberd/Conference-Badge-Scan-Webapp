import "./footer.css"
import { AiFillHome } from "react-icons/ai";
import { AiFillCamera } from "react-icons/ai";
import { AiFillBook } from "react-icons/ai";

function Footer(){
    return(
        <div id="footer-container">
            <div className="fl-container"><AiFillHome className="icon"/><a href="/user-home" className="footer-link">Home</a></div>
            <div className="fl-container"><AiFillCamera className="icon"/><a href="/scan" className="footer-link">Scan</a></div>
            <div className="fl-container"><AiFillBook className="icon"/><a href="/network" className="footer-link">Network</a></div>
        </div>
    )
}

export default Footer