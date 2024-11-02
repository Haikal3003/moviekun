import React, { useState } from 'react';
import Card from '../../components/Card';
import Filter from '../../components/Filter';
import useFetchGenres from '../../hooks/useFetchGenres';
import useFetch from '../../hooks/useFetch';
import useFetchDiscover from '../../hooks/useFetchDiscover';
import Pagination from '../../components/Pagination';

const TvShowPage = () => {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const { data: TvShow, totalPages: totalPageTV } = useFetch(`/tv/popular`, currentPage);
  const { data: genres } = useFetchGenres('/genre/tv/list');

  const genreQuery = selectedGenre.join(',');

  const { data: filteredTV, totalPages: totalPagesWithGenre } = useFetchDiscover('/discover/tv', genreQuery, currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayTV = selectedGenre.length > 0 ? filteredTV : TvShow;
  const totalPageCount = selectedGenre.length > 0 ? totalPagesWithGenre : totalPageTV;

  return (
    <section className="relative w-full h-auto">
      <div className="flex justify-between gap-8">
        <Filter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} genres={genres} media_type="tv" />
        <div className="grid grid-cols-5 gap-4">
          {displayTV.map((tv, index) => (
            <Card key={`${tv.id}-${index}`} data={tv} media_type={'tv'} />
          ))}
        </div>
      </div>
      <Pagination totalPages={Math.ceil(totalPageCount / itemsPerPage)} currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
};

export default TvShowPage;
