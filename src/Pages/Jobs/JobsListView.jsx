import React, { useEffect, useState } from "react";
import { getJobs } from "../../utils/jobsApi";
import JobsListContent from "./JobsListContent";

const JobsListView = () => {
  const [jobs, setJobs] = useState([]);

  const fetchJobs = async () => {
    const jobs = await getJobs();
    setJobs(jobs);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (jobs.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full mt-24">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">Jobs</p>
        <ul className="my-5 px-12 sm:flex hidden justify-between font-medium text-[#A7A7A7]">
          <li>Details</li>
          <li>Contact</li>
        </ul>
        {jobs.map((item, idx) => (
          <JobsListContent item={item} key={idx} />
        ))}
      </div>
    </div>
  );
};

export default JobsListView;
