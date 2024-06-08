import React, { useEffect, useState } from "react";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { removeKaryakarni } from "../../Api/karyakarniApi";
import { Link, useNavigate } from "react-router-dom";
import { sendImageNotification } from "../../Api/notificationApi";

const KaryakarniView = ({ setKaryakarniVariant, displayKaryakarni }) => {
  const navigate = useNavigate();
  const { id, name, landmark, city, state, address, logo, designations, members } = displayKaryakarni;

  const [isLoading, setIsLoading] = useState(false);
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    setSelectedMembers(members || []);
  }, [members]);

  const normalButton =
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";
  const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

  const clickHandler = () => {
    setKaryakarniVariant((prev) => !prev);
  };

  const deleteHandler = async () => {
    if (window.confirm("Are you sure you want to remove this karyakarni?")) {
      await removeKaryakarni(id);
      setKaryakarniVariant((prev) => !prev);
      window.location.reload();
      navigate("/karyakarni");
    }
  };

  const notifyHandler = async () => {
    if (window.confirm("Are you sure you want to send notification for this karyakarni?")) {
      setIsLoading(true);
      await sendImageNotification({ name, logo });
      setIsLoading(false);
    }
  };

  return (
    <div>
      <p onClick={clickHandler} className="my-10 ml-5 flex cursor-pointer">
        <IoArrowBackCircleOutline className="text-2xl" />
        <span className="ml-2">Back</span>
      </p>
      <p className="text-3xl pl-5">{name}</p>
      <div className="m-5 flex flex-wrap">
        <div className="w-64 h-64 overflow-hidden rounded-xl mr-6">
          <img src={logo} alt={name} className="object-contain w-full h-full" />
        </div>
      </div>
      <p className="pr-20 pl-5 my-5">
        <span className="font-bold">Formed at :</span> {`${landmark} ${city} ${state}`}
      </p>
      <p className="pr-20 pl-5 my-5">
        <span className="font-bold">Address :</span> {`${address}`}
      </p>
      <p className="pr-20 pl-5 my-5">
        <span className="font-bold">Designations :</span> {`${designations.join(", ")}`}
      </p>
      <p className="pr-20 pl-5 my-5">
        <span className="font-bold">Members :</span> {selectedMembers.length}
      </p>

      <div className="flex-col">
        <div className="flex gap-1">
          <button
            onClick={isLoading ? () => {} : notifyHandler}
            className={`mx-1 mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
              isLoading ? loadingButton : normalButton
            }`}
          >
            {!isLoading ? "Notify" : <div id="lds-dual-ring" />}
          </button>
          <Link
            to="/karyakarniMembers"
            state={{
              id,
              karyakarni: name,
              members: selectedMembers,
            }}
          >
            <button className="mx-1 mt-8 w-[128px] h-[51px] border-black border-2 hover:bg-black rounded-md text-black hover:text-white font-bold transition-all ease-in-out">
              Members
            </button>
        </Link>
        </div>
        <div className="flex gap-1">
          <Link
            to="/updateKaryakarni"
            state={{
              id,
              name,
              landmark,
              state,
              city,
              address,
              logo,
              designations,
              members,
            }}
          >
            <button className="mx-1 mt-3 w-[128px] h-[51px] border-black border-2 hover:bg-black rounded-md text-black hover:text-white font-bold transition-all ease-in-out">
              Edit
            </button>
          </Link>
          <button
            onClick={deleteHandler}
            className="mx-1 mt-3 w-[128px] h-[51px] border-red-600 border-2 hover:bg-red-600 rounded-md text-red-600 hover:text-white font-bold transition-all ease-in-out"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default KaryakarniView;
