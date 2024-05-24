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

export const getKaryakarnis = async () =>{
    try {
      const response = await fetch("http://localhost:5000/karyakarni/getKaryakarnis", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        }});
      const karyakarnis = response.json();
      return karyakarnis;
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
  
  
  export const createKaryakarni = async (karyakarniData) => {
    try {
      const payload = {
        ...karyakarniData,
      };
      const karyakarni = await fetch("http://localhost:5000/karyakarni/registerKaryakarni", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
      return karyakarni;
    } catch (error) {
      console.error("Error creating karyakarni:", error);
      throw error;
    }
  };
  
  export const updateKaryakarni = async (karyakarniId, newData) => {
    try {
      const payload = {
        ...newData
      };
      const karyakarni = await fetch(`http://localhost:5000/karyakarni/update/${karyakarniId}`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      return karyakarni;
    } catch (error) {
      console.error("Error updating karyakarni:", error);
      throw error;
    }
  };
  
  export const removeKaryakarni = async (karyakarniId) => {
    try {
      const karyakarni = await fetch(`http://localhost:5000/karyakarni/delete/${karyakarniId}`, {
        method: "DELETE",
        credentials: "include",
      });
      return karyakarni;
    } catch (error) {
      console.error("Error removing document and associated images:", error);
      throw error;
    }
  };
  