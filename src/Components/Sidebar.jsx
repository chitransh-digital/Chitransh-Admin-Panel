import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const css = "text-[#2462ff]";
  const location = useLocation();

  return (
    <div>
      <ul className="flex flex-col items-start justify justify-center gap-12 text-xl">
        <Link to="/feeds">
          <li className={location.pathname === "/feeds" ? css : ""}>Feeds</li>
        </Link>
        <Link to="/jobs">
          <li className={location.pathname === "/jobs" ? css : ""}>Jobs</li>
        </Link>
        <Link to="/family">
          <li className={location.pathname === "/family" ? css : ""}>Family</li>
        </Link>
        <Link to="/business">
          <li className={location.pathname === "/business" ? css : ""}>Business</li>
        </Link>
        <Link to="/users">
          <li className={location.pathname === "/users" ? css : ""}>Users</li>
        </Link>
        <Link to="/notification">
          <li className={location.pathname === "/notification" ? css : ""}>Notification</li>
        </Link>
      </ul>
    </div>
  );
};

export default Sidebar;
