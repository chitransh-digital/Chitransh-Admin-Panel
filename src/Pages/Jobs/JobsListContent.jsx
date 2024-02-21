import React from "react";
import { removeJob } from "../../Api/jobsApi";
import { Link } from "react-router-dom";

const JobsListContent = ({ item }) => {
  const {
    businessName,
    contact,
    jobDescription,
    jobTitle,
    location,
    salary,
    requirements,
    id,
    externalLink,
  } = item;

  const rejectHandler = async () => {
    if (window.confirm("Are you sure you want to remove this job?")) {
      await removeJob(id);
      window.location.reload();
    }
  };

  return (
    <div className="w-full cursor-pointer border-black border-[0.5px] rounded-lg relative overflow-hidden px-5 py-3 sm:pt-3 transition-all ease-in-out my-2">
      <div className="flex justify-between">
        <div>
          <a href={externalLink} target="blank">
            <p className="text-3xl font-bold underline hover:text-blue-500">
              {jobTitle}
            </p>
          </a>
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
          <span className="ml-3 text-md font-bold mx-1">{item}</span>
        ))}
      </p>
      <div className="flex justify-between">
        <p className="mt-6">
          <span className="mr-3">Salary:</span>
          <span className="text-2xl font-bold">Rs. {salary}</span>
        </p>
        <div className="text-right">
          <Link
            to="/updateJob"
            state={{
              businessName,
              contact,
              jobDescription,
              jobTitle,
              location,
              salary,
              requirements,
              id,
              externalLink,
            }}
          >
            <button className="mt-8 ml-5 w-32 py-4 border-green-600 border-2 hover:bg-green-600 rounded-md text-green-600 hover:text-white font-bold transition-all ease-in-out">
              Edit
            </button>
          </Link>
          <button
            onClick={rejectHandler}
            className="mt-8 ml-5 w-32 py-4 border-red-600 border-2 hover:bg-red-600 rounded-md text-red-600 hover:text-white font-bold transition-all ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsListContent;
