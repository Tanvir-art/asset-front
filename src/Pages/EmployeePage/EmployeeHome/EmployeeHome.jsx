import React from 'react'
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';

const EmployeeHome = () => {
    const axiosPublic = useAxiosPublic();
    const { refetch, data: customReq = [] } = useQuery({
      queryKey: ["customReq"],
      queryFn: async () => {
        const res = await axiosPublic.get(`/customRequest`);
        return res.data;
      },
    });

    const { data: pendingReq = [] } = useQuery({
        queryKey: ["pendingReq"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/pending-requests`);
          return res.data;
        },
      });

      const { data: currentMonth = [] } = useQuery({
        queryKey: ["currentMonth"],
        queryFn: async () => {
          const res = await axiosPublic.get(`/requests-current-month`);
          return res.data;
        },
      });



  return (
    <div>
      <h2 className='text-2xl font-bold'>Custom Request:</h2>

      <div className="overflow-x-auto">
        <table className="table table-xs">
          <thead>
            <tr>
              <th></th>
              <th>Asset Name</th>
              <th>Asset Price</th>
              <th>Asset Type</th>
              <th>Asset Image</th>
              <th>Why Need</th>
              <th>Additional Information</th>
            </tr>
          </thead>
          <tbody>
            {customReq.map((iteam, index) => {
              return (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{iteam.name}</td>
                  <td>{iteam.price}</td>
                  <td>{iteam.type}</td>
                  <td>
                    <img src={iteam.assetImage} className="w-[50px]" alt="" />
                  </td>
                  <td>{iteam.need}</td>
                  <td>{iteam.information}</td>
               
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <th></th>
              <th>Asset Name</th>
              <th>Asset Price</th>
              <th>Asset Type</th>
              <th>Asset Image</th>
              <th>Why Need</th>
              <th>Additional Information</th>
            </tr>
          </tfoot>
        </table>
      </div>

      <h2 className='text-2xl font-bold py-6'>Pending Request: {pendingReq.length}</h2>
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
            {pendingReq.map((iteam, index) => {
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

      <h2 className='text-2xl font-bold py-6'>Current Month Request: {currentMonth.length}</h2>

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
            {currentMonth.map((iteam, index) => {
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
    </div>
  )
}

export default EmployeeHome
