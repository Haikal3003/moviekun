import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetchMultiplePages = (endpoint, total_page = 1) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);

      const allPageData = [];

      for (let page = 1; page <= total_page; page++) {
        const res = await axios(`${endpoint}?language=en-US&page=${page}`);
        allPageData.push(...res.data.results);
      }

      setData(allPageData);

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

export default useFetchMultiplePages;
