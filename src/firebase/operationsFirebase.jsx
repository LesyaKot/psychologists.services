import { getDatabase, ref, onValue } from "firebase/database";

export const getPsychologists = async () => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const dataRef = ref(db);

    onValue(
      dataRef,
      (snapshot) => {
        const dataSnapshot = snapshot.val();
        resolve(dataSnapshot);
      },
      (error) => {
        reject(error);
      }
    );
  });
};
