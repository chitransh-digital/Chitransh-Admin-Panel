import React, { useEffect, useState } from "react";
import KaryakarniItemContent from "./KaryakarniItemContent";
import { getKaryakarnis } from "../../Api/karyakarniApi";
import KaryakarniView from "./KaryakarniView";
import { Link } from "react-router-dom";
import LocationFilter from "../../Components/LocationFilter";
import { IoArrowBackCircleOutline } from "react-icons/io5";

const KaryakarniList = () => {
  const [karyakarni, setKaryakarni] = useState([]);
  const [karyakarniVariant, setKaryakarniVariant] = useState(true);
  const [displayKaryakarni, setDisplayKaryakarni] = useState({});
  const [filteredKaryakarni, setFilteredKaryakarni] = useState([]);
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    searchTerm: ""
  });

  const fetchKaryakarni = async () => {
    const karyakarnis = await getKaryakarnis();
    setKaryakarni(karyakarnis.karyakarni);
    setFilteredKaryakarni(karyakarnis.karyakarni);
  };

  useEffect(() => {
    fetchKaryakarni();
  }, []);

  const handleSearch = ({ state, city, searchTerm }) => {
    let filteredList = karyakarni;

    if (state) {
      filteredList = filteredList && filteredList.filter((item) => item.state === state);
    }

    if (city) {
      filteredList = filteredList && filteredList.filter((item) => item.city === city);
    }

    if (searchTerm) {
      filteredList = filteredList && filteredList.filter((item) =>
        item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredKaryakarni(filteredList);
    setFilters({ state, city, searchTerm });
  };

  const resetFilters = () => {
    setFilters({ state: "", city: "", searchTerm: "" });
    setFilteredKaryakarni(karyakarni);
  };

  const clickHandler = (item) => {
    setKaryakarniVariant((prev) => !prev);
    setDisplayKaryakarni(item);
  };

  if (karyakarniVariant) {
    return (
      <div className="w-full">
        <div className="w-full mt-24">
          <div className="flex justify-between">
            <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
              Karyakarni
            </p>
            <Link to="/createKaryakarni">
              <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
                Create Karyakarni
              </button>
            </Link>
          </div>
          <div>
            <LocationFilter onSearch={handleSearch} searchTermLabel="Name" />
            {(filters.state || filters.city || filters.searchTerm) && (
              <p onClick={resetFilters} className="my-10 ml-5 flex cursor-pointer">
              <IoArrowBackCircleOutline className="text-2xl" />
              <span className="ml-2">Back</span>
              </p>
            )}
          </div>
          <ul className="my-5 sm:flex hidden justify-around font-medium text-[#A7A7A7]">
            <li>Name</li>
            <li>Location</li>
          </ul>
          {filteredKaryakarni && filteredKaryakarni.map((item, idx) => (
            <div
              key={idx}
              onClick={() => clickHandler(item)}
              className="w-full cursor-pointer border-black border-[0.5px] h-[5rem] hover:h-[7rem] rounded-lg relative overflow-hidden px-5 py-3 sm:pt-3 transition-all ease-in-out my-2"
            >
              <KaryakarniItemContent item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <KaryakarniView
      setKaryakarniVariant={setKaryakarniVariant}
      displayKaryakarni={displayKaryakarni}
    />
  );
};

export default KaryakarniList;
