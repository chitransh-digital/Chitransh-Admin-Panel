import React, { useEffect, useState } from "react";
import FamilyItemContent from "./FamilyItemContent";
import { getFamilies } from "../../Api/memberApi";
import FamilyView from "./FamilyView";
import { Link } from "react-router-dom";
import LocationFilter from "../../Components/LocationFilter";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { Pagination } from "flowbite-react";

const FamilyList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  const [family, setFamily] = useState([]);
  const [familyVariant, setFamilyVariant] = useState(true);
  const [displayFamily, setDisplayFamily] = useState({});
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    searchTerm: ""
  });

  const fetchFamilies = async () => {
    const families = await getFamilies(currentPage);
    setFamily(families.families); 
    if (families.totalPages)  setTotalPages(families.totalPages);
    else setTotalPages(0);
  };

  useEffect(() => {
    fetchFamilies(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }

  const filteredFamilies = family && family.filter((item) => {
    if (filters.state && item.members[0].state !== filters.state) return false;
    if (filters.city && item.members[0].city !== filters.city) return false;
    if (filters.searchTerm) {
      const query = filters.searchTerm.toLowerCase();
      if (item.familyID && !item.familyID.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  });

  const clickHandler = (item) => {
    setFamilyVariant((prev) => !prev);
    setDisplayFamily(item);
  };

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  const resetFilters = () => {
    setFilters({ state: "", city: "", searchTerm: "" });
  };

  if (familyVariant) {
    return (
      <div className="w-full">
        <div className="w-full mt-24">
          <div className="flex justify-between items-center">
            <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
              Families
            </p>
            <Link to="/createFamily">
              <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
                Create Family
              </button>
            </Link>
          </div>
          <div className="flex justify-between items-center mb-5">
            <LocationFilter onSearch={handleSearch} searchTermLabel="Family ID" />
            {(filters.state || filters.city || filters.searchTerm) && (
              <p onClick={resetFilters} className="my-10 ml-5 flex cursor-pointer">
              <IoArrowBackCircleOutline className="text-2xl" />
              <span className="ml-2">Back</span>
              </p>
            )}
          </div>
          <ul className="my-5 sm:flex hidden justify-around font-medium text-[#A7A7A7]">
            <li>FamilyId</li>
            <li>Head</li>
            <li>Contact</li>
          </ul>
          {filteredFamilies && filteredFamilies.map((item, idx) => (
            <div
              key={idx}
              onClick={() => clickHandler(item)}
              className="w-full cursor-pointer border-black border-[0.5px] h-[5rem] hover:h-[7rem] rounded-lg relative overflow-hidden px-5 py-3 sm:pt-3 transition-all ease-in-out my-2"
            >
              <FamilyItemContent item={item} />
            </div>
          ))}
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
        </div>
      </div>
    );
  }

  return <FamilyView setFamilyVariant={setFamilyVariant} displayFamily={displayFamily} />;
};

export default FamilyList;
