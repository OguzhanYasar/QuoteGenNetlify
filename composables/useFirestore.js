// composables/useFirestore.js
import { useNuxtApp } from "#app";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const useFirestore = () => {
  const { $db } = useNuxtApp();
  const collectionRef = collection($db, "items");

  const getItems = async () => {
    const querySnapshot = await getDocs(collectionRef);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };

  const addItem = async (item) => {
    const docRef = await addDoc(collectionRef, item);
    return docRef.id;
  };

  const updateItem = async (id, updatedItem) => {
    const docRef = doc($db, "items", id);
    await updateDoc(docRef, updatedItem);
  };

  const deleteItem = async (id) => {
    const docRef = doc($db, "items", id);
    await deleteDoc(docRef);
  };

  return {
    getItems,
    addItem,
    updateItem,
    deleteItem,
  };
};

export default useFirestore;
