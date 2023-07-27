import React from 'react'
import { useAuth } from '../../../context/auth'
import Layout from '../../../components/Layout'
const Info = () => {
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="register text-center mt-1">
        <div className="container" >
          <h1>{auth.user.role !== 1 ? `Your Enrollment Details` : `Admin Details`}</h1>
          <h5>Name: {auth?.user?.name}</h5>
          <h5>Email: {auth?.user?.email}</h5>
          <h5>Phone: {auth?.user?.phone}</h5>
          <h5>Location: {auth?.user?.location}</h5>
          {auth.user.role === 0 ? <>
            <h5>Availability: {auth?.user?.availability}</h5> 
            <h5>Languages: {auth?.user?.languages}</h5> 
            <h4 className='mt-4'>Thanks for Registering!! We will inform you if you are allocated :)</h4>
          </>: 
          <></>
          }

        </div>

      </div>
    </Layout>
  )
}

export default Info
