export const loginAdmin = async (password) => {
  try {
    const response = await fetch("http://159.89.165.67/api/auth/loginAdmin ", {
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
    const response = await fetch("http://159.89.165.67/api/auth/isLoggedIn", {
      method: "GET",
      credentials: "include",
    });
    return response.json();
  } catch (err) {
    console.error("Error checking user:", err);
  }
}

export const changePassword = async (currentPassword, newPassword) => {
  try {
    const response = await fetch("http://159.89.165.67/api/auth/changeAdminPassword", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    })
    return response.json();
  } catch (err) {
    console.error("Error changing password:", err);
  }
}
