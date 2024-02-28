export const sendNotification = async (data) => {
    try {
        await fetch("https://community-app-notify.onrender.com/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
    } catch (error) {
        console.error(error);
    }
};
