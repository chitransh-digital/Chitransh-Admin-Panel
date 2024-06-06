import React from "react";
import { useNavigate } from "react-router-dom";
import { registerBusiness } from "../../Api/businessApi";
import { State, City } from "country-state-city";
import { useEffect } from "react";
import { uploadImage } from "../../Api/feedsApi";

const BusinessCreateForm = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = React.useState(false);
    const [businesses, setBusiness] = React.useState({
        name: "",
        ownerID: "",
        contact: "",
        desc: "",
        landmark: "",
        city: "",
        state: "",
        type: "",
        link: "",
        image: [],
        attachment: [],
        coupon: "",
    });

    const [image, setImage] = React.useState(null);
    const [attachment, setAttachment] = React.useState(null);
    const [states, setStates] = React.useState([]);
    const [cities, setCities] = React.useState([]);


    const normalButton = 
    "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";

    const loadingButton =
    "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

    const handleChange = (input) => (e) => {
        e.preventDefault();
        setBusiness({ ...businesses, [input]: e.target.value });
    };

    useEffect(() => {
        const indianStates = State.getStatesOfCountry("IN");
        setStates(indianStates);
    }, []);

    useEffect(() => {
        if (businesses.state) {
            setCities(City.getCitiesOfState("IN", businesses.state));
        }
    }, [businesses.state]);

    const validateBusinessFields = (businesses) => {
        const missingFields = [];
        if(businesses.name === "") missingFields.push("Name");
        if(businesses.ownerID === "") missingFields.push("OwnerID");
        if(businesses.contact === "") missingFields.push("Contact");
        if(businesses.desc === "") missingFields.push("Description");
        if(businesses.landmark === "") missingFields.push("Landmark");
        if(businesses.city === "") missingFields.push("City");
        if(businesses.state === "") missingFields.push("State");
        if(businesses.type === "") missingFields.push("Type");

        return missingFields;
    }


    const createClickHandler = async () => {
        const missingFields = validateBusinessFields(businesses);
        if(missingFields && missingFields.length > 0) {
            alert(`You must enter all the required fields : ${missingFields.join(", ")}`);
        }
        else if(window.confirm("Are you sure you want to create this business?")) {
            setIsLoading((prev) => true);
            if(image!==null && attachment!==null) {
                const imageUrl = await uploadImage(image);
                const attachmentUrl = await uploadImage(attachment);
                const businessWithImage = {...businesses, images: [imageUrl], attachments: [attachmentUrl]};
                await registerBusiness(businessWithImage);
            } else if(image!==null) {
                const imageUrl = await uploadImage(image);
                const businessWithImage = {...businesses, images: [imageUrl]};
                await registerBusiness(businessWithImage);
            }
            else if(attachment!==null) {
                const attachmentUrl = await uploadImage(attachment);
                const businessWithImage = {...businesses, attachments: [attachmentUrl]};
                await registerBusiness(businessWithImage);
            }
            else{
                await registerBusiness(businesses);
            }
            setIsLoading((prev) => false);
            navigate("/business");
        }
    }

    const handleImageUpload = (e) => {
        setImage((prev) => e.target.files[0]);
      };

    const handleAttachmentUpload = (e) => {
        setAttachment((prev) => e.target.files[0]);
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
                <p className="text-xl mb-2 mt-5">State</p>
                <select
                onChange={handleChange("state")}
                className="border-black border-[1px] p-2 w-[40rem]"
                >
                <option value="" onChange={handleChange("state")}>Select State</option>
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
                disabled={!businesses.state}
                >
                <option value="">Select City</option>
                {cities.map((city) => (
                    <option key={city.name} value={city.name}>
                    {city.name}
                    </option>
                ))}
                </select>
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
                    type="file"
                    onChange={handleImageUpload}
                ></input>
                <p className="text-xl mb-2 mt-5">Attachment</p>
                <input 
                    type="file"
                    onChange={handleAttachmentUpload}
                ></input>
                <p className="text-xl mb-2 mt-5">Coupon</p>
                <input 
                    onChange={handleChange("coupon")}
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