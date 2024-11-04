import React, { useState } from 'react';
import Card from '../../components/Card';
import Filter from '../../components/Filter';
import useFetchGenres from '../../hooks/useFetchGenres';
import useFetch from '../../hooks/useFetch';
import useFetchDiscover from '../../hooks/useFetchDiscover';
import Pagination from '../../components/Pagination';

const MoviePage = () => {
  const [selectedGenre, setSelectedGenre] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const itemsPerPage = 20;

  const { data: movies, totalPages: totalPagesMovies } = useFetch(`/movie/popular`, currentPage);
  const { data: genres } = useFetchGenres('/genre/movie/list');
  const genreQuery = selectedGenre.join(',');

  const { data: filterMovie, totalPages: totalPagesWithGenre } = useFetchDiscover('/discover/movie', genreQuery, currentPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const displayMovies = selectedGenre.length > 0 ? filterMovie : movies;
  const totalPageCount = selectedGenre.length > 0 ? totalPagesWithGenre : totalPagesMovies;

  const filteredMovies = displayMovies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <section className="relative w-full h-auto">
      <div className="flex justify-between gap-8">
        <Filter selectedGenre={selectedGenre} setSelectedGenre={setSelectedGenre} genres={genres} media_type="Movies" />

        <div className="flex flex-col w-full">
          <h1 className="mb-4 text-[1.5rem] font-semibold">Search Movie</h1>
          <div id="search" className="flex items-center w-full bg-gray-100 mb-4 rounded-xl p-5">
            <input type="search" placeholder="Search Movie..." className="w-full text-[1.1rem] bg-transparent outline-none" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {filteredMovies.length > 0 ? (
              filteredMovies.map((movie, index) => <Card key={`${movie.id}-${index}`} data={movie} media_type={'movie'} />)
            ) : (
              <h1 className="absolute left-[60%] top-1/2 -translate-x-[60%] -translate-y-1/2 text-[1.2rem]">Movie Not Found</h1>
            )}
          </div>
        </div>
      </div>
      <Pagination totalPages={Math.ceil(totalPageCount / itemsPerPage)} currentPage={currentPage} onPageChange={handlePageChange} />
    </section>
  );
};

export default MoviePage;
