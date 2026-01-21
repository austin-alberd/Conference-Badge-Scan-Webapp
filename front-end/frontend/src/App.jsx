import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/login.jsx"
import UserHome from "./pages/userhome.jsx"
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx"
import LogOut from "./pages/logout.jsx"
function App() {
  return(
    <Router>
      <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/logout" element={<LogOut/>}/>
        <Route element={<ProtectedRoutes/>}>
          <Route path="/user-home" element={<UserHome />}/>
        </Route>
        
      </Routes>
    </Router>
  )
}

export default App
