export const sendNotification = async (data) => {
  try {
    const response = await fetch("http://159.89.165.67/api/notification/send", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (error) {
    console.error(error);
  }
};

export const sendImageNotification = async (body) => {
  const { title, images } = body;
  try {
    await fetch("http://159.89.165.67/api/notification/send-image", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, image: images[0] }),
    });
  } catch (error) {
    console.error(error);
  }
};
