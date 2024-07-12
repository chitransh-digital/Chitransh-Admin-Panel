import React from "react";
import { useState } from "react";
import { deleteBusiness } from "../../Api/businessApi";
import { Link, useNavigate } from "react-router-dom";
// import { Carousel } from "flowbite-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const BusinessListContent = ({ item }) => {
    const [reload, setReload] = useState(false);
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);
    const {
        id,
        name,
        ownerID,
        contact,
        desc,
        landmark,
        city,
        state,
        type,
        link,
        images,
        attachments,
        coupon,
    } = item;

    const rejectHandler = async (id) => {
        if(window.confirm("Are you sure you want to remove this business?")) {
            await deleteBusiness(id);
            setReload(reload ? false : true);
        }
        window.location.reload();
        navigate("/business")
    }
    
    return (
        <div className="w-full border-black border-[2px] my-10 pb-8 rounded-lg">
            <div className="w-full mt-10 ">
                <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
                    {name}
                </p>
            </div>
            <div className="mt-10 ml-5 mr-20 flex justify-between align-center">
                <div>
                    <p className="text-xl mb-2">Name: {name}</p>
                    <p className="text-xl mb-2">Contact: {contact}</p>
                    <p className="text-xl mb-2">Description: {desc}</p>
                    <p className="text-xl mb-2">City: {city}</p>
                    <p className="text-xl mb-2">State: {state}</p>
                </div>
                <div className="w-[24rem]">
                    <Carousel showThumbs={false}width={'24rem'}>
                        {
                            images && images.map((image, index) => (
                                <div className="w-[24rem]">
                                    <img key={index} src={image} alt="" className="object-contain max-w-[24rem] h-42" />
                                </div>
                            ))
                        }
                    </Carousel>
                </div>
            </div>
            <div className="mt-5 ml-5">
                <button className="text-blue-500" onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? "Hide Details" : "Show Details"}
                </button>
            </div>
            {showDetails && (
                <div className=" ml-5">
                    <div className="mt-5">
                        <p className="text-xl mb-2">Owner ID: {ownerID}</p>
                        <p className="text-xl mb-2">Landmark: {landmark}</p>
                        <p className="text-xl mb-2">Type: {type}</p>
                        <p className="text-xl mb-2">Link: {link}</p>
                        <p className="text-xl mb-2">Attachment: <a href={attachments} target="_blank" rel="noreferrer" className="my-2 py-0.5 px-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white">View</a></p>
                        <p className="text-xl mb-2">Coupon: {coupon}</p>
                    </div>
                    <Link
                        to="/updateBusiness"
                            state={{
                                id,
                                ownerID,
                                name,
                                desc,
                                contact,
                                landmark,
                                city,
                                state,
                                type,
                                link,
                                coupon,
                            }}
                        
                    >
                        <button className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block">
                            Update
                        </button>
                    </Link>

                    <button
                        onClick={() => rejectHandler(id)}
                        className="my-2 w-[128px] h-[51px] font-bold transition-all ease-in-out border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white block"
                    > 
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

export default BusinessListContent;