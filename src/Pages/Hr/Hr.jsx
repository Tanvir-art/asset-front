import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";
import Swal from "sweetalert2";

const Hr = () => {
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const { createuser, updateUserProfile, googleSignIn } =
    useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        image: result.user?.photoURL,
        package: "5 Members for $5",
        role: "admin",
      };
      axiosPublic.post("/admin", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };

  const onSubmit = (data) => {
    console.log(data);
    createuser(data.email, data.password).then((result) => {
      const loggedUSer = result.user;
      console.log(loggedUSer);
      updateUserProfile(data.name, data.photo)
        .then(() => {
          console.log("user profle update");
          const hrInfo = {
            name: data.name,
            email: data.email,
            companyName: data.companyName,
            companyLogo: data.companyLogo,
            image: data.photo,
            dateOfbirth: data.dateOfbirth,
            package: data.select,
            role: "admin",
          };
          axiosPublic.post("/admin", hrInfo).then((res) => {
            if (res.data.insertedId) {
              console.log("user added to the database");
              // reset();
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Hr created Successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              navigate("/payment");
            }
          });
        })
        .catch((error) => console.log(error));
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
              Join As A Hr
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
                    placeholder="enter name"
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
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    placeholder="enter email"
                    type="email"
                    id="email"
                    name="email"
                    {...register("email")}
                    {...register("email", { required: true })}
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.email && (
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
                    Company Name
                  </label>
                  <input
                    placeholder="enter company name"
                    type="text"
                    id="companyName"
                    {...register("companyName")}
                    {...register("companyName", { required: true })}
                    name="companyName"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.companyName && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Company logo
                  </label>
                  <input
                    placeholder="Comapny logo url"
                    type="text"
                    id="companyLogo"
                    {...register("companyLogo")}
                    {...register("companyLogo", { required: true })}
                    name="companyLogo"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.companyLogo && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="text"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Image
                  </label>
                  <input
                    placeholder="enter your image url"
                    type="text"
                    {...register("photo", { required: true })}
                    name="photo"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.photo && (
                    <span className="text-red-500">This field is required</span>
                  )}
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Password
                  </label>
                  <input
                    placeholder="password"
                    type="password"
                    {...register("password")}
                    {...register("password", {
                      required: true,
                      minLength: 6,
                      maxLength: 20,
                      pattern:
                        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
                    })}
                    name="password"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.password && (
                    <span className="text-red-500">This field is required</span>
                  )}
                  {errors.password?.type === "minLength" && (
                    <span className="text-red-500">
                      {" "}
                      password must b 6 character
                    </span>
                  )}
                  {errors.password?.type === "maxLength" && (
                    <span className="text-red-500">
                      {" "}
                      password must b 6 character
                    </span>
                  )}
                  {errors.password?.type === "pattern" && (
                    <span className="text-red-500">
                      {" "}
                      password must have one upercase , lowercase, a number and
                      a special character
                    </span>
                  )}
                </div>
              </div>

              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="date"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Date Of Birth
                  </label>
                  <input
                    type="date"
                    {...register("dateOfbirth")}
                    {...register("dateOfbirth", { required: true })}
                    name="dateOfbirth"
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                  {errors.dateOfbirth && (
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
                    Packages
                  </label>
                  <select
                    {...register("select")}
                    {...register("select", { required: true })}
                    name="select"
                    id=""
                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  >
                    <option htmlFor="5 Members for $5">5 Members for $5</option>
                    <option htmlFor="10 Members for $8">
                      10 Members for $8
                    </option>
                    <option htmlFor="20 Members for $15">
                      {" "}
                      20 Members for $15
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
                <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  Signup
                </button>
              </div>

              <div className="flex flex-col items-center mx-auto  gap-3">
                <p className="text-lg font-bold mt-4">Or Login With Google</p>
                <button
                  onClick={handleGoogleSignIn}
                  className="btn btn-primary"
                >
                  Google
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Hr;
