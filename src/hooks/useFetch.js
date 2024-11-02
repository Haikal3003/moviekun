import axios from 'axios';
import { useEffect, useState } from 'react';

const useFetch = (endpoint, page = 1) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(endpoint, {
        params: {
          page: page,
        },
      });

      setData(res.data.results);
      setTotalPages(res.data.total_pages);
      setLoading(false);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [endpoint, page]);

  return { data, totalPages, loading };
};

export default useFetch;
