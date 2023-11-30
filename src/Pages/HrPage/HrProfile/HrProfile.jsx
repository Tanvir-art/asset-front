import React, { useContext } from 'react'
import { AuthContext } from '../../../provider/AuthProvider';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const HrProfile = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const userEmail = user?.email;
    const { data: hrprofile = [] } = useQuery({
      queryKey: ["hrprofile", userEmail],
      queryFn: async () => {
        const res = await axiosPublic.get(`/hrprofile?email=${userEmail}`);
        return res.data;
      },
    });
    const id = hrprofile[0]?._id;
    console.log(id)

    const handleUpdate =(e)=>{
        e.preventDefault();
        const  form = e.target;
        const name = form.name.value;
        const dateOfBirth = form.dateOfBirth.value;
        const profileInfo ={
            name : name,
            dateOfbirth : dateOfBirth,
        }
        axiosPublic.put(`/hrprofile/${id}`, profileInfo).then(res =>{
            if(res.data.modifiedCount > 0){
              console.log('profile update')
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Profile Updated Successfully",
                showConfirmButton: false,
                timer: 1500,
            })
          }
        }).catch((error) => console.log(error));
      }

  return (
    <div>
          <div className="w-1/2 mx-auto py-10">
        <div className="flex justify-center">
            <img src={hrprofile[0]?.image} className="w-[150px]" alt="" />
        </div>
      <form onSubmit={handleUpdate}>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="text" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              placeholder="enter your image url"
              type="text"
              defaultValue={hrprofile[0]?.name}
              name="name"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>

        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="text" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              placeholder="enter your image url"
              type="email"
              defaultValue={hrprofile[0]?.email}
              readOnly
              name="email"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
        <div className="p-2 w-full">
          <div className="relative">
            <label htmlFor="text" className="leading-7 text-sm text-gray-600">
              Date Of Birth
            </label>
            <input
              placeholder="enter your image url"
              type="date"
              defaultValue={hrprofile[0]?.dateOfbirth}
              
              name="dateOfBirth"
              className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
            />
          </div>
        </div>
    <div className="flex justify-center">
        <button  className="btn btn-primary">Update</button>

    </div>
      </form>
    </div>
    </div>
  )
}

export default HrProfile
