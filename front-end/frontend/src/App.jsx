import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Login from "./pages/login.jsx"
import UserHome from "./pages/userhome.jsx"
import ProtectedRoutes from "./utils/ProtectedRoutes.jsx"
import { AuthProvider } from "./utils/AuthContext.jsx"

function App() {
  return(
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />}/>
          
          <Route element={<ProtectedRoutes/>}>
            <Route path="/user-home" element={<UserHome />}/>
          </Route>
          
        </Routes>
      </Router>
    </AuthProvider>
    
  )
}

export default App
