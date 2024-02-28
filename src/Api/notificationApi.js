export const sendNotification = async (data) => {
  try {
    await fetch("https://community-app-notify.onrender.com/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendImageNotification = async (body) => {
  const { title, images } = body;
  try {
    await fetch("https://community-app-notify.onrender.com/send-image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, image: images[0] }),
    });
  } catch (error) {
    console.error(error);
  }
};
