import React, { useContext } from 'react'
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import { AuthContext } from '../../../provider/AuthProvider';


const EmployeeCustom = () => {
  const {user} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const email = user?.email;
      const axiosPublic = useAxiosPublic();
      const onSubmit = (data) => {
        console.log(data);
        
              const customeInfo = {
                name: data.name,
                email: email,
                price: data.price,
                need: data.need,
                assetImage: data.assetImage,
                type: data.select,
                information: data.information,
              };
              axiosPublic.post("/customRequest", customeInfo).then((res) => {
                if (res.data.insertedId) {
                  console.log("user added to the database");
                  // reset();
                  Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Custom Request Send Successfully",
                    showConfirmButton: false,
                    timer: 1500,
                  });
                }
              });
        
      };

      


  return (
    <div>
            <form
        onSubmit={handleSubmit(onSubmit)}
        className="text-gray-600 body-font relative"
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Employee Custom Request
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              Whatever cardigan tote bag tumblr hexagon brooklyn asymmetrical
              gentrify.
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    placeholder="enter asset name"
                    type="text"
                    id="name"
                    {...register("name")}
                    {...register("name", { required: true })}
                    name="name"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.name && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="price"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Price
                  </label>
                  <input
                    placeholder="enter price"
                    type="text"
                    id="price"
                    name="price"
                    {...register("price")}
                    {...register("price", { required: true })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.price && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="companyName"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Why Need This
                  </label>
                  <input
                    placeholder="why need this"
                    type="text"
                    id="need"
                    {...register("need")}
                    {...register("need", { required: true })}
                    name="need"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.need && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="assetImage"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Asset Image
                  </label>
                  <input
                    placeholder="Asset Image url"
                    type="text"
                    id="assetImage"
                    {...register("assetImage")}
                    {...register("assetImage", { required: true })}
                    name="assetImage"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.assetImage && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

 

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="date"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Type
                  </label>
                  <select
                    {...register("select")}
                    {...register("select", { required: true })}
                    name="select"
                    id=""
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option htmlFor="returnable">Returnable</option>
                    <option htmlFor="non returnable">
                      Non Returnable
                    </option>
                    {errors.select && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                  </select>
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="information"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Additional Information
                  </label>
                 <input type="text"
                                     {...register("information")}
                                     {...register("information", { required: true })}
                 name='information' className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"/>
                                     {errors.information && (
                      <span className="text-red-500">
                        This field is required
                      </span>
                    )}
                </div>
              </div>

              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Request
                </button>
              </div>

            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EmployeeCustom
