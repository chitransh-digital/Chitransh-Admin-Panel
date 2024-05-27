import React, { useEffect, useState } from "react";
import FamilyItemContent from "./FamilyItemContent";
import { getFamilies } from "../../Api/memberApi";
import FamilyView from "./FamilyView";
import { Link } from "react-router-dom";
import LocationFilter from "../../Components/LocationFilter";

const FamilyList = () => {
  const [family, setFamily] = useState([]);
  const [familyVariant, setFamilyVariant] = useState(true);
  const [displayFamily, setDisplayFamily] = useState({});
  const [filters, setFilters] = useState({
    state: "",
    city: "",
    searchTerm: ""
  });

  const fetchFamilies = async () => {
    const families = await getFamilies();
    setFamily(families.families); 
    console.log(families.families)
  };

  useEffect(() => {
    fetchFamilies();
  }, []);

  const filteredFamilies = family.filter((item) => {
    if (filters.state && item.state !== filters.state) return false;
    if (filters.city && item.city !== filters.city) return false;
    if (filters.searchTerm) {
      const query = filters.searchTerm.toLowerCase();
      if (!item.familyId.toLowerCase().includes(query)) {
        return false;
      }
    }
    return true;
  });

  if (!family || family.length === 0) {
    return <div>Loading...</div>;
  }

  const clickHandler = (item) => {
    setFamilyVariant((prev) => !prev);
    setDisplayFamily(item);
  };

  const handleSearch = (searchFilters) => {
    setFilters(searchFilters);
  };

  if (familyVariant) {
    return (
      <div className="w-full">
        <div className="w-full mt-24">
          <div className="flex justify-between">
            <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
              Families
            </p>
            <Link to="/createFamily">
              <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
                Create Family
              </button>
            </Link>
          </div>
          <LocationFilter onSearch={handleSearch} searchTermLabel="Family ID" />
          <ul className="my-5 sm:flex hidden justify-around font-medium text-[#A7A7A7]">
            <li>FamilyId</li>
            <li>Head</li>
            <li>Contact</li>
          </ul>
          {filteredFamilies.map((item, idx) => (
            <div
              key={idx}
              onClick={() => clickHandler(item)}
              className="w-full cursor-pointer border-black border-[0.5px] h-[5rem] hover:h-[7rem] rounded-lg relative overflow-hidden px-5 py-3 sm:pt-3 transition-all ease-in-out my-2"
            >
              <FamilyItemContent item={item} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return <FamilyView setFamilyVariant={setFamilyVariant} displayFamily={displayFamily} />;
};

export default FamilyList;
