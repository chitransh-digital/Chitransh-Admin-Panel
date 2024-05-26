import React, { useEffect, useState } from "react";
import { addMember } from "../../Api/memberApi";
import { useNavigate, useLocation } from "react-router-dom";
import { getKaryakarnis } from "../../Api/karyakarniApi";

const UserCreateForm = () => {
  const [familyMember, setFamilyMember] = useState({});
  const [karyakarni, setKaryakarni] = useState([]);
  const navigate = useNavigate();
  const reactLocation = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const { familyID } = reactLocation.state;

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setFamilyMember((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const fetchKaryakarni = async () => {
    const karyakarnis = await getKaryakarnis();
    setKaryakarni(karyakarnis.karyakarni);
  };

  useEffect(() => {
    fetchKaryakarni();
  }, []);

  const createClickHandler = async () => {
    if (window.confirm("Are you sure you want to add this member?")) {
      setIsLoading(true);
      const fID = familyID;
      const memberData = {
        ...familyMember,
        familyID: fID,
      };
      const response = await addMember({ familyID, memberData: memberData });
      if (response.status === 201) {
        alert("Member added successfully");
      } else {
        alert("Couldn't add member. Please try again.");
      }
      setIsLoading(false);
      navigate("/family");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Add Member
        </p>
      </div>
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Name</p>
        <input
          onChange={handleChange("name")}
          className="border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Age</p>
            <input
              type="number"
              onChange={handleChange("age")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Gender</p>
            <select
              onChange={handleChange("gender")}
              className="border-black border-[1px] p-3 w-[19rem]"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Contact</p>
            <input
              type="text"
              onChange={handleChange("contact")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">FamilyID</p>
            <input
              value={familyID}
              contentEditable="false"
              onChange={handleChange("familID")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
          <p className="text-xl mb-2 mt-5">Relation</p>
          <select
            onChange={handleChange("relation")}
            className="border-black border-[1px] p-3 w-[19rem]"
          >
            <option value="">Select Relation</option>
            <option value="Wife">Wife</option>
            <option value="Husband">Husband</option>
            <option value="Son">Son</option>
            <option value="Daughter">Daughter</option>
            <option value="Father">Father</option>
            <option value="Mother">Mother</option>
            <option value="Brother">Brother</option>
            <option value="Sister">Sister</option>
            <option value="Grandmother">Grandmother</option>
            <option value="Grandfather">Grandfather</option>
          </select>
          </div>
        </div>

        <div className="flex gap-[2rem]">
        <div>
          <p className="text-xl mb-2 mt-5">Blood Group</p>
          <select
            onChange={handleChange("bloodGroup")}
            className="border-black border-[1px] p-3 w-[19rem]"
          >
            <option value="">Select Blood Group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>
          <div>
          <p className="text-xl mb-2 mt-5">Occupation</p>
          <select
            onChange={handleChange("occupation")}
            className="border-black border-[1px] p-3 w-[19rem]"
          >
            <option value="">Select Occupation</option>
            <option value="Student">Student</option>
            <option value="Govt Job">Government Job</option>
            <option value="Private Job">Private Job</option>
            <option value="Retired">Retired</option>
            <option value="Business">Business</option>
            <option value="Doctor">Doctor</option>
            <option value="Lawyer">Lawyer</option>
            <option value="Chartered Accountant">Chartered Accountant</option>
            <option value="Not Working">Not Working</option>
            <option value="Housewife">Housewife</option>
          </select>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
          <p className="text-xl mb-2 mt-5">Education</p>
            <select
              onChange={handleChange("education")}
              className="border-black border-[1px] p-3 w-[19rem]"
            >
              <option value="">Select Education</option>
              <option value="Junior School">Junior School</option>
              <option value="High School">High School</option>
              <option value="Higher Secondary School">Higher Secondary School</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelors">Bachelors</option>
              <option value="Masters">Masters</option>
              <option value="PhD">PhD</option>
            </select>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Landmark</p>
            <input
              onChange={handleChange("landmark")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">City</p>
            <input
              onChange={handleChange("city")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">State</p>
            <input
              onChange={handleChange("state")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
        </div>

        <div className="flex gap-[2rem]">
          <div>
          <p className="text-xl mb-2 mt-5">Karyakarni</p>
          <select
              onChange={handleChange("karyakarni")}
              className="border-black border-[1px] p-3 w-[40rem]"
            >
              <option value="">Select Karyakarni</option>
              {karyakarni.map((k) => (
                <option key={k.id} value={k.name}>
                  {k.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xl my-2">Profile Pic</p>
        <input
          onChange={handleChange("profilePic")}
          className="border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <button
          onClick={isLoading ? () => {} : createClickHandler}
          className={`block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Add Member " : <div id="lds-dual-ring" />}
        </button>
      </div>
    </div>
  );
};

export default UserCreateForm;