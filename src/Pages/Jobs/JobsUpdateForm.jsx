import React, { useState } from "react";
import { updateJob } from "../../Api/jobsApi";
import { buildNotificationPayload } from "../../Utils/buildNotificationPayload";
import { sendNotification } from "../../Api/notificationApi";
import { useNavigate, useLocation } from "react-router-dom";

const JobsUpdateForm = () => {
  const reactLocation = useLocation();
  const navigate = useNavigate();
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
  } = reactLocation.state;

  const [job, setJob] = useState({
    businessName,
    contact,
    jobDescription,
    jobTitle,
    location,
    salary,
    requirements: requirements.join(", "),
    id,
    externalLink,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setIsChecked] = useState(false);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setJob((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const updateClickHandler = async () => {
    if (window.confirm("Are you sure you want to edit this job?")) {
      setIsLoading((prev) => true);
      if (isChecked) {
        const notification = buildNotificationPayload("JOB", job);
        try {
          await Promise.all([
            updateJob(id, job),
            sendNotification(notification),
          ]);
        } catch (error) {
          console.error("Error creating job:", error);
        }
      } else {
        await updateJob(id, job);
      }
      navigate("/jobs");
    }
  }; 

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Update Job
        </p>
      </div>
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Job Title</p>
        <input
          value={job.jobTitle}
          onChange={handleChange("jobTitle")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Business Name</p>
        <input
          value={job.businessName}
          onChange={handleChange("businessName")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Location</p>
        <input
          value={job.location}
          onChange={handleChange("location")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Contact</p>
            <input
              value={job.contact}
              onChange={handleChange("contact")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Salary</p>
            <input
              type="number"
              value={job.salary}
              onChange={handleChange("salary")}
              className=" border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>
        <p className="text-xl mb-2 mt-5">Description</p>
        <textarea
          value={job.jobDescription}
          onChange={handleChange("jobDescription")}
          className=" border-black border-[1px] p-2 w-[40rem] h-[10rem]"
        ></textarea>
        <p className="text-xl mb-2 mt-5">
          Requirements
          <span className="text-sm">{" (seperated by commas)"}</span>
        </p>
        <input
          value={job.requirements}
          onChange={handleChange("requirements")}
          className=" border-black border-[1px] p-2 w-[40rem]"
          placeholder="eg. frontend, databases, backend"
        ></input>
        <p className="text-xl mb-2 mt-5">External Link </p>
        <input
          value={job.externalLink}
          onChange={handleChange("externalLink")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <div className="mt-5">
          <input
            className="mr-2"
            type="checkbox"
            id="booleanCheckbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="booleanCheckbox">Notify users about this job</label>
        </div>

        <button
          onClick={isLoading ? () => {} : updateClickHandler}
          className={`block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Update" : <div id="lds-dual-ring" />}
        </button>
      </div>
    </div>
  );
};

export default JobsUpdateForm;
