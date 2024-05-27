import React, { useEffect, useState } from "react";
import { addMember } from "../../Api/memberApi";
import { useNavigate } from "react-router-dom";
import { getKaryakarnis } from "../../Api/karyakarniApi";
import { State, City } from "country-state-city";

const FamilyCreateForm = () => {
  const [familyHead, setFamilyHead] = useState({});
  const [karyakarni, setKaryakarni] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [occupation, setOccupation] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    const value = e.target.value;
    setFamilyHead((prev) => ({ ...prev, [input]: e.target.value }));
    if (input === "occupation") {
      setOccupation(value);
    }
  };

  const fetchKaryakarni = async () => {
    const karyakarnis = await getKaryakarnis();
    setKaryakarni(karyakarnis.karyakarni);
  };

  useEffect(() => {
    fetchKaryakarni();
  }, []);

  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
  }, []);

  useEffect(() => {
    if (familyHead.state) {
      const indianCities = City.getCitiesOfState("IN", karyakarni.state);
      setCities(indianCities);
    }
  }, [familyHead.state]);

  const createFamilyId = (name, contact) => {
    const firstThreeLetters = name.slice(0, 3).toUpperCase();
    const lastThreeDigits = contact.slice(-3);
    return `CH${firstThreeLetters}${lastThreeDigits}`;
  };

  const createClickHandler = async () => {
    if (window.confirm("Are you sure you want to create this family?")) {
      setIsLoading(true);
      const familyID = createFamilyId(familyHead.name, familyHead.contact);
      const headMemberData = {
        ...familyHead,
        relation: "head",
        familyID,
      };
      const response = await addMember({ familyID, memberData: headMemberData });
      if (response.status === 201) {
        alert("Family created successfully");
      } else {
        alert("Couldn't create family. Please try again.");
      }
      setIsLoading(false);
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
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Create Family
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

        <div>
          {occupationWithExtraFields.includes(occupation) && (
            <div className="flex gap-[2rem]">
              <div>
                <p className="text-xl mb-2 mt-5">Job Post</p>
                <input
                  onChange={handleChange("jobPost")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                ></input>
              </div>
              <div>
                <p className="text-xl mb-2 mt-5">Job Department</p>
                <input
                  onChange={handleChange("jobDepartment")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                ></input>
              </div>
              <div>
                <p className="text-xl mb-2 mt-5">Job Employer</p>
                <input
                  onChange={handleChange("jobEmployer")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                ></input>
              </div>
              <div>
                <p className="text-xl mb-2 mt-5">Job Location</p>
                <input
                  onChange={handleChange("jobLocation")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                ></input>
              </div>
            </div>
          )}
          {occupation === "Business" && (
            <div className="flex gap-[2rem]">
              <div>
                <p className="text-xl mb-2 mt-5">Business Name</p>
                <input
                  onChange={handleChange("businessName")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                ></input>
              </div>
              <div>
                <p className="text-xl mb-2 mt-5">Business Type</p>
                <input
                  onChange={handleChange("businessType")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                ></input>
              </div>
              <div>
                <p className="text-xl mb-2 mt-5">Business Address</p>
                <input
                  onChange={handleChange("businessAddress")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                ></input>
              </div>
            </div>
          )}
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
          <p className="text-xl mb-2 mt-5">State</p>
          <select
            onChange={handleChange("state")}
            className="border-black border-[1px] p-2 w-[19rem]"
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>
          </div>
          <div>
          <p className="text-xl mb-2 mt-5">City</p>
          <select
            onChange={handleChange("city")}
            className="border-black border-[1px] p-2 w-[19rem]"
            disabled={!karyakarni.state}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
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
          {!isLoading ? "Create Family " : <div id="lds-dual-ring" />}
        </button>
      </div>
    </div>
  );
};

export default FamilyCreateForm;