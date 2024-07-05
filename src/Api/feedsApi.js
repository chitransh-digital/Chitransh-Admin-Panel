export const getFeeds = async (page) =>{
  try {
    const response = await fetch(`http://159.89.165.67/api/feeds/getFeeds?page=${page}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }});
    const feeds = response.json();
    return feeds;
  } catch (error) {
    throw error;
  }
}

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await fetch("http://159.89.165.67/api/image/upload", {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to upload image');
  }

  const data = await response.json();
  return data.file;
};


export const createFeed = async (feedData) => {
  try {
    const payload = {
      ...feedData,
      timestamp: new Date(),
      visible: false,
    };
    const feed = await fetch("http://159.89.165.67/api/feeds/uploadFeeds", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
    return feed;
  } catch (error) {
    console.error("Error creating feed:", error);
    throw error;
  }
};

export const updateFeed = async (feedId, newData) => {
  try {
    const payload = {
      ...newData,
      timestamp: new Date(),
    };
    const feed = await fetch(`http://159.89.165.67/api/feeds/update/${feedId}`, {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return feed;
  } catch (error) {
    console.error("Error updating feed:", error);
    throw error;
  }
};

export const removeFeed = async (feedId) => {
  try {
    const feed = await fetch(`http://159.89.165.67/api/feeds/delete/${feedId}`, {
      method: "DELETE",
      credentials: "include",
    });
    return feed;
  } catch (error) {
    console.error("Error removing document and associated images:", error);
    throw error;
  }
};

export const setFeedVisible = async (feedId) => {
  return;
};
