import React from 'react'
import Layout from '../components/Layout'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';

const Homepage = () => {
  const navigate = useNavigate();
  const [auth] = useAuth();
  return (
    <Layout>
      <div className="container">
        <h5 className="justify-content-center mt-1" style={{ padding: "10%" }}>
          Given the recent change in the education system, due to the ongoing pandemic, many kids are behind in
          their learning curve due to school closures. To reduce this impact, Teach for India is running a large-scale
          volunteer program, attempting to get volunteers from around the country to assist with teaching in
          online classrooms. The classrooms have varying requirements, for example, some students would
          benefit significantly if the volunteer could teach them in their native language. Matching classrooms with
          such requirements with the right volunteers would be immensely helpful for the students.
        </h5>
        {
          !auth?.user ? 
            <button className='btn btn-outline-primary' style={{ marginLeft: "42%" }} onClick={() => navigate('/register')}>Apply Now</button>
           : null
        }
      </div>
    </Layout>
  )
}

export default Homepage
