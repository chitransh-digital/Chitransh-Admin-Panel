import React, { useEffect, useState } from "react";
import KaryakarniItemContent from "./KaryakarniItemContent";
import { getKaryakarnis } from "../../Api/karyakarniApi";
import KaryakarniView from "./KaryakarniView";
import { Link } from "react-router-dom";
import LocationFilter from "../../Components/LocationFilter";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Pagination } from "flowbite-react";

const KaryakarniList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [karyakarni, setKaryakarni] = useState([]);
  const [karyakarniVariant, setKaryakarniVariant] = useState(true);
  const [displayKaryakarni, setDisplayKaryakarni] = useState({});
  const [filters, setFilters] = useState({
    level: "",
    state: "",
    city: "",
    searchTerm: ""
  });

  const fetchKaryakarni = async (currentPage) => {
    const karyakarnis = await getKaryakarnis(currentPage);
    setKaryakarni(karyakarnis.karyakarni);
    if (karyakarnis.totalPages) setTotalPages(karyakarnis.totalPages);
    else setTotalPages(0);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  useEffect(() => {
    fetchKaryakarni(currentPage);
  }, [currentPage]);

  const filteredKaryakarni = karyakarni && karyakarni.filter((item) => {
    if (filters.level && item.level !== filters.level) return false;
    if (filters.state && item.state !== filters.state) return false;
    if (filters.city && item.city !== filters.city) return false;
    if (filters.searchTerm) {
      const query = filters.searchTerm.toLowerCase();
      if (item.name && !item.name.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  });

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  const resetFilters = () => {
    setFilters({ level: "", state: "", city: "", searchTerm: "" });
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
          <div className="flex items-center space-x-4 ">
            <select
              className="border border-gray-300 p-2 rounded-md w-48"
              value={filters.level}
              onChange={(e) => handleSearch({ ...filters, level: e.target.value })}
            >
              <option value="">Select Level</option>
              <option value="India">India</option>
              <option value="State">State</option>
              <option value="City">City</option>
            </select>
            <LocationFilter onSearch={handleSearch} searchTermLabel="Name" />
            {(filters.level || filters.state || filters.city || filters.searchTerm) && (
              <p onClick={resetFilters} className="flex items-center cursor-pointer text-blue-600">
                <IoArrowBackCircleOutline className="text-2xl" />
                <span className="ml-2">Back</span>
              </p>
            )}
          </div>
          <ul className="my-5 sm:flex hidden justify-around font-medium text-[#A7A7A7]">
            <li>Name</li>
            <li>Address</li>
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
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
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
