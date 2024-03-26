import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";

const LoginPage = () => {

  const navigate = useNavigate();
  const [isLoggedIn] = useState(false);
  const [state, setState] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setState((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const loginHandler = async () => {
    navigate("/feeds");
  };

  if (isLoggedIn) {
    return <Navigate replace to="/" />;
  } else if (loading) {
    return (
      <div>
        <center>
          <div
            id="loginbox"
            className="bg-white mx-2 sm:w-[35rem] w-[22rem] h-[35rem] mt-[5rem] rounded-3xl"
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
              <p className="text-red-400 visby font-light">
                Verifying Credentials
              </p>
            </div>
          </div>
        </center>
      </div>
    );
  } else {
    return (
      <div>
        <center>
          <div
            id="loginbox"
            className="bg-white mx-2 sm:w-[35rem] w-[22rem] h-[35rem] mt-[5rem] rounded-3xl drop-shadow-sm border-black border-2"
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
                  className="border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out"
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
