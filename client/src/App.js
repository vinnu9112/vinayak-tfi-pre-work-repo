import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import PageNotFound from "./pages/PageNotFound";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard";
import AdminRoute from './routes/AdminRoute'
import Users from './pages/Auth/Admin/Users'
import PrivateRoute from "./routes/PrivateRoute";
import Info from "./pages/Auth/User/Info";
import ForgotPassword from "./pages/Auth/ForgotPassword";
import UserDashboard from "./pages/UserDashboard";

function App() {
  return (
    <>
    <Routes>
     <Route path="/" element={<Homepage />}/>
     <Route path="/login" element={<Login />}/>
     <Route path="/register" element={<Register />}/>
     <Route path="/forgot-password" element={<ForgotPassword />}/>
     <Route path='/dashboard' element= {<AdminRoute/>}>
          <Route path='admin' element= {<Dashboard/>}/>  
          <Route path='users' element= {<Users/>}/>  
      </Route>
     <Route path='/dashboard/info' element= {<PrivateRoute/>}>
          <Route path='' element= {<UserDashboard/>}/>  
          <Route path='info' element= {<Info/>}/>  
      </Route>
     <Route path="/*" element={<PageNotFound />}/>
    </Routes>
    </>
  );
}

export default App;
