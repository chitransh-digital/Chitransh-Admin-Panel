import React, {useState} from "react";
import {updateBusiness} from "../../Api/businessApi";
import {useNavigate, useLocation} from "react-router-dom";
import { useEffect } from "react";
import { State, City } from "country-state-city";  
import { uploadImage } from "../../Api/feedsApi";

const BusinessUpdateForm = () => {
    const reactLocation = useLocation();
    const navigate = useNavigate();
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
        coupon,
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
        coupon,
    });
    const [states, setStates] = React.useState([]);
    const [cities, setCities] = React.useState([]);
    const [stateName, setStateName] = React.useState("");
    const [stateCode, setStateCode] = React.useState("");
    const [img,setImage] = useState([]);
    const [attach,setAttachment] = useState(null);

    const [isLoading, setIsLoading] = useState(false);

    const normalButton = "border-black hover:border-blue-600 border-2 hover:bg-blue-600 rounded-md text-black hover:text-white";

    const loadingButton = "border-blue-600 border-2 bg-blue-600 rounded-md cursor-default";

    const handleChange = (input) => (e) => {
        e.preventDefault();
        const value = e.target.value;
          if (input === "state" && value !== "") {
            const selectedState = JSON.parse(value);
            setStateCode(selectedState.isoCode);
            setStateName(value);
            setBusiness((prev) => ({ ...prev, [input]: selectedState.name }));
          } else if (input === "state" && value === "") {
            setStateName(value);
          } else {
            setBusiness((prev) => ({ ...prev, [input]: value }));
          }
    }

    useEffect(() => {
        const indianStates = State.getStatesOfCountry("IN");
        setStates(indianStates);
        let code = indianStates.find((state) => state.name === business.state);
        if (code !== undefined) {
            setStateCode(code.isoCode);
            code = code.isoCode;
        }
        setStateName(JSON.stringify({ isoCode: code, name: state }));
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if(business.state) {
            setCities(City.getCitiesOfState("IN", stateCode));
        }
    }, [business.state, stateCode]);

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

    const updateClickHandler = async () => {
        const missingFields = validateBusinessFields(business);
        if(missingFields && missingFields.length > 0) {
            alert(`You must enter all the required fields : ${missingFields.join(", ")}`);
        }
        else if(business.contact.length !== 10) {
            alert("Contact number must be of 10 digits");
        }
        else if(window.confirm("Are you sure you want to edit this business?")) {
            setIsLoading(true);
            if(img.length && attach!==null) {
                let imageUrls = [];
                for (let i = 0; i < img.length; i++) {
                    const imageUrl = await uploadImage(img[i]);
                    imageUrls.push(imageUrl);
                }
                const attachmentUrl = await uploadImage(attach);
                const businessWithImage = {...business, images: [...imageUrls], attachments: [attachmentUrl]};
                await updateBusiness(id, businessWithImage);
            } else if(img.length) {
                let imageUrls = [];
                for (let i = 0; i < img.length; i++) {
                    const imageUrl = await uploadImage(img[i]);
                    imageUrls.push(imageUrl);
                }
                const businessWithImage = {...business, images: [...imageUrls]};
                await updateBusiness(id, businessWithImage);
            }
            else if(attach!==null) {
                const attachmentUrl = await uploadImage(attach);
                const businessWithImage = {...business, attachments: [attachmentUrl]};
                await updateBusiness(id, businessWithImage);
            }
            else{
                await updateBusiness(id, business);
            }
            navigate("/business");
        }
    }

    const handleImageUpload = (e) => {
        setImage(e.target.files);
      };

    const handleAttachmentUpload = (e) => {
        setAttachment((prev) => e.target.files[0]);
    }

    return (
        <div className="w-full">
            <div className="w-full mt-10">
                <p className="font-bold text-[1.8rem] visby ml-5 sm:mb-0 mb-5">
                    Update Business
                    Update Business
                </p>
            </div>
            <div className="mt-10 ml-5">
                <p className="text-xl mb-2">Name</p>
                <input
                    value={business.name}
                    onChange={handleChange("name")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">Contact</p>
                <input
                    value={business.contact}
                    onChange={handleChange("contact")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">Desc</p>
                <input
                    value={business.desc}
                    onChange={handleChange("desc")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">Landmark</p>
                <input
                    value={business.landmark}
                    onChange={handleChange("landmark")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">State</p>
                <select
                value={stateName}
                onChange={handleChange("state")}
                className="border-black border-[1px] p-2 w-[40rem]"
                >
                <option value="">Select State</option>
                {states && states.map((state) => (
                    <option key={state.isoCode} value={JSON.stringify({ isoCode: state.isoCode, name: state.name })}>
                    {state.name}
                    </option>
                ))}
                </select>

                <p className="text-xl mb-2 mt-5">City</p>
                <select
                value={business.city}
                onChange={handleChange("city")}
                className="border-black border-[1px] p-2 w-[40rem]"
                disabled={!business.state}
                >
                <option value="">Select City</option>
                {cities && cities.map((city) => (
                    <option key={city.name} value={city.name}>
                    {city.name}
                    </option>
                ))}
                </select>

                <p className="text-xl mb-2 mt-5">Type</p>
                <select
                value={business.type}
                onChange={handleChange("type")}
                className="border-black border-[1px] p-2 w-[40rem]"
                >
                    <option value="">Select Type</option>
                    <option value="Restaurant">Restaurant</option>
                    <option value="Retail Store">Retail Store</option>
                    <option value="Tech">Tech</option>
                    <option value="Consulting Firm">Consulting Firm</option>
                    <option value="Other">Other</option>
                </select> 

                <p className="text-xl mb-2 mt-5">Link</p>
                <input
                    value={business.link}
                    onChange={handleChange("link")}
                    className="border-black border-[1px] p-2 w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">Image</p>
                <input
                    type="file"
                    onChange={handleImageUpload}
                    multiple
                    className="border-black border-[1px] w-[40rem]"
                ></input>

                <p className="text-xl mb-2 mt-5">Attachment</p>
                <input
                    type="file"
                    onChange={handleAttachmentUpload}
                    className="border-black border-[1px] w-[40rem]"
                ></input>

                <button
                    onClick={updateClickHandler}
                    className={`block mt-8 w-[128px] h-[51px] font-bold transition-all ease-in-out ${
                        isLoading ? loadingButton : normalButton
                      }`}
                >
                    {isLoading ? "Updating..." : "Update Business"}
                </button>
            </div>
        </div>
    )
};

export default BusinessUpdateForm;