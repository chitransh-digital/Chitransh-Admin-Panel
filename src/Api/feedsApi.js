import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import {
  getStorage,
  ref,
  deleteObject,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export const getFeeds = async () => {
  try {
    const q = query(collection(db, "FEEDS"), where("visible", "==", false));
    const querySnapshot = await getDocs(q);
    const newData = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));
    return newData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const uploadImage = async (file) => {
  const storage = getStorage();
  const imageRef = ref(storage, `feed_images/${file.name}`);
  await uploadBytes(imageRef, file);
  const downloadURL = await getDownloadURL(imageRef);
  return downloadURL;
};

export const createFeed = async (feedData) => {
  try {
    const payload = {
      ...feedData,
      timestamp: serverTimestamp(),
      visible: false,
    };
    const docRef = await addDoc(collection(db, "FEEDS"), payload);
    return docRef.id;
  } catch (error) {
    console.error("Error creating feed:", error);
    throw error;
  }
}

export const updateFeed = async (feedId, newData) => {
  try {
    const feedRef = doc(db, "FEEDS", feedId);
    newData.timestamp = serverTimestamp();
    await updateDoc(feedRef, newData);
  } catch (error) {
    console.error("Error updating feed:", error);
    throw error;
  }
};

export const removeFeed = async (feedId) => {
  try {
    const feedRef = doc(db, "FEEDS", feedId);
    const feedDoc = await getDoc(feedRef);
    if (!feedDoc.exists()) {
      console.error("Document not found");
      return;
    }
    const images = feedDoc.data().images;
    const storageDeletionPromises = images.map(async (storageRef) => {
      if (storageRef) {
        const reff = await ref(storage, storageRef);
        deleteObject(reff)
          .then(() => {})
          .catch((error) => {
            console.log(error);
          });
      }
    });
    await Promise.all(storageDeletionPromises);
    await deleteDoc(feedRef);
  } catch (error) {
    console.error("Error removing document and associated images:", error);
    throw error;
  }
};

export const setFeedVisible = async (feedId) => {
  try {
    const feedRef = doc(db, "FEEDS", feedId);
    await updateDoc(feedRef, {
      visible: true,
    });
  } catch (error) {
    throw error;
  }
};
