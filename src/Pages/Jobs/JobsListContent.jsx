import React from "react";
import { removeJob, setJobVisible } from "../../utils/jobsApi";

const JobsListContent = ({ item }) => {
  const {
    businessName,
    contact,
    jobDescription,
    jobTitle,
    location,
    salary,
    requirements,
    id
  } = item;
  
  const rejectHandler = async () => {
    if (window.confirm("Are you sure you want to remove this job?")) {
      await removeJob(id);
      window.location.reload();
    }
  };

  const approveHandler = async () => {
    if (window.confirm("Are you sure you want to approve this job?")) {
      await setJobVisible(id);
      window.location.reload();
    }
  };

  return (
    <div className="w-full cursor-pointer border-black border-[0.5px] rounded-lg relative overflow-hidden px-5 hover:py-4 py-3 sm:pt-3 transition-all ease-in-out my-2">
      <div className="flex justify-between">
        <div>
          <p className="text-3xl font-bold">{jobTitle}</p>
          <p className="max-w-[60rem] my-3">{jobDescription}</p>
        </div>
        <div>
          <p>{businessName}</p>
          <p>{location}</p>
          <p className="text-md font-light">{contact}</p>
        </div>
      </div>

      <p className="flex flex-wrap w-[40rem]">
        Requirements:
        {requirements.map((item, idx) => (
          <span key={idx} className="ml-3 text-md font-bold mx-1">
            {item}
          </span>
        ))}
      </p>
      <div className="flex justify-between">
        <p className="mt-6">
          <span className="mr-3">Salary:</span>
          <span className="text-2xl font-bold">Rs. {salary}</span>
        </p>
        <div className="text-right">
          <button
            onClick={approveHandler}
            className="mt-8 ml-5 w-32 py-4 border-green-600 border-2 hover:bg-green-600 rounded-md text-green-600 hover:text-white font-bold transition-all ease-in-out"
          >
            Approve
          </button>
          <button
            onClick={rejectHandler}
            className="mt-8 ml-5 w-32 py-4 border-red-600 border-2 hover:bg-red-600 rounded-md text-red-600 hover:text-white font-bold transition-all ease-in-out"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsListContent;
