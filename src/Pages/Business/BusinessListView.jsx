import React, { useState, useEffect } from "react";
import { getBusinesses } from "../../Api/businessApi";
import BusinessListContent from "./BusinessListContent";
import { Link } from "react-router-dom";
import LocationFilter from "../../Components/LocationFilter";

const BusinessListView = () => {
  const [reload, setReload] = useState(false);
  const [business, setBusiness] = useState([]);
  const [filteredBusinesses, setFilteredBusinesses] = useState([]);
  
  const fetchBusinesses = async () => {
    const businesses = await getBusinesses();
    setBusiness(businesses.businesses);
    setFilteredBusinesses(businesses.businesses);
  };

  useEffect(() => {
    fetchBusinesses();
  }, [reload]);

  const handleSearch = ({ state, city, searchTerm }) => {
    let filteredList = business;

    if (state) {
      filteredList = filteredList.filter((item) => item.state === state);
    }

    if (city) {
      filteredList = filteredList.filter((item) => item.city === city);
    }

    if (searchTerm) {
      filteredList = filteredList.filter((item) => 
        item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBusinesses(filteredList);
  };

  if (!business || business.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full">
      <div className="w-full mt-24">
        <div className="flex justify-between">
          <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
            Businesses
          </p>
          <Link to="/registerBusiness">
            <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
              Create Business
            </button>
          </Link>
        </div>
        <LocationFilter onSearch={handleSearch} searchTermLabel="Name" />

        <ul className="my-5 px-12 sm:flex hidden justify-between font-medium text-[#A7A7A7]">
            <li>Details</li>
            <li>Contact</li>
        </ul>
        {filteredBusinesses.map((busines,idx) => (
            <BusinessListContent item={busines} reload={reload} setReload={setReload} key={idx}/>
        ))}
      </div>
    </div>
  );
};

export default BusinessListView;