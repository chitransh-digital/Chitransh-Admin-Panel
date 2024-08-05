import React, { useEffect, useState } from "react";
import { createFamily } from "../../Api/memberApi";
import { useNavigate } from "react-router-dom";
import { getAllKaryakarnis } from "../../Api/karyakarniApi";
import { State, City } from "country-state-city";

const FamilyCreateForm = () => {
  const [familyHead, setFamilyHead] = useState({
    name: "",
    age: "",
    contact: "",
    contactVisibility: true,
    gender: "",
    bloodGroup: "",
    occupation: "",
    occupationDetails: {},
    education: "",
    educationDetails: {},
    landmark: "",
    karyakarni: "",
    profilePic: "",
    state: "",
    city:"",
  });
  const [image, setImage] = useState(null);
  const [otherCourse, setOtherCourse] = useState("");
  const [karyakarni, setKaryakarni] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [stateCode, setStateCode] = useState("");
  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

    const handleChange = (input, nested) => (e) => {
      e.preventDefault();
      let value = e.target.value;
      if (input === "contactVisibility") {
        value = value === "true";
      }
      if (input === "state" && value !== "") {
        const selectedState = JSON.parse(value);
        setStateCode(selectedState.isoCode);
        setFamilyHead((prev) => ({ ...prev, [input]: selectedState.name }));
      } else if (nested) {
        setFamilyHead((prev) => ({
          ...prev,
          [nested]: {
            ...prev[nested],
            [input]: value
          }
        }));
      } else {
        setFamilyHead((prev) => ({ ...prev, [input]: value }));
      }
    };

    const handleOtherCourse = (e) => {
      setOtherCourse(e.target.value);
      setFamilyHead((prev) => ({
        ...prev,
        educationDetails: {
          ...prev.educationDetails,
          course: e.target.value?.trim() === "" ? "Other" : e.target.value
        }
      }));
    };
  

  const fetchKaryakarni = async () => {
    const karyakarnis = await getAllKaryakarnis();
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
      const indianCities = City.getCitiesOfState("IN", stateCode);
      setCities(indianCities);
    }
  }, [familyHead.state, stateCode]);

  const createFamilyId = (name, contact) => {
    const firstThreeLetters = name.slice(0, 3).toUpperCase();
    const lastThreeDigits = contact.slice(-3);
    return `CH${firstThreeLetters}${lastThreeDigits}`;
  };

  const validateFamilyFields = (familyHead) => {
    const missingFields = [];
    if (familyHead.name === "") missingFields.push("Name");
    if (familyHead.age === "") missingFields.push("Age");
    if (familyHead.gender === "") missingFields.push("Gender");
    if (familyHead.contact === "") missingFields.push("Contact");
    if (familyHead.bloodGroup === "") missingFields.push("Blood Group");
    if (familyHead.occupation === "") missingFields.push("Occupation");
    if (familyHead.education === "") missingFields.push("Education");
    if (familyHead.state === "") missingFields.push("State");
    if (familyHead.city === "") missingFields.push("City");

    return missingFields;
  }

  const createClickHandler = async () => {
    const missingFields = validateFamilyFields(familyHead);
    if (missingFields && missingFields.length > 0) {
      alert(`Please fill the following fields: ${missingFields.join(", ")}`);
    }
    else if (familyHead.contact.length !== 10) {
      alert("Contact number must be of 10 digits");
    }
    else if (window.confirm("Are you sure you want to create this family?")) {
      setIsLoading(true);
      const familyID = createFamilyId(familyHead.name, familyHead.contact);
      const headMemberData = {
        ...familyHead,
        relation: "Head",
      };
      let response;
      const formData = new FormData();
      if (image !== null) {
        formData.append('file', image);
      }
      response = await createFamily({ familyID, memberData: headMemberData, formData: formData });
  
      if (response.status === 201) {
        alert("Family created successfully");
      } else {
        alert("Couldn't create family. Please try again.");
      }
      setIsLoading(false);
      navigate("/family");
    }
  };

  const handleIMageUpload = (e) => {
    setImage((prev) => e.target.files[0]);
  };

  const occupationWithExtraFields = [
    "Govt Job",
    "Private Job",
    "Doctor", 
    "Lawyer",
    "Chartered Accountant",
  ];

  const educationWithExtraFields = ["Bachelors", "Masters", "PhD"];

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
              className="border-black border-[1px] p-2 w-[19rem]"
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
          <div>
            <p className="text-xl mb-2 mt-5">Contact Visibility</p>
            <select
            onChange={handleChange("contactVisibility")}
            className="border-black border-[1px] p-2 w-[19rem]"
          >
            <option value="true" defaultChecked>Show</option>
            <option value="false">Hide</option>
          </select>
          </div>
        </div>

        <div className="flex gap-[2rem]">
        <div>
          <p className="text-xl mb-2 mt-5">Blood Group</p>
          <select
            onChange={handleChange("bloodGroup")}
            className="border-black border-[1px] p-2 w-[19rem]"
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
            <option value="Not Known">Not Known</option>
          </select>
        </div>
          <div>
          <p className="text-xl mb-2 mt-5">Occupation</p>
          <select
            onChange={handleChange("occupation")}
            className="border-black border-[1px] p-2 w-[19rem]"
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

        {occupationWithExtraFields.includes(familyHead.occupation) && (
          <div>
            <div className="flex gap-[2rem]">
              <div>
                <p className="text-xl mb-2 mt-5">Job Post</p>
                <input
                  onChange={handleChange("jobPost", "occupationDetails")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                />
              </div>
              <div>
                <p className="text-xl mb-2 mt-5">Job Department</p>
                <input
                  onChange={handleChange("jobDepartment", "occupationDetails")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                />
              </div>
            </div>
            <div className="flex gap-[2rem]">
              <div>
                <p className="text-xl mb-2 mt-5">Job Employer</p>
                <input
                  onChange={handleChange("jobEmployer", "occupationDetails")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                />
              </div>
              <div>
                <p className="text-xl mb-2 mt-5">Job Location</p>
                <input
                  onChange={handleChange("jobLocation", "occupationDetails")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                />
              </div>
            </div>
          </div>
        )}

        {familyHead.occupation === "Business" && (
          <div>
            <div className="flex gap-[2rem]">
              <div>
                <p className="text-xl mb-2 mt-5">Business Name</p>
                <input
                  onChange={handleChange("businessName", "occupationDetails")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                />
              </div>
              <div>
                <p className="text-xl mb-2 mt-5">Business Type</p>
                <input
                  onChange={handleChange("businessType", "occupationDetails")}
                  className="border-black border-[1px] p-2 w-[19rem]"
                />
              </div>
            </div>
            <div>
              <p className="text-xl mb-2 mt-5">Business Address</p>
              <input
                onChange={handleChange("businessAddress", "occupationDetails")}
                className="border-black border-[1px] p-2 w-[40rem]"
              />
            </div>
          </div>
        )}

        <div className="flex gap-[2rem]">
          <div>
          <p className="text-xl mb-2 mt-5">Education</p>
          <select
            onChange={handleChange("education")}
            className="border-black border-[1px] p-2 w-[19rem]"
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

        </div>

            {educationWithExtraFields.includes(familyHead.education) && (
              <div>
                <div className="flex gap-[2rem]"> 
                    {familyHead.education === "Bachelors" && (
                      <div>
                      <p className="text-xl mb-2 mt-5">Course</p>
                      <select 
                        onChange={handleChange("course", "educationDetails")}
                        className="border-black border-[1px] p-2 w-[19rem]"
                      >
                        <option value="">Select Course</option>
                        <option value="BTech">BTech</option>
                        <option value="BSc">BSc</option>
                        <option value="BCom">BCom</option>
                        <option value="BA">BA</option>
                        <option value="BBA">BBA</option>
                        <option value="BCA">BCA</option>
                        <option value="BEd">BEd</option>
                        <option value="BPharma">BPharma</option>
                        <option value="BDS">BDS</option>
                        <option value="BAMS">BAMS</option>
                        <option value="BHMS">BHMS</option>
                        <option value="LLB">LLB</option>
                        <option value="BHM">BHM</option>
                        <option value="BHMCT">BHMCT</option>
                        <option value="Ded">Ded</option>
                        <option value="BA/LLB">BA/LLB</option>
                        <option value="BCom/LLB">BCom/LLB</option>
                        <option value="CS">CS</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    )}
                    {familyHead.education === "Masters" && (
                      <div>
                      <p className="text-xl mb-2 mt-5">Course</p>
                      <select 
                        onChange={handleChange("course", "educationDetails")}
                        className="border-black border-[1px] p-2 w-[19rem]"
                      >
                        <option value="">Select Course</option>
                        <option value="MTech">MTech</option>
                        <option value="MSc">MSc</option>
                        <option value="MCom">MCom</option>
                        <option value="MA">MA</option>
                        <option value="MBA">MBA</option>
                        <option value="MCA">MCA</option>
                        <option value="MPharma">MPharma</option>
                        <option value="MDS">MDS</option>
                        <option value="LLM">LLM</option>
                        <option value="MA/LLM">MA/LLM</option>
                        <option value="MCom/LLM">MCom/LLM</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    )}
                    {
                      familyHead.educationDetails && (familyHead.educationDetails.course === "Other" || otherCourse) && (
                        <div>
                          <p className="text-xl mb-2 mt-5">Other Course</p>
                          <input
                            onChange={handleOtherCourse}
                            className="border-black border-[1px] p-2 w-[19rem]"
                          ></input>
                        </div>
                      )
                    }
                    <div>
                    <p className="text-xl mb-2 mt-5">Field Of Study</p>
                    <input
                      onChange={handleChange("fieldOfStudy", "educationDetails")}
                      className="border-black border-[1px] p-2 w-[19rem]"
                    ></input>
                  </div>
                </div>
                <div className="flex gap-[2rem]">
                <div>
                  <p className="text-xl mb-2 mt-5">Institute</p>
                  <input
                    onChange={handleChange("institute", "educationDetails")}
                    className="border-black border-[1px] p-2 w-[19rem]"
                  ></input>
                </div>
                <div>
                  <p className="text-xl mb-2 mt-5">Additional Details</p>
                  <input
                    onChange={handleChange("additionalDetails", "educationDetails")}
                    className="border-black border-[1px] p-2 w-[19rem]"
                  ></input>
                </div>
                </div>
              </div>
            )}
       

          <div>
            <p className="text-xl mb-2 mt-5">Landmark</p>
            <input
              onChange={handleChange("landmark")}
              className="border-black border-[1px] p-2 w-[40rem]"
            ></input>
          </div>


        <div className="flex gap-[2rem]">
          <div>
          <p className="text-xl mb-2 mt-5">State</p>
          <select
            onChange={handleChange("state")}
            className="border-black border-[1px] p-2 w-[19rem]"
          >
            <option value="">Select State</option>
            {states && states.map((state) => (
              <option key={state.isoCode} value={JSON.stringify({ isoCode: state.isoCode, name: state.name })}>
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
          >
            <option value="">Select City</option>
            {cities && cities.map((city) => (
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
              className="border-black border-[1px] p-2 w-[40rem]"
            >
              <option value="" className="text-lg">Select Karyakarni</option>
              {karyakarni && karyakarni.map((k) => (
                <option key={k.id} value={k.name} className="text-lg">
                  {k.name} - {k.level === "India" ? "All India" : k.level === "State" ? k.state : k.city + ", " + k.state}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="text-xl my-2">Select Profile Pic</p>
        <input
          type="file"
          onChange={handleIMageUpload}
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