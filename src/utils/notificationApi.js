export const sendNotification = async (data) => {
    try {
        const res = await fetch("https://community-app-notify.onrender.com/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
        const result = await res.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
};
