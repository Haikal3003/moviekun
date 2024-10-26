import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchGenres = (endpoint) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(endpoint);
      setLoading(false);
      setData(res.data.genres);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useFetchGenres;
