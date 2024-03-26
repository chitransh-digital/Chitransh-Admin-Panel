export const loginAdmin = async (password) => {
  try {
    const response = await fetch("http://localhost:5000/auth/loginAdmin ", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ password }),
    });
    return response.json();
  } catch (err) {
    console.error("Error logging in:", err);
  }
};

export const checkUser = async () => {
  try {
    const response = await fetch("http://localhost:5000/auth/isLoggedIn", {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  } catch (err) {
    console.error("Error checking user:", err);
  }
}
