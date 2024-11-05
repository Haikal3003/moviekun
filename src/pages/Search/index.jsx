import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Card from '../../components/Card';

const SearchPage = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/search/multi`, {
          params: {
            query: query,
          },
        });
        setData(response.data.results);
      } catch (err) {
        setError('Failed to fetch search results');
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  if (loading) return <div className="w-full min-h-[90vh] flex justify-center items-center text-[1.3rem]">Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <section className="relative flex flex-col">
      <h1 className="text-center mb-10 text-[1.4rem]">Search: "{query}"</h1>
      <div className="grid grid-cols-6 gap-4">{data.length > 0 ? data.map((item) => <Card key={item.id} data={item} media_type={item.media_type} />) : <h1 className="text-center text-[1.2rem]">No results found for "{query}"</h1>}</div>
    </section>
  );
};

export default SearchPage;
