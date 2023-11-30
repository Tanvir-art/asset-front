import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const Team = () => {
   
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const userEmail = user?.email;
    const { refetch, data: team = [] , isPending} = useQuery({
      queryKey: ['team', userEmail],
      queryFn: async () => {
        const res = await axiosPublic.get(`/team`)
        return res.data;
      },
    });


    const [birthdayUsers, setBirthdayUsers] = useState([]);

    useEffect(() => {
      const today = new Date();
  
      // Filter users in the team whose birth month matches the current month
      const filteredUsers = team.filter((user) => {
        const birthDate = new Date(user.dateOfbirth);
        return birthDate.getMonth() === today.getMonth();
      });
  
      setBirthdayUsers(filteredUsers);
    }, [team]);
  
  return (
    <div>
{birthdayUsers.length>0 ?
(
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Employee Name</th>
              <th>Image</th>
              <th>Date Of Birthday</th>
            </tr>
          </thead>
          <tbody>
            {
        
            birthdayUsers.map((iteam, index ) => {
              return (

            <tr key={index}>
              <th>{index + 1}</th>
              <td>{iteam.name}</td>
              <td><img src={iteam.image} className='w-[50px]' alt="" /></td>
              <td>{iteam.dateOfbirth}</td>
            </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Employee Name</th>
              <th>Image</th>
              <th>Date Of Birthday</th>
            </tr>
          </tfoot>
        </table>
      </div>
) : <p className='text-center text-3xl font-bold py-10 '>No employee Birthday this month</p>
          }

        
<div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Employee Name</th>
              <th>Image</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {
        
            team.map((iteam, index ) => {
              return (

            <tr key={index}>
              <th>{index + 1}</th>
              <td>{iteam.name}</td>
              <td><img src={iteam.image} className='w-[50px]' alt="" /></td>
              <td>{iteam.role}</td>
            </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Employee Name</th>
              <th>Image</th>
              <th>Role</th>
            </tr>
          </tfoot>
        </table>
      </div>
    
    
      


    </div>
  )
}

export default Team
