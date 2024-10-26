import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (endpoint, page = 1) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios(`${endpoint}?language=en-US&page=${page}`);
      setData(res.data.results);

      setLoading(false);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint]);

  return { data, loading };
};

export default useFetch;
