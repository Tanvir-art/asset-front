import React, { useContext, useState } from 'react'
import useAxiosPublic from '../../../hooks/useAxiosPublic'
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import Packages from '../../../Components/Packages/Packages';
import UseHr from '../../../hooks/UseHr/UseHr';
import { AuthContext } from '../../../provider/AuthProvider';
import UseMyEmployee from '../../../hooks/UseMyEmployee/UseMyEmployee';

const AddEmployee = () => {
  const {user} = useContext(AuthContext)
  const hrEmail = user?.email;
  const [myEmployee, refetch] = UseMyEmployee();
  const employeLength = myEmployee.length;
  console.log(employeLength)
  const [hr] = UseHr();
  const Packag = hr[0]?.package;
  console.log(Packag)
  let setMember = 0;
  if(Packag === '5 Members for $5'){
     setMember = 5
  }else if(Packag === '10 Members for $8'){
     setMember = 10
  } else if(Packag === '20 Members for $15'){
      setMember = 20
  }
  console.log(setMember)
  const axiosPublic = useAxiosPublic();
  const {data: employee= []} = useQuery({
    queryKey: ['employee'],
    queryFn: async()=>{
      const  res = await axiosPublic.get('/employee');
      return res.data;
    }
  })
  const handleAdd = (iteam)=>{
    if(setMember > employeLength){
      const iteamInfo = {
        name: iteam.name,
        email: iteam.email,
        image: iteam.image,
        dateOfbirth: iteam.dateOfbirth,
        hrEmail: hrEmail,
        role: 'employee'
      }
      axiosPublic.post('/myEmployee',  iteamInfo).then(res=>{
  
          if(res.data.insertedId){
            console.log('employee added')
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Employee Added Successfully",
              showConfirmButton: false,
              timer: 1500,
          })
          refetch()
        
        }
  
    }).catch((error) => console.log(error))
    }else{
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "package limit over",
        showConfirmButton: false,
        timer: 1500,
    })
    }

  }
  return (
    <div>
      <h1>add employee {employee.length}</h1>
    <div>
      <Packages/>
    </div>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Checkbox</th>
              <th>Image</th>
              <th>Name</th>
              <th>Member</th>
              <th>Add Button</th>
            </tr>
          </thead>
          <tbody>
            {employee.map((iteam, index ) => {
              return (

            <tr key={index}>
              <th>{index + 1}</th>
              <td><input type="checkbox" name="check" id="" /></td>
              <td><img className='w-[50px]' src={iteam.image} alt="email user" /></td>
              <td>{iteam.name}</td>
              <td>{iteam.role}</td>
              <td>
            
                
                <button onClick={()=>handleAdd(iteam)}  className="btn btn-primary">Add</button>
                
              
                </td>
            </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Checkbox</th>
              <th>Image</th>
              <th>Name</th>
              <th>Member</th>
              <th>Add Button</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default AddEmployee
