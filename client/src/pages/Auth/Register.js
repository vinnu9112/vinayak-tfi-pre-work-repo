import React, { useState, useEffect } from 'react';
import citiesData from '../../json/cities.json';
import Layout from '../../components/Layout';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [cities, setCities] = useState([]);
  const [languages, setLanguages] = useState('');
  const [availability, setAvailability] = useState('');
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setCities(citiesData)
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`/api/v1/auth/register`, { name, email, password, phone, location, languages, availability, answer })
    console.log(availability);
    if (res && res?.data?.success) {
      toast.success('Registered Successfully')
      setName('')
      setEmail('')
      setPassword('')
      setPhone('')
      setLanguages('')
      setAvailability('')
      setAnswer('')
      setLocation('')
    }
    else {
      toast.error(res.data.message)
    }
  };

  return (
    <Layout>
      <div className='container'>
        <div className="row justify-content-center m-1">
          <div className="col-md-6">
            <div className="register">
              <form className='my-2' onSubmit={handleSubmit}>
                <h4 className='title mb-3'>Register Here</h4>
                <div className="mb-3">
                  <input type="name" className="form-control" id="exampleInputName1" placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="mb-3">
                  <input type="email" className="form-control" name='email' id="exampleInputEmail1" placeholder='Enter your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <input type="phone" className="form-control" id="exampleInputPhone1" placeholder='Enter your phone' value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <select className="form-select" value={location} onChange={(e) => setLocation(e.target.value)}>
                    <option value="">Select a city</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-6">
            <div className="register">
              <form className='my-2' onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="languages" className="form-control" id="exampleInputLanguages1" placeholder='Languages you know'
                    value={languages} onChange={(e) => setLanguages(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="availability" className="form-control"
                    id="exampleInputAvailability1" placeholder='Your availability in form of days of week' value={availability} onChange={(e) => setAvailability(e.target.value)} required
                  />
                </div>
                <div className="mb-3">
                  <input type="answer" className="form-control" id="exampleInputAnswer1" placeholder='What is your favorite sports?' value={answer} onChange={(e) => setAnswer(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
