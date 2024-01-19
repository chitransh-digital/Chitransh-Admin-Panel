import {
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { getStorage, ref, deleteObject } from "firebase/storage";

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

export const sendNotification = async () => {
  const serverKey = 'YOUR_FIREBASE_SERVER_KEY';
  const notificationData = {
    to: '/topics/notify',
    notification: {
      title: 'Your Notification Title',
      body: 'Your Notification Body',
    },
  };

  try {
    const response = await fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `key=${serverKey}`,
      },
      body: JSON.stringify(notificationData),
    });

    console.log('Notification sent successfully:', response);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
};
