import React, { useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import { addKaryakarniMember, uploadImage } from "../../Api/karyakarniApi";

const KaryakarniMemberForm = () => {
  const relocation = useLocation();
  const { id, karyakarni, designations} = relocation.state;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [member, setMember] = useState({
    name: "",
    familyID: "",
    contact: "",
    profilePic: "",
    designations: [],
    karyakarni: karyakarni,
  });

  const normalButton = "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton = "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleMemberChange = (input) => (e) => {
    e.preventDefault();
    setMember((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const handleDesignationsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setMember((prev) => ({ ...prev, designations: selectedOptions }));
  };

  const validateMemberFields = (member) => {
    const missingFields = [];
    if (!member.name.trim()) missingFields.push("Name");
    if (!member.contact.trim()) missingFields.push("Contact");
    if (member.designations.length === 0) missingFields.push("Designations");

    return missingFields;
  }

  const handleAddMember = async () => {
    const missingFields = validateMemberFields(member);
    if (missingFields && missingFields.length > 0) {
      alert(`You must enter all the required fields: ${missingFields.join(", ")}`);
    }
    else if (window.confirm("Are you sure you want to add this member?")) {
      setIsLoading(true);
      let profilePicUrl = "";
      if (member.profilePic) {
        profilePicUrl = await uploadImage(member.profilePic);
      }
      const newMember = {
        ...member,
        profilePic: profilePicUrl,
      };
      const response = await addKaryakarniMember(id, newMember);
      if (response) {
        alert("Member added successfully");
      }
      else {
        alert("Failed to add member");
      }
      setIsLoading(false);
      navigate("/karyakarni");
    }
  };

  const handleMemberImageUpload = (e) => {
    setMember((prev) => ({ ...prev, profilePic: e.target.files[0] }));
  };

  return (
    <div className="mt-10">
      <h2 className="text-3xl font-bold mb-2">Add Member</h2>
      <br />
      <p className="text-xl mb-2">Member Name</p>
      <input
        onChange={handleMemberChange("name")}
        className="border-black border-[1px] p-2 w-[40rem]"
      ></input>

      <p className="text-xl mb-2 mt-5">Family ID</p>
      <input
        onChange={handleMemberChange("familyID")}
        className="border-black border-[1px] p-2 w-[40rem]"
      ></input>

      <p className="text-xl mb-2 mt-5">Contact</p>
        <input
          type="text"
          onChange={handleMemberChange("contact")}
          className="border-black border-[1px] p-2 w-[40rem]"
        ></input>

      <p className="text-xl mb-2 mt-5">Profile Picture</p>
      <input onChange={handleMemberImageUpload} type="file"></input>

      <p className="text-xl mb-2 mt-5">Designations</p>
      <select
        multiple={true}
        onChange={handleDesignationsChange}
        className="border-black border-[1px] p-2 w-[40rem]"
      >
        {designations && designations.map((designation, index) => (
          <option key={index} value={designation}>
            {designation}
          </option>
        ))}
      </select>
      <button
          onClick={isLoading ? () => {} : handleAddMember}
          className={`block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
            isLoading ? loadingButton : normalButton
          }`}
        >
          {!isLoading ? "Add Member " : <div id="lds-dual-ring" />}
        </button>
    </div>
  );
};

export default KaryakarniMemberForm;