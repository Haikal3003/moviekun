import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchDiscover = (endpoint, selectedGenre, page) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(endpoint, {
          params: {
            with_genres: selectedGenre,
            page: page,
          },
        });

        setData(response.data.results);
        setTotalPages(response.data.total_pages || 0);
      } catch (error) {
        console.error('Error fetching discover data', error);
      }
    };

    if (selectedGenre) {
      fetchData();
    }
  }, [endpoint, selectedGenre, page]);

  return { data, totalPages };
};

export default useFetchDiscover;
