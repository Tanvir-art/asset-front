import React, { useState } from 'react'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const Request = () => {
  const [searchIteam, setSearchIteam] = useState('')
  const axiosPublic = useAxiosPublic();
  const { refetch, data: request = [] } = useQuery({
    queryKey: ["request"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/request`);
      return res.data;
    },
  });

  const approve = (id) => {
    axiosPublic
      .put(`/request/approve/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.message === 'Request approved successfully') {
          // Update the status in the local state
          refetch(); // This will refetch the data and update the UI
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: " Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => console.log(error));
  };


  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/request/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  
  return (
    <div>


  <div className='flex justify-center py-10'>
<div className="join">
  <input className="input input-bordered join-item"
 onChange={(e)=>{setSearchIteam(e.target.value)}}
  placeholder="Search by Email"/>
  <button className="btn join-item rounded-r-full">Search</button>
  </div>
</div>


            <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Email of requester</th>
              {/* <th>Name of requester</th> */}
              <th>Request Date</th>
              <th>Additional Note</th>
              <th>Status</th>
              <th>Approve Button</th>
              <th>Reject Button</th>
            </tr>
          </thead>
          <tbody>
            {request.filter((val)=>{
              if(searchIteam === ''){
                return val;
              }else if(val.requesterEmail.toLowerCase().includes(searchIteam.toLowerCase())){
                return val
              }
            }).map((iteam, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{iteam.productName}</td>
                  <td>{iteam.type}</td>
                  <td>{iteam.requesterEmail}</td>
                  <td>{iteam.requestDate}</td>
                  <td>{iteam.addtionalInfor}</td>
                  <td>{iteam.status}</td>
                  <td><button onClick={()=>approve(iteam._id)} className='btn btn-primary'>Approve</button></td>
                  <td><button onClick={() => handleDelete(iteam._id)} className='btn btn-primary'>Reject</button></td>
          
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Asset Name</th>
              <th>Asset Type</th>
              <th>Email of requester</th>
              {/* <th>Name of requester</th> */}
              <th>Request Date</th>
              <th>Additional Note</th>
              <th>Status</th>
              <th>Approve Button</th>
              <th>Reject Button</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default Request
