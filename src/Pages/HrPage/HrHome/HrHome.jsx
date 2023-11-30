import React from 'react'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const HrHome = () => {
    const axiosPublic = useAxiosPublic();
    const { data: pendingReq = [] } = useQuery({
        queryKey: ["pendingReq"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/pending-requests`);
          return res.data;
        },
      });

      const { data: assetLess = [] } = useQuery({
        queryKey: ["assetLess"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/asssts-less-ten`);
          return res.data;
        },
      });
      console.log(assetLess.length)
  return (
    <div>
      <h2 className='text-3xl py-10'>Top 5 Pending Request</h2>
      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Asset Name</th>
              <th>Product Quantity</th>
              <th>Asset Type</th>
              <th>Asset Status</th>
              <th> Requester Email</th>
            </tr>
          </thead>
          <tbody>
            {pendingReq.slice(0,5).map((iteam, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{iteam.productName}</td>
                  <td>{iteam.productQuantity}</td>
                  <td>{iteam.type}</td>
                  <td>
                    {iteam.status}
                  </td>
                  <td>{iteam.requesterEmail}</td>
               
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Asset Name</th>
              <th>Product Quantity</th>
              <th>Asset Type</th>
              <th>Asset Status</th>
              <th> Requester Email</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <h2 className='text-3xl py-10'> Limited Stock items </h2>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Product Type</th>
              <th>Product Quantity</th>
              <th>Date Added</th>
            </tr>
          </thead>
          <tbody>
            {assetLess.map((iteam, index ) => {
              return (

            <tr key={index}>
              <th>{index + 1}</th>
              <td>{iteam.productName}</td>
              <td>{iteam.type}</td>
              <td>{iteam.productQuantity}</td>
              <td>{iteam.productDate}</td>
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
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  )
}

export default HrHome
