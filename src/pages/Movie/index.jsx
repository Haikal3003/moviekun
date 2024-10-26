import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Banner from '../../components/Banner';
import useFetchGenres from '../../hooks/useFetchGenres';

const MoviePage = () => {
  const bannerDataMovie = useSelector((state) => state.movieData.bannerData);
  const imageURL = useSelector((state) => state.movieData.imageURL);

  const { data: genres } = useFetchGenres('/genre/movie/list');

  return (
    <section>
      <Banner bannerData={bannerDataMovie} imageURL={imageURL} />
    </section>
  );
};

export default MoviePage;
