import React, { useState, useEffect } from "react";
import { State, City } from "country-state-city";

const LocationFilter = ({ onSearch, searchTermLabel }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const indianStates = State.getStatesOfCountry("IN");
    setStates(indianStates);
  }, []);

  useEffect(() => {
    if (selectedState) {
      setCities(City.getCitiesOfState("IN", selectedState));
    } else {
      setCities([]);
    }
  }, [selectedState]);

  const handleSearch = () => {
    onSearch({
      state: selectedState,
      city: selectedCity,
      searchTerm: searchTerm,
    });
  };

  return (
    <div className="flex items-center space-x-4">
      <input
        type="text"
        placeholder={`Search by ${searchTermLabel}`}
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-48"
      />
      <select
        value={selectedState}
        onChange={(e) => setSelectedState(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-48"
      >
        <option value="">Select State</option>
        {states && states.map((state) => (
          <option key={state.isoCode} value={state.isoCode}>
            {state.name}
          </option>
        ))}
      </select>
      <select
        value={selectedCity}
        onChange={(e) => setSelectedCity(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-48"
        disabled={!selectedState}
      >
        <option value="">Select City</option>
        {cities && cities.map((city) => (
          <option key={city.name} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
      <button
        className="bg-blue-600 text-white p-2 rounded-md w-32 hover:bg-blue-700 transition"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
};

export default LocationFilter;
