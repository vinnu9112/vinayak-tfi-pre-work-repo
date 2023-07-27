import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import Layout from '../../components/Layout'
import axios from "axios"
import toast from 'react-hot-toast';
import { useAuth } from '../../context/auth';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth()
    const location = useLocation();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/login`, { email, password})
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                })
                localStorage.setItem('auth', JSON.stringify(res.data))
                navigate(location.state || auth?.user?.role !== 1 ? `/dashboard/info` : `/dashboard/admin`)
            }
            else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Some Error Occurred')
        }
    }

    return (
        <Layout >
            <div className='login my-1'>
                <div className="form-container">
                    <form className='my-2' onSubmit={handleSubmit}>
                        <h4 className='title mb-3 text-center'>Login Here</h4>
                        <div className="mb-3" style={{paddingRight:"7%"}}>
                            <input type="email" className="form-control" id="exampleInputEmail" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3" style={{paddingRight:"7%"}}>
                            <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary">SignIn</button>

                        <button type="button" className="btn btn-primary mx-3" onClick={()=>navigate('/forgot-password')}>Forgot Password?</button>

                       <div>
                        <button type="button" className="btn btn-outline-primary my-2" onClick={()=>navigate('/register')}>Not Registered? Register Here</button>
                       </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default Login
