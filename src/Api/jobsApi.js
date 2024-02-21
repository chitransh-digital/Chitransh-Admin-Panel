import {
  collection,
  getDocs,
  addDoc,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export const getJobs = async () => {
  try {
    const q = query(collection(db, "JOBS"), where("visible", "==", false));
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

export const createJob = async (jobData) => {
  try {
    const docRef = await addDoc(collection(db, "JOBS"), jobData);
    return docRef.id;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const removeJob = async (jobId) => {
  try {
    const jobRef = doc(db, "JOBS", jobId);
    const jobDoc = await getDoc(jobRef);
    if (!jobDoc.exists()) {
      console.error("Document not found");
      return;
    }
    await deleteDoc(jobRef);
  } catch (error) {
    console.error("Error removing document and associated images:", error);
    throw error;
  }
};

export const setJobVisible = async (jobId) => {
  try {
    const jobRef = doc(db, "JOBS", jobId);
    await updateDoc(jobRef, {
      visible: true,
    });
  } catch (error) {
    throw error;
  }
};
