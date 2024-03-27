import React, { useState } from "react";
import { changePassword } from "../../Api/authApi";
import Cookies from "js-cookie";

const ChangePasswordForm = () => {
  const [passwords, setPasswords] = useState({});

  const [isLoading, setIsLoading] = useState(false);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setPasswords((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const createClickHandler = async () => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      alert("Confirm password doesn't match");
      return;
    }
    if (window.confirm("Are you sure you want to update password?")) {
      setIsLoading((prev) => true);
      const response = await changePassword(
        passwords.currentPassword,
        passwords.newPassword
      );

      if (!response) {
        alert("Couldn't update password. Please try again.");
      }
      if (response.message === "Incorrect Password") {
        alert("Incorrect Current Password. Please try again.");
      }
      if (response.message === "Password changed successfully") {
        alert("Password updated successfully. You will be logged out now.");
        Cookies.remove("jwt");
        window.location.reload();
      }
      setIsLoading((prev) => false);
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Change Password
        </p>
      </div>
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Current Password</p>
        <input
          type="password"
          onChange={handleChange("currentPassword")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">New Password</p>
        <input
          type="password"
          onChange={handleChange("newPassword")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Confirm Password</p>
        <input
          type="password"
          onChange={handleChange("confirmNewPassword")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <button
          onClick={isLoading ? () => {} : createClickHandler}
          className={`block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Submit" : <div id="lds-dual-ring" />}
        </button>
        <p className="mt-8 text-red-600">
          Note: After updating password you will be logged out. <br /> You will
          have to login again with the new password.
        </p>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
