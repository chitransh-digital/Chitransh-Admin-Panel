import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { uploadImage, updateKaryakarni } from "../../Api/karyakarniApi";
import KaryakarniMemberForm from "./KaryakarniMemberForm";

const KaryakarniUpdateForm = () => {
  const navigate = useNavigate();
  const reactLocation = useLocation();
  const { id, name, landmark, state, city, logo, designations, members } = reactLocation.state;

  const [isLoading, setIsLoading] = useState(false);
  const [logoImage, setLogoImage] = useState(null);
  const [currentDesignation, setCurrentDesignation] = useState("");
  const [karyakarni, setKaryakarni] = useState({
    id,
    name,
    landmark,
    state,
    city,
    logo,
    designations,
    members: members || [],
  });

  const normalButton = "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton = "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setKaryakarni((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const handleAddDesignation = () => {
    if (currentDesignation.trim()) {
      setKaryakarni((prev) => ({
        ...prev,
        designations: [...prev.designations, currentDesignation.trim()],
      }));
      setCurrentDesignation("");
    }
  };

  const handleRemoveDesignation = (index) => {
    setKaryakarni((prev) => ({
      ...prev,
      designations: prev.designations.filter((_, i) => i !== index),
    }));
  };

  const createClickHandler = async () => {
    if (window.confirm("Are you sure you want to edit this karyakarni?")) {
      setIsLoading((prev) => true);
      let karyakarniData = { ...karyakarni };

      if (logoImage !== null) {
        const imageUrl = await uploadImage(logoImage);
        karyakarniData = { ...karyakarniData, logo: imageUrl };
      }

      await updateKaryakarni(id, karyakarniData);
      setIsLoading(false);
      navigate("/karyakarni");
    }
  };

  const handleImageUpload = (e) => {
    setLogoImage(e.target.files[0]);
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Update Karyakarni
        </p>
      </div>
      <div className="mt-10 ml-5">
        <p className="text-xl mb-2">Name</p>
        <input
          value={karyakarni.name}
          onChange={handleChange("name")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">Landmark</p>
        <input
          value={karyakarni.landmark}
          onChange={handleChange("landmark")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>
        <p className="text-xl mb-2 mt-5">City</p>
        <input
          value={karyakarni.city}
          onChange={handleChange("city")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <p className="text-xl mb-2 mt-5">State</p>
        <input
          value={karyakarni.state}
          onChange={handleChange("state")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <p className="text-xl mb-2 mt-5">Select Logo</p>
        <input onChange={handleImageUpload} type="file"></input>

        <div className="flex items-center text-xl mb-2 mt-5">
          <input
            value={currentDesignation}
            onChange={(e) => setCurrentDesignation(e.target.value)}
            className="border-black border-[1px] p-2 w-[30rem]"
          ></input>
          <button
            onClick={handleAddDesignation}
            className="ml-2 p-2 bg-blue-600 text-white rounded-md"
          >
            Add
          </button>
        </div>
        <ul className="mt-2">
          {karyakarni.designations.map((designation, index) => (
            <li key={index} className="flex items-center mb-1">
              <p className="mr-2">{designation}</p>
              <button
                onClick={() => handleRemoveDesignation(index)}
                className="text-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        <KaryakarniMemberForm
          karyakarniId={id}
          designations={karyakarni.designations}
          members={karyakarni.members}
          setKaryakarni={setKaryakarni}
        />

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

export default KaryakarniUpdateForm;
