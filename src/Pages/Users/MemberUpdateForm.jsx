import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadImage } from "../../Api/feedsApi";
import { updateMember } from "../../Api/memberApi";
import { getKaryakarnis } from "../../Api/karyakarniApi";
import { State, City } from "country-state-city";

const MemberUpdateForm = () => {
  const navigate = useNavigate();
  const [karyakarni, setKaryakarni] = useState([]);
  const reactLocation = useLocation();
  const { id, familyID, memberData } = reactLocation.state;
  const [occupation, setOccupation] = useState("");
  const [education, setEducation] = useState("");
  const [course, setCourse] = useState("");
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [member, setMember] = useState({
    name: memberData.name,
    age: memberData.age,
    gender: memberData.gender,
    contact: memberData.contact,
    contactVisibility: memberData.contactVisibility,
    landmark: memberData.landmark,
    city: memberData.city,
    state: memberData.state,
    familyID: familyID,
    occupation: memberData.occupation,
    relation: memberData.relation,
    karyakarni: memberData.karyakarni,
    bloodGroup: memberData.bloodGroup,
    education: memberData.education,
    profilePic: memberData.profilePic,
  });

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    const value = e.target.value;
    setMember((prev) => ({ ...prev, [input]: e.target.value }));
    if (input === "occupation") {
      setOccupation(value);
    }
    if (input === "education") {
      setEducation(value);
    }
    if (input === "course") {
      setCourse(value);
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
    if (member.state) {
      const indianCities = City.getCitiesOfState("IN", member.state);
      setCities(indianCities);
    }
  }, [member.state]);

  const validateFamilyFields = (familyMember) => {
    const missingFields = [];
    if (familyMember.name === "") missingFields.push("Name");
    if (familyMember.age === "") missingFields.push("Age");
    if (familyMember.gender === "") missingFields.push("Gender");
    if (familyMember.bloodGroup === "") missingFields.push("Blood Group");
    if (familyMember.occupation === "") missingFields.push("Occupation");
    if (familyMember.education === "") missingFields.push("Education");
    if (familyMember.landmark === "") missingFields.push("Landmark");
    if (familyMember.state === "") missingFields.push("State");
    if (familyMember.city === "") missingFields.push("City");
    if (familyMember.karyakarni === "") missingFields.push("Karyakarni");
    if (familyMember.relation === "") missingFields.push("Relation");

    return missingFields;
  }

  const createClickHandler = async () => {
    console.log(id, memberData._id, member)
    const missingFields = validateFamilyFields(member);
    if (missingFields && missingFields.length > 0) {
      alert(`Please fill the following fields: ${missingFields.join(", ")}`);
    }
    else if (window.confirm("Are you sure you want to edit this member?")) {
      setIsLoading((prev) => true);
      if (image !== null) {
        const imageUrl = await uploadImage(image);
        const memberWithImage = { ...member, profilePic: imageUrl };
        await updateMember(id, memberData._id, memberWithImage);
      } else {
        await updateMember(id, memberData._id, member);
      }
      navigate("/family",);
    }
  };

  const handleImageUpload = (e) => {
    setImage((prev) => e.target.files[0]);
  };

  const occupationWithExtraFields = [
    "Govt Job",
    "Private Job",
    "Doctor",
    "Lawyer",
    "Chartered Accountant",
  ]

  const educationWithExtraFields = ["Bachelors", "Masters", "PhD"];

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Update Member
        </p>
      </div>
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Name</p>
        <input
        value={member.name}
          onChange={handleChange("name")}
          className="border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <div className="flex gap-[2rem]">
          <div>
            <p className="text-xl mb-2 mt-5">Age</p>
            <input
              type="number"
              value={member.age}
              onChange={handleChange("age")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Gender</p>
            <select
              value={member.gender}
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
              value={member.contact}
              onChange={handleChange("contact")}
              className="border-black border-[1px] p-2 w-[19rem]"
            ></input>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">Contact Visibility</p>
            <select
            value={member.contactVisibility}
            onChange={handleChange("contactVisibility")}
            className="border-black border-[1px] p-3 w-[19rem]"
          >
            <option value="true">Show</option>
            <option value="false">Hide</option>
          </select>
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
            value={member.relation}
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
            value={member.bloodGroup}
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
              <option value="Not Known">Not Known</option>
            </select>
          </div>

          <div>
          <p className="text-xl mb-2 mt-5">Occupation</p>
          <select
          value={member.occupation}
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

        {occupationWithExtraFields.includes(occupation) && (
            <div>
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
              </div>
              <div className="flex gap-[2rem]">
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
            </div>
            
          )}
          {occupation === "Business" && (
            <div>
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

        </div>

            {educationWithExtraFields.includes(education) && (
              <div>
                <div className="flex gap-[2rem]"> 
                    {education === "Bachelors" && (
                      <div>
                      <p className="text-xl mb-2 mt-5">Course</p>
                      <select 
                        onChange={handleChange("course")}
                        className="border-black border-[1px] p-3 w-[19rem]"
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
                        <option value="other">other</option>
                      </select>
                    </div>
                    )}
                    {education === "Masters" && (
                      <div>
                      <p className="text-xl mb-2 mt-5">Course</p>
                      <select 
                        onChange={handleChange("course")}
                        className="border-black border-[1px] p-3 w-[19rem]"
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
                        <option value="other">other</option>
                      </select>
                    </div>
                    )}
                    {course === "other" && (
                      <div>
                        <p className="text-xl mb-2 mt-5">Other Course</p>
                        <input
                          onChange={handleChange("course")}
                          className="border-black border-[1px] p-2 w-[19rem]"
                        ></input>
                      </div>
                    )} 
                    <div>
                    <p className="text-xl mb-2 mt-5">Field Of Study</p>
                    <input
                      onChange={handleChange("fieldOfStudy")}
                      className="border-black border-[1px] p-2 w-[19rem]"
                    ></input>
                  </div>
                </div>
                <div className="flex gap-[2rem]">
                <div>
                  <p className="text-xl mb-2 mt-5">Institute</p>
                  <input
                    onChange={handleChange("institute")}
                    className="border-black border-[1px] p-2 w-[19rem]"
                  ></input>
                </div>
                <div>
                  <p className="text-xl mb-2 mt-5">Additional Details</p>
                  <input
                    onChange={handleChange("additionalDetails")}
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
              value={member.state}
              onChange={handleChange("state")}
              className="border-black border-[1px] p-2 w-[19rem]"
            >
              <option value="">Select State</option>
              {states && states.map((state) => (
                <option key={state.isoCode} value={state.isoCode}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-xl mb-2 mt-5">City</p>
            <select
              value={member.city}
              onChange={handleChange("city")}
              className="border-black border-[1px] p-2 w-[19rem]"
              disabled={!member.state}
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
              value={member.karyakarni}
              onChange={handleChange("karyakarni")}
              className="border-black border-[1px] p-3 w-[40rem]"
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

        <p className="text-xl my-2">Profile Pic</p>
        <input
          type="file"
          onChange={handleImageUpload}
        ></input>


        <button
          onClick={isLoading ? () => {} : createClickHandler}
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

export default MemberUpdateForm;
