import Cookies from "js-cookie";
import React from "react";
import { Link } from "react-router-dom";
import { useUserState } from "../Store/store";

const Header = () => {
  const { unsetIsLoggedIn } = useUserState();

  const handleLogout = () => {
    Cookies.remove("jwt");
    unsetIsLoggedIn();
  };

  return (
    <div className="flex justify-between px-[2%] sm:px-[5%] py-[2rem] border-b-[1px] border-[#b6b6b6]">
      <Link to="/">
        <p>Chitransh App</p>
      </Link>
      <nav>
        <ul
          onClick={handleLogout}
          className="flex xl:gap-12 gap-5 hover:text-blue-800 hover:underline px-2 cursor-pointer"
        >
          Logout
        </ul>
      </nav>
    </div>
  );
};

export default Header;
