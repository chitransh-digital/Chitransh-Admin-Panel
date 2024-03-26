import {
  addDoc,
  collection,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";

export const createFamily = async (memberData) => {
  addDoc(collection(db, "FAMILY"), {})
    .then(async (docRef) => {
      const familyId = memberData.familyId;
      await addDoc(
        collection(doc(db, "FAMILY", familyId), "MEMBER"),
        memberData
      );
    })
    .catch((error) => {
      console.error("Error creating family:", error);
    });
};
