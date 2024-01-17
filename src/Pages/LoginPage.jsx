import React, { useState } from "react";
import Navbar from "../Components/Navbar";
import { TextField } from "@mui/material";
import { useUserState } from "../store/store";
import { Navigate } from "react-router-dom";

const LoginPage = () => {
  const { isLoggedIn, setIsLoggedIn } = useUserState();

  const [state, setState] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const loginHandler = async () => {
    // setLoading(prev => true)
    // try {
    //   const token = await login(state)
    //   if (token) {
    //     localStorage.setItem("jwt", token)
    //     setIsLoggedIn()
    //   } else {
    //     setLoading(prev => false)
    //     setError(prev => true)
    //     setTimeout(() => {
    //       setError(prev => false)
    //     }, 3000);
    //   }
    // } catch (error) {
    //   console.log(error)
    // }
  };

  if (isLoggedIn) {
    return <Navigate replace to="/" />;
  } else if (loading) {
    return (
      <div>
        <Navbar />
        <center>
          <div
            id="loginbox"
            className="bg-white sm:w-[35rem] w-[25rem] h-[35rem] mt-[5rem] rounded-3xl shadow-black drop-shadow-2xl transition-all ease-in-out animate__animated animate__fadeInLeft"
          >
            <p className="absolute left-[10%] top-[5%] text-3xl font-bold visby">
              Login
            </p>
            <div className="w-[80%] h-[1px] bg-[#e3e3e3] top-[15%] left-[10%] absolute" />
            <div className="w-[80%] h-[80%] absolute left-[10%] top-[25%]">
              <div>
                <div className="lds-heart">
                  <div></div>
                </div>
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  } else {
    return (
      <div>
        <Navbar />
        <center>
          <div
            id="loginbox"
            className="bg-white sm:w-[35rem] w-[25rem] h-[35rem] mt-[5rem] rounded-3xl shadow-black drop-shadow-2xl transition-all ease-in-out animate__animated animate__fadeInLeft"
          >
            <p className="absolute left-[10%] top-[5%] text-3xl font-bold visby">
              Login
            </p>
            <div className="w-[80%] h-[1px] bg-[#e3e3e3] top-[15%] left-[10%] absolute" />
            <div className="w-[80%] h-[80%] absolute left-[10%] top-[25%]">
              <TextField
                onChange={handleChange("email")}
                id="standard-basic"
                label="Email"
                variant="standard"
                className="w-full sm:w-9/12"
              />

              <div className="mt-[2.5rem]">
                <TextField
                  onChange={handleChange("password")}
                  id="standard-basic"
                  label="Password"
                  variant="standard"
                  type="password"
                  className="w-full sm:w-9/12"
                />

                <div className="w-full h-[5rem] flex justify-center items-center text-red-500 visby">
                  {error && "Invalid Credentials!"}
                </div>

                <button
                  onClick={loginHandler}
                  className="bg-[#FF008A] w-[8rem] h-[3rem] text-white mt-[5rem] rounded-md font-medium button"
                >
                  {" "}
                  Login
                </button>
              </div>
            </div>
          </div>
        </center>
      </div>
    );
  }
};

export default LoginPage;
