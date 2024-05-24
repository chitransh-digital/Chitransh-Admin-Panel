import React, {useState, useEffect} from "react";
import { getBusinesses } from "../../Api/businessApi";
import BusinessListContent from "./BusinessListContent";
import { Link } from "react-router-dom";

const BusinessListView = () => {
    const [reload, setReload] = useState(false);
    const [businesses, setBusinesses] = useState([]);

    const fetchBusinesses = async () => {
        const businesses = await getBusinesses();
        setBusinesses(businesses);
    }

    useEffect(() => {
        fetchBusinesses();
    }
    , [reload]);

    if(businesses.length === 0) {
        return <div>Loading...</div>
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
                <ul className="my-5 px-12 sm:flex hidden justify-between font-medium text-[#A7A7A7]">
                    {/* <li>Details</li>
                    <li>Contact</li> */}
                </ul>
                {businesses.map((item, idx) => (
                    <BusinessListContent item={item} reload={reload} setReload={setReload} key={idx} />
                ))}
            </div>
        </div>
    );
};

export default BusinessListView;