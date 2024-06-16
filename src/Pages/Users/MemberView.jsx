import React from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { deleteMember } from "../../Api/memberApi";
import { Link, useNavigate } from "react-router-dom";

const MemberView = ({ setMemberVariant, displayMember, familyID, id }) => {
  const navigate = useNavigate();

  const clickHandler = () => {
    setMemberVariant((prev) => !prev);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to remove this member?")) {
      const memberId = displayMember._id;
      await deleteMember(id, memberId);
      setMemberVariant((prev) => !prev);
      navigate("/family");
    }
  };

  const occupationWithExtraFields = [
    "Govt Job",
    "Private Job",
    "Doctor", 
    "Lawyer",
    "Chartered Accountant",
  ];

  return (
    <div>
      <p onClick={clickHandler} className="my-10 ml-5 flex cursor-pointer">
        <IoArrowBackCircleOutline className="text-2xl" />
        <span className="ml-2">Back</span>
      </p>
      <p className="text-3xl pl-5">{displayMember.name}</p>
      <p className="pl-5">{displayMember.gender + " "+ displayMember.age}</p>

      <div className="w-64 h-64 overflow-hidden rounded-xl mr-6 ml-5">
        <img src={displayMember.profilePic} alt="" className="object-contain w-full h-full" />
      </div>

      <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Family ID:</p>
            <p className="ml-2">{familyID}</p>
        </div>
        <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Location:</p>
            <p className="ml-2">{displayMember.landmark+", "+displayMember.city+", "+displayMember.state}</p>
        </div>

        <div className="flex flex-wrap pl-5 pt-5">
            <p className="font-bold">Contact:</p>
            <p className="ml-2">{(displayMember.contact && displayMember.contactVisibility) ? displayMember.contact : displayMember.contact && !displayMember.contactVisibility ? "Not Visible" : "Not Available"}</p>
        </div>

      <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Blood Group:</p>
        <p className="ml-2">{displayMember.bloodGroup}</p>
      </div>

      <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Education:</p>
        <p className="ml-2">{displayMember.education}</p>
      </div>

      {
        displayMember.educationDetails && (
          <div className="flex-col flex-wrap pl-5 pt-5">
            <p className="font-bold">Education Details:-</p>
            <p><span className="font-semibold">Course:</span> {displayMember.educationDetails.course? displayMember.educationDetails.course : "N/A"}</p>
            <p><span className="font-semibold">Institute:</span> {displayMember.educationDetails.institute? displayMember.educationDetails.institute : "N/A"}</p>
            <p><span className="font-semibold">Field Of Study:</span> {displayMember.educationDetails.fieldOfStudy? displayMember.educationDetails.fieldOfStudy : "N/A"}</p>
            <p><span className="font-semibold">Additional Details:</span> {displayMember.educationDetails.additionalDetails? displayMember.educationDetails.additionalDetails : "N/A"}</p>
          </div>
        )
      }

      <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Occupation:</p>
        <p className="ml-2">{displayMember.occupation}</p>
      </div>
      
      {
        displayMember.occupationDetails && displayMember.occupation === "Business" && (
          <div className="flex-col flex-wrap pl-5 pt-5">
            <p className="font-bold">Business Details:-</p>
            <p><span className="font-semibold">Business Name:</span> {displayMember.occupationDetails.businessName? displayMember.occupationDetails.businessName : "N/A"}</p>
            <p><span className="font-semibold">Business Type:</span> {displayMember.occupationDetails.businessType? displayMember.occupationDetails.businessType : "N/A"}</p>
            <p><span className="font-semibold">Business Address:</span> {displayMember.occupationDetails.businessAddress? displayMember.occupationDetails.businessAddress : "N/A"}</p>
          </div>
        )
      }

      {
        displayMember.occupationDetails && occupationWithExtraFields.includes(displayMember.occupation) && (
          <div className="flex-col flex-wrap pl-5 pt-5">
            <p className="font-bold">Occupation Details:-</p>
            <p><span className="font-semibold">Job Post:</span> {displayMember.occupationDetails.jobPost? displayMember.occupationDetails.jobPost : "N/A"}</p>
            <p><span className="font-semibold">Job Department:</span> {displayMember.occupationDetails.jobDepartment? displayMember.occupationDetails.jobDepartment : "N/A"}</p>
            <p><span className="font-semibold">Job Employer:</span> {displayMember.occupationDetails.jobEmployer? displayMember.occupationDetails.jobEmployer : "N/A"}</p>
            <p><span className="font-semibold">Job Location:</span> {displayMember.occupationDetails.jobLocation? displayMember.occupationDetails.jobLocation : "N/A"}</p>
          </div>
        )
      }

      <div className="flex flex-wrap pl-5 pt-5">
        <p className="font-bold">Karyakarni:</p>
        <p className="ml-2">{displayMember.karyakarni}</p>
      </div>

      <div className="flex">
        <Link
          to="/updateMember"
          state={{
            id,
            familyID,
            memberData:displayMember,
          }}
        >
          <button className="mx-1 mt-8 w-[128px] h-[51px] border-black border-2 hover:bg-black rounded-md text-black hover:text-white font-bold transition-all ease-in-out">
            Update
          </button>
        </Link>
        <button
          onClick={deleteHandler}
          className="mx-1 mt-8 w-[128px] h-[51px] border-red-600 border-2 hover:bg-red-600 rounded-md text-red-600 hover:text-white font-bold transition-all ease-in-out"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default MemberView;
