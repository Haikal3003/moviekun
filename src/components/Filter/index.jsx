import React, { useState } from 'react';
import { IoChevronForward } from 'react-icons/io5';

const Filter = ({ selectedGenre, setSelectedGenre, genres }) => {
  const [showFilter, setShowFilter] = useState(true);

  const handleSelectedGenre = (id) => {
    setSelectedGenre((prevSelected) => {
      if (prevSelected.includes(id)) {
        return prevSelected.filter((genreId) => genreId !== id);
      } else {
        return [...prevSelected, id];
      }
    });
  };

  return (
    <div id="filter" className="relative w-full max-w-[240px] h-full">
      <div className="flex items-center justify-between p-4 w-full border border-gray-200 rounded-t-lg cursor-pointer" onClick={() => setShowFilter(!showFilter)} aria-expanded={showFilter}>
        <h1 className="font-semibold text-[1.4rem]">Filters</h1>
        <IoChevronForward className={`text-[1.4rem] text-gray-800 transform ${showFilter ? 'rotate-90' : ''}`} />
      </div>

      {showFilter && (
        <div id="content-filter" className="w-full border border-gray-200 rounded-b-lg mb-5">
          <div className="flex flex-col p-4">
            <div className="pb-8">
              <h2 className="text-[1.2rem] font-semibold my-3">Genres</h2>
              <div className="grid grid-cols-2 gap-4">
                {genres.map((genre) => (
                  <button key={genre.id} type="button" onClick={() => handleSelectedGenre(genre.id)} className={`p-2 border ${selectedGenre.includes(genre.id) ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-300'} rounded-full`}>
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Filter;
