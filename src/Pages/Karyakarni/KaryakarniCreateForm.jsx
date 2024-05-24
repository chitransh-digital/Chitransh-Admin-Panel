import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createKaryakarni, uploadImage } from "../../Api/karyakarniApi";

const KaryakarniCreateForm = () => {
  const navigate = useNavigate();
  const [karyakarni, setKaryakarni] = useState({
    name: "",
    landmark: "",
    city: "",
    state: "",
    logo: "",
    designations: [],
  });

  const [logo,setLogo] = useState(null);
  const [currentDesignation, setCurrentDesignation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const handleChange = (input) => (e) => {
    e.preventDefault();
    setKaryakarni((prev) => ({ ...prev, [input]: e.target.value }));
  };

  const handleLogoUpload = (e) => {
    setLogo((prev) => e.target.files[0]);
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
    if (window.confirm("Are you sure you want to create this karyakarni?")) {
      setIsLoading(prev => true);
      if(logo !== null){
        const logoUrl = await uploadImage(logo);
        const karyakarniWithLogo = {...karyakarni, logo: logoUrl};
        await createKaryakarni(karyakarniWithLogo);
      } else {
        await createKaryakarni(karyakarni);
      }
      setIsLoading(prev => false);
      navigate("/karyakarni");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full mt-10">
        <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
          Create Karyakarni
        </p>
      </div>
      <div className="mt-10 ml-5">

        <p className="text-xl mb-2">Name</p>
        <input
          onChange={handleChange("name")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <p className="text-xl mb-2 mt-5">Landmark</p>
        <input
          onChange={handleChange("landmark")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <p className="text-xl mb-2 mt-5">City</p>
        <input
          onChange={handleChange("city")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <p className="text-xl mb-2 mt-5">State</p>
        <input
          onChange={handleChange("state")}
          className=" border-black border-[1px] p-2 w-[40rem]"
        ></input>

        <p className="text-xl mb-2 mt-5">Select Logo</p>
        <input onChange={handleLogoUpload} type="file"></input>

        <p className="text-xl mb-2 mt-5">Designations</p>
        <div className="flex items-center">
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
              <span className="mr-2">{designation}</span>
              <button
                onClick={() => handleRemoveDesignation(index)}
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
          {!isLoading ? "Create" : <div id="lds-dual-ring" />}
        </button>
      </div>
    </div>
  );
};

export default KaryakarniCreateForm;
