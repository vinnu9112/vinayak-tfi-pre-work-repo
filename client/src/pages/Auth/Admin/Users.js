import React, { useState, useEffect } from 'react';
import Layout from '../../../components/Layout';
import { useAuth } from '../../../context/auth';
import axios from 'axios';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [auth] = useAuth();

  const getUsers = async () => {
    try {
      const { data } = await axios.get('/api/v1/auth/users');
      setUsers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (auth?.token) getUsers();
  }, [auth?.token]);


  return (
    <Layout>
      <div className="container">
          <h1 className="text-center my-1">Volunteers</h1>
          <div className="border shadow table-container" >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">User</th>
                  <th scope="col">Email</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Languages</th>
                  <th scope="col">Availability</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u, i) => (
                  <tr key={u._id}>
                    <td>{i + 1}</td>
                    <td>{u?.name}</td>
                    <td>{u?.email}</td>
                    <td>{u?.phone}</td>
                    <td>{u?.languages}</td>
                    <td>{u?.availability}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
      </div>

    </Layout>
  );
};

export default Users;
