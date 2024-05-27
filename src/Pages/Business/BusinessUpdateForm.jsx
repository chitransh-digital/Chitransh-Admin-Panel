import React, {useState} from "react";
import {updateBusiness} from "../../Api/businessApi";
import {useNavigate, useLocation} from "react-router-dom";
import { useEffect } from "react";
import { State, City } from "country-state-city";  

const BusinessUpdateForm = () => {
    const reactLocation = useLocation();
    const navigate = useNavigate();
    const {
        name,
        ownerID,
        contact,
        desc,
        landmark,
        city,
        state,
        type,
        link,
        image,
        attachment,
    } = reactLocation.state;

    const [business, setBusiness] = useState({
        name,
        ownerID,
        contact,
        desc,
        city,
        landmark,
        state,
        type,
        link,
        image,
        attachment,
    });
    const [states, setStates] = React.useState([]);
    const [cities, setCities] = React.useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const normalButton = "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";

    const loadingButton = "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

    const handleChange = (input) => (e) => {
        e.preventDefault();
        setBusiness((prev) => ({...prev, [input]: e.target.value}));
    }

    useEffect(() => {
        const indianStates = State.getStatesOfCountry("IN");
        setStates(indianStates);
    }, []);

    useEffect(() => {
        if(business.state) {
            setCities(City.getCitiesOfState("IN", business.state));
        }
    }, [business.state]);

    const updateClickHandler = async () => {
        if(window.confirm("Are you sure you want to edit this business?")) {
            setIsLoading(true);
            await updateBusiness(business);
            navigate("/business");
        }
    }

    return (
        <div className="w-full">
            <div className="w-full mt-10">
                <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
                    update Business
                </p>
            </div>
            <div className="mt-10 ml-5">
                <p className="text-xl mb-2">name</p>
                <input
                    value={business.name}
                    onChange={handleChange("name")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">contact</p>
                <input
                    value={business.contact}
                    onChange={handleChange("contact")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">desc</p>
                <input
                    value={business.desc}
                    onChange={handleChange("desc")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">landmark</p>
                <input
                    value={business.landmark}
                    onChange={handleChange("landmark")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">State</p>
                <select
                onChange={handleChange("state")}
                className="border-black border-[1px] p-2 w-[40rem]"
                >
                <option value="">Select State</option>
                {states.map((state) => (
                    <option key={state.isoCode} value={state.isoCode}>
                    {state.name}
                    </option>
                ))}
                </select>

                <p className="text-xl mb-2 mt-5">City</p>
                <select
                onChange={handleChange("city")}
                className="border-black border-[1px] p-2 w-[40rem]"
                disabled={!business.state}
                >
                <option value="">Select City</option>
                {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                    {city.name}
                    </option>
                ))}
                </select>

                <p className="text-xl mb-2 mt-5">type</p>
                <input
                    value={business.type}
                    onChange={handleChange("type")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input> 

                <p className="text-xl mb-2 mt-5">link</p>
                <input
                    value={business.link}
                    onChange={handleChange("link")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">image</p>
                <input
                    value={business.image}
                    onChange={handleChange("image")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">attachment</p>
                <input
                    value={business.attachment}
                    onChange={handleChange("attachment")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <button
                    onClick={updateClickHandler}
                    className={isLoading ? loadingButton : normalButton}
                >
                    {isLoading ? "Updating..." : "Update Business"}
                </button>
            </div>
        </div>
    )
};

export default BusinessUpdateForm;