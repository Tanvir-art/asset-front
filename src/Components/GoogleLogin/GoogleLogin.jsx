import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";

const GoogleLogin = () => {
    const {googleSignIn} = useContext(AuthContext);
    const handleGoogleSignIn =()=>{
        googleSignIn()
        .then(result => {
            console.log(result.user)
        })
    }
  return (
    <div>
      <div className="flex flex-col items-center mx-auto  gap-3">
        <p className="text-lg font-bold mt-4">Or Login With Google</p>
        <button onClick={handleGoogleSignIn} className="btn btn-primary">Google</button>
      </div>
    </div>
  );
};

export default GoogleLogin;
