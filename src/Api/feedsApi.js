// import {
//   collection,
//   getDocs,
//   query,
//   where,
//   doc,
//   deleteDoc,
//   updateDoc,
//   getDoc,
//   addDoc,
//   serverTimestamp,
// } from "firebase/firestore";
// import { db } from "../firebase";
// import {
//   getStorage,
//   ref,
//   deleteObject,
//   uploadBytes,
//   getDownloadURL,
// } from "firebase/storage";

// const storage = getStorage();

// export const removeFeed = async (feedId) => {
//   try {
//     const feedRef = doc(db, "FEEDS", feedId);
//     const feedDoc = await getDoc(feedRef);
//     if (!feedDoc.exists()) {
//       console.error("Document not found");
//       return;
//     }
//     const images = feedDoc.data().images;
//     const storageDeletionPromises = images.map(async (storageRef) => {
//       if (storageRef) {
//         const reff = await ref(storage, storageRef);
//         deleteObject(reff)
//           .then(() => {})
//           .catch((error) => {
//             console.log(error);
//           });
//       }
//     });
//     await Promise.all(storageDeletionPromises);
//     await deleteDoc(feedRef);
//   } catch (error) {
//     console.error("Error removing document and associated images:", error);
//     throw error;
//   }
// };

// export const setFeedVisible = async (feedId) => {
//   try {
//     const feedRef = doc(db, "FEEDS", feedId);
//     await updateDoc(feedRef, {
//       visible: true,
//     });
//   } catch (error) {
//     throw error;
//   }
// };

export const getFeeds = async () =>{
  try {
    const response = await fetch("http://localhost:5000/feeds/getFeeds ", {
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
  
  const response = await fetch("http://localhost:5000/image/upload", {
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
    const feed = await fetch("http://localhost:5000/feeds/uploadFeeds", {
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
    const feed = await fetch(`http://localhost:5000/feeds/update/${feedId}`, {
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
    const feed = await fetch(`http://localhost:5000/feeds/delete/${feedId}`, {
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
