import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
const Assets = () => {
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [hrEmail, setHrEmail] = useState("");
  const { user } = useContext(AuthContext);
  const loggedInEmail = user?.email;
  console.log(loggedInEmail);
  const axiosPublic = useAxiosPublic();

  //   const [filteredData, setFilteredData] = useState([]);
  const [type, setType] = useState(""); // 'returnable' or 'non returnable'

  // useEffect(() => {
  //   // Fetch data from the Express.js backend
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`http://localhost:5000/asset/${type}`);
  //       const data = await response.json();
  //       setFilteredAssets(data);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   // Fetch data initially and whenever 'type' changes
  //   fetchData();
  // }, [type]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch("http://localhost:5000/myEmployee");
        const data = await response.json();

        if (data.length > 0) {
          setHrEmail(data[0].hrEmail);
        }
      } catch (error) {
        console.error("Error fetching employee data:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  const getAssets = async () => {
    try {
      const response = await fetch(`http://localhost:5000/assets/${hrEmail}`);
      const data = await response.json();
      setFilteredAssets(data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };
  const onSubmit = (e, iteam) => {
    e.preventDefault();
    const form  = e.target;
     const additional = form.additionalInfo.value;
    console.log(additional)

    const iteamInfo = {
      productName: iteam.productName,
      type: iteam.type,
      productQuantity: iteam.productQuantity,
      productPostDate: iteam.productDate,
      addtionalInfor : additional,
      requesterEmail: loggedInEmail,
      requestDate: new Date(),
      status: "pending",
    };
    axiosPublic.post("/request", iteamInfo).then((res) => {
      if (res.data.insertedId) {
        console.log("user added to the database");
        // reset();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Request Send Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  }



  return (
    <div>
      <select onChange={(e) => setType(e.target.value)}>
        <option value="returnable">Returnable</option>
        <option value="nonreturnable">Non Returnable</option>
      </select>
      {/* <h1>Employee Assets {assets.length}</h1> */}

      <div>
        <div>
          <button onClick={getAssets} className="btn btn-primary">
            Show the Asset
          </button>

          <div>
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Product Type</th>
                    <th>Product Quantity</th>
                    <th>Date Added</th>
                    <th>Request Button</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((iteam, index) => {
                    return (
                      <tr key={index}>
                        <th>{index + 1}</th>
                        <td>{iteam.productName}</td>
                        <td>{iteam.type}</td>
                        <td>{iteam.productQuantity}</td>
                        <td>{iteam.productDate}</td>
                        <td>
                          {/* Open the modal using document.getElementById('ID').showModal() method */}
                          <button
                            className="btn"
                            onClick={() =>
                              document.getElementById("my_modal_1").showModal()
                            }
                          >
                            Request
                          </button>
                          <dialog id="my_modal_1" className="modal">
                            <div className="modal-box">
                              <form   onSubmit={(e) => onSubmit(e, iteam)}>
                              <input
                                type="text"
                                className="input w-full border-gray-400"
                                placeholder="additional infromation"
                                name="additionalInfo"
                                id=""
                              />

<div className="btn">
                                    <button
                                      // onClick={() => requestData(iteam)}
                                      className="btn btn-primary"
                                    >
                                      Request
                                    </button>
                                  </div>
                              </form>

                              <div className="modal-action">
                                <form
                                  method="dialog"
                                  className="flex justify-around"
                                >

                                  {/* if there is a button in form, it will close the modal */}
                                  <div>
                                    <button className="btn">Close</button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </dialog>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Product Name</th>
                    <th>Product Type</th>
                    <th>Product Quantity</th>
                    <th>Date Added</th>
                    <th>Request Button</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
