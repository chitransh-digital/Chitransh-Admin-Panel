import React, { useEffect, useState } from "react";
import { getJobs } from "../../Api/jobsApi";
import JobsListContent from "./JobsListContent";
import { Link } from "react-router-dom";

const JobsListView = () => {
  const [reload, setReload] = useState(false); 
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const jobs = await getJobs();
    setJobs(jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, [reload]);

  if (!jobs || jobs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full mt-24">
        <div className="flex justify-between">
          <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
            Jobs
          </p>
          <Link to="/createJob">
            <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
              Create Job
            </button>
          </Link>
        </div>
        <ul className="my-5 px-12 sm:flex hidden justify-between font-medium text-[#A7A7A7]">
          <li>Details</li>
          <li>Contact</li>
        </ul>
        {jobs.map((item, idx) => (
          <JobsListContent item={item} reload={reload} setReload={setReload} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default JobsListView;