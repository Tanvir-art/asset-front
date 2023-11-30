import React from 'react'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const MyEmployee = () => {
  const axiosPublic = useAxiosPublic();

  const {refetch, data: myEmplopyee = [] } = useQuery({
    queryKey: ["myEmplopyee"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/team?email`);
      return res.data;
    },
  });

  const handleDelete = id =>{
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {

        axiosPublic.delete(`/team/${id}`)
        .then(res => {
          if(res.data.deletedCount > 0){
            refetch();
                    Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
          }
        })

      }
    });
  }
  return (
    <div>
      <h1>my  employee {myEmplopyee.length}</h1>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Remove Button</th>
            </tr>
          </thead>
          <tbody>
            {myEmplopyee.map((iteam, index ) => {
              return (

            <tr key={index}>
              <th>{index + 1}</th>
              <td><img src={iteam.image} className='w-[50px]' alt="" /></td>
              <td>{iteam.name}</td>
              <td>{iteam.role}</td>
              
              
              <td><button onClick={()=>handleDelete(iteam._id)} className="btn btn-primary">Delete</button></td>
            </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Image</th>
              <th>Name</th>
              <th>Type</th>
              <th>Remove Button</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default MyEmployee
