import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout'
import axios from "axios"
import toast from 'react-hot-toast';



const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [answer, setAnswer] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/forgot-password`, { email, answer, newPassword})
            if (res && res.data.success) {
                toast.success(res.data && res.data.message)
 
                navigate("/login")
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
        <Layout title={"ForgotPassword - Ecommerce App"}>
            <div className='reset'>
                <div className="form-container" style={{width:'25%'}}>
                    <form className='my-2' onSubmit={handleSubmit}>
                        <h4 className='title'>Reset Password</h4>
                        <div className="mb-3">
                            <input type="email" className="form-control" id="exampleInputEmail1" name='email' placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="mb-3">
                            <input type="answer" className="form-control" id="exampleInputAnswer" placeholder='What is your favorite sports' value={answer} onChange={(e) => setAnswer(e.target.value)} />
                        </div>
                        <div className="mb-3">

                            <input type="password" className="form-control" id="exampleInputPassword" placeholder='Enter your new password' value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                        </div>  
                        <button type="submit" className="btn btn-primary">Reset Password</button>
                       
                        
                    </form>
                </div>
            </div>
        </Layout>
    )
}

export default ForgotPassword
