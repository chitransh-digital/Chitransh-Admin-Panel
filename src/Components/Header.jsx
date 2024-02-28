import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  // const logoutHandler = () => {
  //   localStorage.removeItem("jwt");
  // };

  return (
    <div className="flex justify-between px-[2%] sm:px-[5%] py-[2rem] border-b-[1px] border-[#b6b6b6]">
      <Link to="/">
        <p>Chitransh App</p>
      </Link>
      <nav>
        <ul className="flex xl:gap-12 gap-5 transition-all ease-in-out visby px-2">
          {/* <a onClick={logoutHandler} className="md:block hidden"> */}
            Logout
          {/* </a> */}
        </ul>
      </nav>
    </div>
  );
};

export default Header;
