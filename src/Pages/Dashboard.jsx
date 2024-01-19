import { useLocation } from "react-router-dom";
import Header from "../Components/Header";
import Sidebar from "../Components/Sidebar";
import Appointments from "./Feeds/FeedListView";
import JobsListView from "./Jobs/JobsListView";
import NotificationView from "./Notification/NotificationView";

const Dashboard = () => {
  const { pathname } = useLocation();
  let content = null;
  if (pathname === "/feeds") content = <Appointments />;
  else if (pathname === "/jobs") content = <JobsListView />;
  else if (pathname === "/notification") content = <NotificationView />;
  // else if (pathname === "/family") content = <FamilyView />;
  // else if (pathname === "/business") content = <Appointments />;
  // else if (pathname === "/users") content = <Appointments />;

  return (
    <>
      <div className="relative">
        <Header />
        <div className="flex h-full">
          <div className="bg-white w-[13%] max-w-[20rem] hidden md:block pt-24 px-12 animate__animated animate__fadeInLeft">
            <Sidebar />
          </div>
          <div className="bg-white min-h-[90vh] md:w-[80%] lg:w-[70%] w-full px-4 pb-24">
            {content === null ? (
              <center className="pt-[10rem]">
                <div className="text-[2rem] font-bold">
                  Welcome to the Admin Dashboard!
                </div>
              </center>
            ) : (
              content
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
