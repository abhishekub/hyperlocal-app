import { useState, useEffect } from 'react';
import { getDocs } from 'firebase/firestore';

export const useFirestoreQuery = (queryRef) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const querySnapshot = await getDocs(queryRef);
        const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setData(docs);
        setError(null);
      } catch (err) {
        console.error("Error in useFirestoreQuery:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [queryRef]); // Will re-run if the query object reference changes

  return { data, loading, error };
};