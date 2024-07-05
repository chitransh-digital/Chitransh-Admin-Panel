import React, { useEffect, useState } from "react";
import { getJobs } from "../../Api/jobsApi";
import JobsListContent from "./JobsListContent";
import { Link } from "react-router-dom";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Pagination } from "flowbite-react";

const JobsListView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [reload, setReload] = useState(false); 
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobs = async (currentPage) => {
    const jobs = await getJobs(currentPage);
    setJobs(jobs.jobs);
    setFilteredJobs(jobs.jobs);
    if (jobs.totalPages) setTotalPages(jobs.totalPages);
    else setTotalPages(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    fetchJobs(currentPage);
  }, [reload, currentPage]);

  const searchByTitle = () => {
    if (searchTerm.trim() === "") {
      setFilteredJobs(jobs);
    } else {
      const filteredJobs = jobs && jobs.filter((job) =>
        job.jobTitle && job.jobTitle.includes(searchTerm)
      );
      setFilteredJobs(filteredJobs);
    }
  };

  const resetSearch = () => {
    setSearchTerm("");
    setFilteredJobs(jobs);
  };

  return (
    <div className="w-full">
      <div className="w-full mt-24">
        <div className="flex justify-between items-center">
          <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
            Jobs
          </p>
          <Link to="/createJob">
            <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
              Create Job
            </button>
          </Link>
        </div>
        <div className="flex justify-between items-center mb-5">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search by title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 p-2 rounded-md w-48 mr-5"
            />
            <button
              onClick={searchByTitle}
              className="bg-blue-600 text-white p-2 rounded-md w-32 hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
          {searchTerm.trim() !== "" && (
            <p onClick={resetSearch} className="my-10 ml-5 flex cursor-pointer">
            <IoArrowBackCircleOutline className="text-2xl" />
            <span className="ml-2">Back</span>
            </p>
          )}
        </div>
        <ul className="my-5 px-12 sm:flex hidden justify-between font-medium text-[#A7A7A7]">
          <li>Details</li>
          <li>Contact</li>
        </ul>
        {filteredJobs && filteredJobs.map((item, idx) => (
          <JobsListContent item={item} reload={reload} setReload={setReload} key={idx} />
        ))}
        <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
      </div>
    </div>
  );
};

export default JobsListView;
