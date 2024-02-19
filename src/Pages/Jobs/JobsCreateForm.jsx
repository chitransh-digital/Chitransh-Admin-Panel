import React, { useState } from "react";
import { createJob } from "../../utils/jobsApi";

const JobsCreateForm = () => {
  const [job, setJob] = useState({
    businessName: "",
    contact: "",
    jobDescription: "",
    jobTitle: "",
    location: "",
    salary: "",
    requirements: [],
    externalLink: "",
    visible: false,
  });

  const [isLoading, setIsLoading] = useState(false);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    if (input === "requirements") {
      setJob((prev) => ({
        ...prev,
        [input]: e.target.value.split(",").map((item) => item.trim()),
      }));
      return;
    }
    if (input === "salary") {
      setJob((prev) => ({ ...prev, [input]: parseInt(e.target.value) }));
      return;
    }
    setJob((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const createClickHandler = async () => {
    if (window.confirm("Are you sure you want to create this job?")) {
      setIsLoading((prev) => true);
      await createJob(job);
      window.location.reload();
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Create Job
        </p>
      </div>
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Job Title</p>
        <input
          onChange={handleChange("jobTitle")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Business Name</p>
        <input
          onChange={handleChange("businessName")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Location</p>
        <input
          onChange={handleChange("location")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Contact</p>
            <input
              onChange={handleChange("contact")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Salary</p>
            <input
              onChange={handleChange("salary")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>
        <p className="text-xl mb-2 mt-5">Description</p>
        <textarea
          onChange={handleChange("description")}
          className=" border-black border-[1px] p-2 w-[40rem] h-[10rem]"
        ></textarea>
        <p className="text-xl mb-2 mt-5">
          Requirements
          <span className="text-sm">{" (seperated by commas)"}</span>
        </p>
        <input
          onChange={handleChange("requirements")}
          className=" border-black border-[1px] p-2 w-[40rem]"
          placeholder="eg. frontend, databases, backend"
        ></input>
        <p className="text-xl mb-2 mt-5">External Link </p>
        <input
          onChange={handleChange("externalLink")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <button
          onClick={isLoading ? () => {} : createClickHandler}
          className={`block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Create" : <div id="lds-dual-ring" />}
        </button>
      </div>
    </div>
  );
};

export default JobsCreateForm;
