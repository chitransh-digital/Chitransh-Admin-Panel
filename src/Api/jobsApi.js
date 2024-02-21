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
    const payload = {
      ...jobData,
      requirements: jobData.requirements.split(",").map((item) => item.trim()),
      salary: parseInt(jobData.salary),
    };
    const docRef = await addDoc(collection(db, "JOBS"), payload);
    return docRef.id;
  } catch (error) {
    console.error("Error creating job:", error);
    throw error;
  }
};

export const updateJob = async (jobId, updatedJobData) => {
  try {
    const payload = {
      ...updatedJobData,
      requirements: updatedJobData.requirements
        .split(",")
        .map((item) => item.trim()),
      salary: parseInt(updatedJobData.salary),
    };
    const jobRef = doc(db, "JOBS", jobId);
    await updateDoc(jobRef, payload);
    return jobId;
  } catch (error) {
    console.error("Error updating job:", error);
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
