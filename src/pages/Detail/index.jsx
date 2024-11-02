import { Link, useParams } from 'react-router-dom';
import useFetchDetails from '../../hooks/useFetchDetails';
import { useSelector } from 'react-redux';
import { FaList, FaHeart } from 'react-icons/fa';
import { IoIosBookmark } from 'react-icons/io';
import VideoPlay from '../../components/VideoPlay';
import useFetch from '../../hooks/useFetch';

const DetailPage = () => {
  const { media_type, id } = useParams();
  const imageURL = useSelector((state) => state.movieData.imageURL);

  const { data } = useFetchDetails(`${media_type}/${id}`);
  const { data: castData } = useFetchDetails(`${media_type}/${id}/credits`);
  const { data: recommendationData } = useFetch(`${media_type}/${id}/recommendations`);

  const formatRuntime = (runtime) => {
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    return `${hours}h ${minutes}m`;
  };

  const writer = castData?.crew
    ?.filter((el) => el?.job === 'Writer')
    ?.map((el) => el?.name)
    ?.join(', ');

  const topCast = castData?.cast
    ?.filter((el) => el?.popularity)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, 10);

  const formatCurrency = (amount) => {
    return amount ? `$${amount.toLocaleString()}` : 'N/A';
  };

  return (
    <section>
      <div>
        <div className="flex items-center">
          <div className="max-w-[200px] w-full min-h-auto rounded-lg">
            <img src={data?.poster_path ? imageURL + data.poster_path : '/default-poster.png'} className="w-full h-full object-cover rounded-lg" alt={data?.title || data?.name || 'Poster'} />
          </div>
          <div className="ml-10">
            <div id="title" className="text-[2.6rem] flex items-center gap-4">
              <h1 className="font-bold">{data?.title || data?.name}</h1>
              <h1 className="font-light">({new Date(data?.release_date || data?.first_air_date).getFullYear()})</h1>
            </div>

            <div id="subtitle" className="text-[1.2rem] flex items-center gap-4 font-medium">
              <h2 id="release-date">{data?.release_date || data?.first_air_date}</h2>
              <span>•</span>
              {data?.genres?.map((genre) => (
                <span key={genre?.id}>{genre?.name}</span>
              ))}
              <span>•</span>
              {data?.runtime && <span id="runtime">{formatRuntime(data.runtime)}</span>}
              <span>•</span>
              {data?.vote_average && <span id="vote-average">⭐ {data.vote_average.toFixed(1)}</span>}
            </div>

            <div id="icon" className="flex gap-4 mt-4">
              <div className="icon-button group p-6 bg-gray-900 text-white rounded-full text-xl cursor-pointer relative">
                <FaList />
                <span className="tooltip">Add to list</span>
              </div>
              <div className="icon-button group p-6 bg-gray-900 text-white rounded-full text-xl cursor-pointer relative">
                <FaHeart />
                <span className="tooltip">Mark as favorite</span>
              </div>
              <div className="icon-button group p-6 bg-gray-900 text-white rounded-full text-xl cursor-pointer relative">
                <IoIosBookmark />
                <span className="tooltip">Add to your watchlist</span>
              </div>
            </div>

            <div id="overview" className="my-8">
              <h2 className="text-[1.6rem] font-semibold mb-2">Overview</h2>
              <p className="text-[1.2rem]">{data?.overview || 'No overview available.'}</p>
            </div>

            <div id="writer" className="my-8">
              <h2 className="text-[1.6rem] font-semibold mb-2">Writer</h2>
              <p className="text-[1.2rem]">{writer || 'No writer information available.'}</p>
            </div>
          </div>
        </div>

        <div className="relative my-20">
          <div className="flex justify-between items-center">
            <h1 className="text-[1.8rem] font-semibold my-4">Top Cast</h1>
            <button type="button" className="text-[1.1rem] hover:text-red-400">
              See More
            </button>
          </div>
          <div className="flex overflow-x-auto scrollbar-thin">
            <div className="flex">
              {topCast?.map((actor) => (
                <div key={actor.id} className="relative w-64 min-h-[200px] bg-transparent rounded-lg overflow-hidden mr-8">
                  <div>
                    <img src={imageURL + actor.profile_path} className="w-full h-full object-cover rounded-lg mb-2" alt={actor?.name} />
                    <h1 className="text-[1.2rem] font-semibold">{actor?.name}</h1>
                    <h2 className="text-[1rem] mb-5">{actor?.character}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className=" w-full flex justify-between gap-14 my-20 bg-gray-100 p-6 rounded-lg">
            <div className="border-r-2 border-r-gray-900 w-full">
              <h1 className="text-[1.3rem] font-semibold mb-2">Original Title</h1>
              <span className="text-[1.2rem]">{data?.original_title || 'N/A'}</span>
            </div>

            <div className="border-r-2 border-r-gray-900 w-full">
              <h1 className="text-[1.3rem] font-semibold mb-2">Original Language</h1>
              <span className="text-[1.2rem]">{data?.original_language?.toUpperCase() || 'N/A'}</span>
            </div>

            <div className="border-r-2 border-r-gray-900 w-full">
              <h1 className="text-[1.3rem] font-semibold mb-2">Budget</h1>
              <span className="text-[1.2rem]">{formatCurrency(data?.budget)}</span>
            </div>

            <div className="w-full">
              <h1 className="text-[1.3rem] font-semibold mb-2">Revenue</h1>
              <span className="text-[1.2rem]">{formatCurrency(data?.revenue)}</span>
            </div>
          </div>

          <div>
            <div className="w-full h-full">
              <VideoPlay data={data} media_type={media_type} />
            </div>
          </div>

          <div className="flex flex-col my-14">
            <h1 className="text-[1.8rem] font-semibold my-4">Recommendations</h1>

            <div className="flex overflow-x-auto scrollbar-thin">
              <div className="flex">
                {recommendationData?.map((data) => (
                  <div key={data.id} className="relative w-56 min-h-[200px] bg-transparent rounded-lg overflow-hidden mr-8 ">
                    <div>
                      <div className="w-full h-full ">
                        <img src={imageURL + data?.poster_path} className="w-full h-full object-cover rounded-lg mb-2 " alt={data?.name} />
                      </div>
                      <h1 className="text-[1.2rem] font-semibold">{data?.title}</h1>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
