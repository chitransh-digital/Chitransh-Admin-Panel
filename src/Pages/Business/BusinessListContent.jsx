import React from "react";
import { useState } from "react";
import { deleteBusiness } from "../../Api/businessApi";
import { Link } from "react-router-dom";

const BusinessListContent = ({ item }) => {
    const [reload, setReload] = useState(false);
    const [showDetails, setShowDetails] = useState(false);
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
        coupen,
    } = item;

    const rejectHandler = async (ownerID, name) => {
        if(window.confirm("Are you sure you want to remove this business?")) {
            await deleteBusiness(ownerID, name);
            setReload(reload ? false : true);
        }
    }
    
    return (
        <div className="w-full">
            <div className="w-full mt-10">
                <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
                    {name}
                </p>
            </div>
            <div className="mt-10 ml-5">
                <p className="text-xl mb-2">Name: {name}</p>
                <p className="text-xl mb-2">Contact: {contact}</p>
                <p className="text-xl mb-2">Description: {desc}</p>
                <p className="text-xl mb-2">City: {city}</p>
                <p className="text-xl mb-2">State: {state}</p>
            </div>
            <div className="mt-5 ml-5">
                <button className="text-blue-500" onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Hide Details" : "Show Details"}
                </button>
            </div>
            {showDetails && (
                <div>
                    <div className="mt-5 ml-5">
                        <p className="text-xl mb-2">Owner ID: {ownerID}</p>
                        <p className="text-xl mb-2">Landmark: {landmark}</p>
                        <p className="text-xl mb-2">Type: {type}</p>
                        <p className="text-xl mb-2">Link: {link}</p>
                        <p className="text-xl mb-2">Image: {image}</p>
                        <p className="text-xl mb-2">Attachment: {attachment}</p>
                        <p className="text-xl mb-2">Coupen: {coupen}</p>
                    </div>
                    <Link
                        to={{
                            pathname: "/updateBusiness",
                            state: {
                                ownerID,
                                name,
                                desc,
                                contact,
                                landmark,
                                city,
                                state,
                                type,
                                link,
                                image,
                                attachment,
                            },
                        }}
                    >
                        <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
                            Update
                        </button>
                    </Link>

                    <button
                        onClick={() => rejectHandler(ownerID, name)}
                        className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block"
                    > 
                        delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default BusinessListContent;