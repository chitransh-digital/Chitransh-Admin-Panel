export const createUser = async (data) => {
  try {
    const response = await fetch("http://159.89.165.67/api/member/add", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return response.json();
  } catch (err) {
    console.error("Error creating user:", err);
  }
};
