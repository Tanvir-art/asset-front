import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const CustomRequest = () => {
  const axiosPublic = useAxiosPublic();
  const { refetch, data: customReq = [] } = useQuery({
    queryKey: ["customReq"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/customRequest`);
      return res.data;
    },
  });

  const approved = (id) => {
    axiosPublic
      .patch(`/customReq/${id}`)
      .then((res) => {
        console.log(res.data);
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product Updated Successfully",
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
        axiosPublic.delete(`/customReq/${id}`).then((res) => {
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
      <h1>custom request {customReq.length}</h1>

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
              <th>Approve Button</th>
              <th>Reject Button</th>
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
                  <td>
                    {iteam.role === "approved" ? (
                      <button className="btn btn-primary">
                        Already Approved
                      </button>
                    ) : (
                      <button
                        onClick={() => approved(iteam._id)}
                        className="btn btn-primary"
                      >
                        Approve
                      </button>
                    )}
                  </td>

                  <td>
                    <button
                      onClick={() => handleDelete(iteam._id)}
                      className="btn btn-primary"
                    >
                      Reject
                    </button>
                  </td>
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
              <th>Approve Button</th>
              <th>Reject Button</th>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default CustomRequest;
