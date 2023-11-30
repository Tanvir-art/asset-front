import React, { useState } from "react";
import UseAsset from "../../../hooks/UseAsset/UseAsset";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { Link } from "react-router-dom";


const AssetList = () => {
  const [searchIteam, setSearchIteam] = useState('')
  const [filterType, setFilterType] = useState('');
  const [filterQuantity, setFilterQuantity] = useState('');
  const axiosPublic = useAxiosPublic()
  const [refetch,asset, isPending] = UseAsset();

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

        axiosPublic.delete(`/addAsset/${id}`)
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
  // const handleUpdate =(id)=>{
  //    axiosPublic.put(`/updateAsset/${id}`)
  //    .then(res=>{
  //     console.log(res.data.modifiedCount)
  //    })
  // }
  return (
    <div>

<div className='flex justify-center py-10'>
<div className="join">
  <input className="input input-bordered join-item"
 onChange={(e)=>{setSearchIteam(e.target.value)}}
  placeholder="Search by Name"/>
  <button className="btn join-item rounded-r-full">Search</button>
  </div>
</div>

<div className="flex flex-end">
        <div className="pb-10 mr-5">
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setFilterType(e.target.value)}
            value={filterType}
          >
            <option disabled value="">Filter Type</option>
            <option value="Returnable">Returnable</option>
            <option value="Non Returnable">Non Returnable</option>
          </select>
        </div>

        <div>
          <select
            className="select select-bordered w-full max-w-xs"
            onChange={(e) => setFilterQuantity(e.target.value)}
            value={filterQuantity}
          >
            <option disabled value="">Filter Quantity</option>
            <option value="Available">Available</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>


      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Quantity</th>
              <th>Date Added</th>
              <th>Update Button</th>
              <th>Delete Button</th>
            </tr>
          </thead>
          <tbody>
            {asset
              .filter((val) => {
                if (searchIteam === '' || val.productName.toLowerCase().includes(searchIteam.toLowerCase())) {
              
                  if (filterType === '' || val.type === filterType) {
                  
                    if (filterQuantity === '' || (filterQuantity === 'Available' && val.productQuantity > 0) || (filterQuantity === 'Out of Stock' && val.productQuantity <= 0)) {
                      return true;
                    }
                  }
                }
                return false;
              }).map((iteam, index ) => {
              return (

            <tr key={index}>
              <th>{index + 1}</th>
              <td>{iteam.productName}</td>
              <td>{iteam.type}</td>
              <td>{iteam.productQuantity}</td>
              <td>{iteam.productDate}</td>
              <td>
              <Link to={`/updateAsset/${iteam._id}`}>
                
                <button  className="btn btn-primary">Update</button>
                
              </Link>
                </td>
              
              <td><button onClick={()=>handleDelete(iteam._id)} className="btn btn-primary">Delete</button></td>
            </tr>
              )
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Quantity</th>
              <th>Date Added</th>
              <th>Update Button</th>
              <th>Delete Button</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default AssetList;
