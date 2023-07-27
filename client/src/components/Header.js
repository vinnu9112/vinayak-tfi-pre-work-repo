import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/auth';
import { toast } from 'react-hot-toast';

const Header = () => {
    const [auth, setAuth] = useAuth();
    const handleLogOut = () => {
        setAuth({
            ...auth, user: null, token: ''
        })
        localStorage.removeItem('auth')
        toast.success("Logged Out Successfully")
    }
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">TeachForIndia</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/">Home</NavLink>
                            </li>
                            {!auth.user ? <li className="nav-item">
                                <NavLink className="nav-link" to="/login">Login</NavLink>
                            </li> : (
                                <>
                                     <li className="nav-item">
                                        <NavLink className="nav-link" to={`/dashboard/info`} >Info</NavLink>
                                    </li>: <></>
                                    
                                    {auth.user.role === 1 ? <li className="nav-item">
                                        <NavLink className="nav-link" to={`/dashboard/admin`}>VolunteerList</NavLink>
                                    </li>:<></>}
                                    <li className="nav-item" style={auth.user.role===0 ? {marginLeft: "590%"}: {marginLeft:"320%"}}>
                                        <NavLink className="nav-link" to="/login" onClick={handleLogOut}>Logout</NavLink>
                                    </li>
                                </>

                            )}
                            
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header
