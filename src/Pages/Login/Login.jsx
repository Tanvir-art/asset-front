import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const Login = () => {
  const {signIn} = useContext(AuthContext)
  const formSubmit = (e)=>{
    e.preventDefault();
    const form = e.target;
    const  email = form.email.value;
    const  password = form.password.value;
    console.log(email, password)
    signIn(email, password)
    .then((result)=>{
      const user = result.user;
      console.log(user)
    })
  }
  return (
    
    <>
      <div className="mt-16">
        <h2 className="text-4xl font-bold text-center mb-6">Log In</h2>
      </div>
      <form onSubmit={formSubmit} className="w-[680px] mx-auto ">
        <div>
          <div>
            <input
              placeholder="email"
              className="input border-slate-300 w-full "
              type="email"
              name="email"
            />
          </div>
          <div className="py-4">
            <input
              placeholder="password"
              className="input border-slate-300 w-full "
              type="password"
              name="password"
            />
          </div>
          <div className="flex justify-center">
            <div>

            <button className="btn btn-primary">Login</button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default Login;
