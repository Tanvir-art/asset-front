import React from 'react';
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";
import {useLoaderData} from 'react-router-dom';
const UpdateAsset = () => {
    const loadedAsset  = useLoaderData()
    const {productName, productQuantity, productDate, type, _id} = loadedAsset;
    const axiosPublic = useAxiosPublic();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
      console.log(data);
      const updateInfo = {
        productName: data.productName,
        productQuantity: data.productQuantity,
        productDate: data.productDate,
        type: data.select,

      };
      axiosPublic.put(`/updateAsset/${_id}`, updateInfo).then(res =>{
        if(res.data.modifiedCount > 0){
          console.log('product update')
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Product Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
        })
      }
    }).catch((error) => console.log(error));
    }

  return (
    <div>
      <section className="text-gray-600 body-font relative">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
              Update  {productName}
            </h1>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="lg:w-1/2 md:w-2/3 mx-auto"
          >
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="productName"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    defaultValue={productName}
                    {...register("productName")}
                    {...register("productName", { required: true })}
                    name="productName"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.productName && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="productQuantity"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Product Quantity
                  </label>
                  <input
                    type="number"
                    id="productQuantity"
                    defaultValue={productQuantity}
                    {...register("productQuantity")}
                    {...register("productQuantity", { required: true })}
                    name="productQuantity"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.productQuantity && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="productQuantity"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Product Add Date
                  </label>
                  <input
                    type="date"
                    id="productDate"
                    defaultValue={productDate}
                    {...register("productDate")}
                    {...register("productDate", { required: true })}
                    name="productDate"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.productDate && (
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
                    Asset Type
                  </label>
                  <select
                  defaultValue={type}
                    {...register("select")}
                    {...register("select", { required: true })}
                    name="select"
                    id=""
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option htmlFor="returnable">Returnable</option>
                    <option htmlFor="non-returnable">Non Returnable</option>
                  </select>
                  {errors.select && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

              <div className="p-2 w-full">
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Update Product
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default UpdateAsset
