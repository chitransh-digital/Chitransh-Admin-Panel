import React from "react";
import { useNavigate } from "react-router-dom";
import { registerBusiness } from "../../Api/businessApi";

const BusinessCreateForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [businesses, setBusiness] = React.useState({});

    const normalButton = 
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";

    const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

    const handleChange = (input) => (e) => {
        e.preventDefault();
        setBusiness({ ...businesses, [input]: e.target.value });
    };

    const createClickHandler = async () => {
        if(window.confirm("Are you sure you want to create this business?")) {
            setIsLoading((prev) => true);
            const newBusiness = {
                name: businesses.name,
                ownerID: businesses.ownerID,
                contact: businesses.contact,
                desc: businesses.desc,
                landmark: businesses.landmark,
                city: businesses.city,
                state: businesses.state,
                type: businesses.type,
                link: businesses.link,
                image: businesses.image,
                attachment: businesses.attachment,
                coupen: businesses.coupen,
            };
            const response = await registerBusiness(newBusiness);
            if(response.message === "Business added successfully") {
                alert("Business created successfully");
                navigate("/business");
            } else {
                alert("Couldn't create business. Please try again.");
            }
            setIsLoading((prev) => false);
        }
        
    }

    return (
        <div className="w-full">
            <div className="w-full mt-10">
                <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
                    Create Business
                </p>
            </div>
            <div className="mt-10 ml-5">
                <p className="text-xl mb-2">Name</p>
                <input 
                    onChange={handleChange("name")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">OwnerID</p>
                <input 
                    onChange={handleChange("ownerID")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">Contact</p>
                <input 
                    onChange={handleChange("contact")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">Description</p>
                <input 
                    onChange={handleChange("desc")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">Landmark</p>
                <input 
                    onChange={handleChange("landmark")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">City</p>
                <input 
                    onChange={handleChange("city")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">State</p>
                <input 
                    onChange={handleChange("state")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">Type</p>
                <input 
                    onChange={handleChange("type")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">Link</p>
                <input 
                    onChange={handleChange("link")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">Image</p>
                <input 
                    onChange={handleChange("image")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">Attachment</p>
                <input 
                    onChange={handleChange("attachment")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <p className="text-xl mb-2 mt-5">Coupen</p>
                <input 
                    onChange={handleChange("coupen")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>
                <button
                    onClick={isLoading ? () => {} : createClickHandler}
                    className={`block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
                        isLoading ? loadingButton : normalButton
                    }`}
                >
                    {!isLoading ? "Create" : <div id="lds-dual-ring" />}
                </button>
            </div>
        </div>
    );
}

export default BusinessCreateForm;