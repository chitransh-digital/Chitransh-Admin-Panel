import React, { useState } from "react";
import adminImage from "../../Assets/admin.jpg";
import { loginAdmin } from "../../Api/authApi";
import Cookies from "js-cookie";
import { useUserState } from "../../Store/store";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setIsLoggedIn } = useUserState();

  const submitHandler = async () => {
    try {
      const response = await loginAdmin(password);
      const { token } = response;
      if (!token) {
        alert("Invalid Password");
        return;
      }
      Cookies.set("jwt", token, { expires: 3 });
      setIsLoggedIn();
      setRedirect(true);
    } catch (error) {
      console.error("Login failed", error);
      alert("Login failed. Please try again.");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <center>
      <div className="mt-[10rem] w-[30rem] h-[30rem] px-12 pt-10 rounded-xl border-black border-2">
        <p className="text-2xl font-bold">Admin Login</p>
        <div className="w-[15rem] h-[12rem]">
          <img src={adminImage} alt="admin" />
        </div>
        <label className="font-bold">Enter Password</label>
        <input
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          className="mt-2 h-10 w-full rounded-md py-1 px-2 border-black border-[1px]"
        />
        <button
          onClick={submitHandler}
          className="bg-gray-700 text-white font-bold px-10 py-4 mt-10 rounded-md hover:bg-gray-800"
        >
          Login
        </button>
      </div>
    </center>
  );
};

export default LoginPage;
