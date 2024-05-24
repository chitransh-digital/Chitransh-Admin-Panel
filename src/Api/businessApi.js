export const getBusinesses = async () => {
    try {
        const businesses = await fetch("http://localhost:5000/business/getBusiness", {
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