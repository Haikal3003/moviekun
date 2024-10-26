import React, { useState } from 'react';
import Banner from '../../components/Banner';
import HorizontalScrollCard from '../../components/HorizontalScrollCard';
import useFetch from '../../hooks/useFetch';

const HomePage = () => {
  const { data: popularMoviesData } = useFetch('/movie/popular', 1);
  const { data: topRatedMoviesData } = useFetch('/movie/top_rated', 1);
  const { data: popularTvData } = useFetch('/tv/popular', 1);
  const { data: topRatedTvData } = useFetch('/tv/top_rated', 1);

  return (
    <section>
      <Banner />
      <HorizontalScrollCard data={popularMoviesData} heading={'Popular Movie'} media_type={'movie'} />
      <HorizontalScrollCard data={topRatedMoviesData} heading={'Top Rated Movie'} media_type={'movie'} />
      <HorizontalScrollCard data={popularTvData} heading={'Popular TV Show'} media_type={'tv'} />
      <HorizontalScrollCard data={topRatedTvData} heading={'Top Rated TV Show'} media_type={'tv'} />
    </section>
  );
};

export default HomePage;
