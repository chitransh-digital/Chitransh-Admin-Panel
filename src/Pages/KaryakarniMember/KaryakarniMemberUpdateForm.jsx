import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadImage, updateKaryakarniMember } from "../../Api/karyakarniApi";

const KaryakarniMemberUpdateForm = () => {
  const navigate = useNavigate();
  const reactLocation = useLocation();
  const {
    id,
    designations,
    memberData,
  } = reactLocation.state;

  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [selectedDesignations, setSelectedDesignations] = useState([...memberData.designations]);
  const [karyakarniMember, setKaryakarniMember] = useState({
    name:memberData.name,
    familyID: memberData.familyID,
    contact: memberData.contact,
    designations: [...memberData.designations],
    profilePic: memberData.profilePic,
    karyakarni: memberData.karyakarni,
  });

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (e) => {
    if(e.target) {
      const { name, value } = e.target;
      setKaryakarniMember((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveDesignation = (designation) => {
    setSelectedDesignations(selectedDesignations && selectedDesignations.filter((d) => d !== designation));
    setKaryakarniMember((prev) => ({ ...prev, designations: selectedDesignations.filter((d) => d !== designation) }));
  };

  const handleDesignationsChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value);
    setSelectedDesignations(selectedOptions);
    setKaryakarniMember((prev) => ({ ...prev, designations: selectedOptions }));
  };

  const validateKaryakarniFields = (karyakarniMember) => {
    const missingFields = [];
    if (karyakarniMember.name === "") missingFields.push("Name");
    if (karyakarniMember.designations.length === 0) missingFields.push("Designations");

    return missingFields;
  }

  const createClickHandler = async () => {
    const missingFields = validateKaryakarniFields(karyakarniMember);
    if (missingFields && missingFields.length > 0) {
      alert(`You must enter all the required fields: ${missingFields.join(", ")}`);
    }
    else if (window.confirm("Are you sure you want to edit this karyakarni?")) {
      setIsLoading(true);
      
      let karyakarniMemberData = { ...karyakarniMember };

      if (image !== null) {
        const imageUrl = await uploadImage(image);
        karyakarniMemberData = { ...karyakarniMemberData, profilePic: imageUrl };
      }

      await updateKaryakarniMember(id, memberData._id, karyakarniMemberData);
      setIsLoading(false);
      navigate("/karyakarni");
    }
  };

  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Update Karyakarni Member
        </p>
      </div>
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Name</p>
        <input
          name="name"
          value={karyakarniMember.name}
          onChange={handleChange}
          className="border-black border-[1px] p-2 w-[40rem]"
        />

        <p className="text-xl mb-2 mt-5">Family ID</p>
        <input
          name="familyID"
          contentEditable
          value={karyakarniMember.familyID}
          onChange={handleChange}
          className="border-black border-[1px] p-2 w-[40rem]"
        />

        <p className="text-xl mb-2 mt-5">Contact</p>
        <input
          name="contact"
          type="text"
          value={karyakarniMember.contact}
          onChange={handleChange}
          className="border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <p className="text-xl mb-2 mt-5">Profile Picture</p>
        <input onChange={handleImageUpload} type="file" />

        <p className="text-xl mb-2 mt-5">Designations</p>
        <div className="flex items-center">
        </div>
        <select
          multiple
          value={selectedDesignations}
          onChange={handleDesignationsChange}
          className="border-black border-[1px] p-2 w-[40rem]"
        >
          {designations && designations.map((designation, index) => (
            <option key={index} value={designation}>
              {designation}
            </option>
          ))}
        </select>
        <ul className="mt-2">
          {selectedDesignations && selectedDesignations.map((designation, index) => (
            <li key={index} className="flex items-center mb-1">
              <span className="mr-2">{designation}</span>
              <button
                onClick={() => handleRemoveDesignation(designation)}
                className="text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

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

export default KaryakarniMemberUpdateForm;
