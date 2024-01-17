import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Appointments from "./Dashboard/Appointments";
import Default from "./Default";
import JobsListView from "./Jobs/JobsListView";

const Dashboard = () => {

  const { pathname } = useLocation()
  let content
  if (pathname === "/") content = <Default />
  else if (pathname === "/feeds") content = <Appointments/>
  else if (pathname === "/jobs") content = <JobsListView />
  else if (pathname === "/family") content = <Appointments />
  else if (pathname === "/business") content = <Appointments />
  else if (pathname === "/users") content = <Appointments />

  return (
    <>
      <div className="relative">
        <Header />
        <div className="flex h-full">
          <div className="bg-white w-[13%] max-w-[20rem] hidden md:block pt-24 px-12 animate__animated animate__fadeInLeft">
            <Sidebar />
          </div>
          <div className="bg-white min-h-[90vh] md:w-[80%] lg:w-[70%] w-full px-4 pb-24">
            {content}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
