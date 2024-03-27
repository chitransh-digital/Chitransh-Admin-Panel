export const createUser = async (data) => {
  try {
    const response = await fetch("http://localhost:5000/member/add", {
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
