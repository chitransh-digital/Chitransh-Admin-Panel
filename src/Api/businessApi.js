export const getBusinesses = async () => {
    try {
        const businesses = await fetch("http://localhost:5000/business/getBusinesses", {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            }
        });
        const businessesData = await businesses.json();
        return businessesData;
    }catch(error){
        throw error;
    }
}

export const registerBusiness = async (businessData) => {
    try {
        const payload = {
            ...businessData,
        };
        const business = await fetch("http://localhost:5000/business/registerBusiness", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return business;
    } catch (error) {
        console.error("Error registering business:", error);
        throw error;
    }
}

export const updateBusiness = async (id,businessData) => {
    try {
        const payload = {
            ...businessData,
        };
        console.log("payload",payload)
        const business = await fetch(`http://localhost:5000/business/updateBusiness/${id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });
        return business;
    } catch (error) {
        console.error("Error updating business:", error);
        throw error;
    }
}

export const deleteBusiness = async (ownerID, name) => {
    try {
        const business = await fetch(`http://localhost:5000/business/deleteBusiness/${ownerID}/${name}`, {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ ownerID, name }),
        });
        return business;
    } catch (error) {
        console.error("Error deleting business:", error);
        throw error;
    }
}