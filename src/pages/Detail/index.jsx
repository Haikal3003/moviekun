import { useParams } from 'react-router-dom';
import useFetchDetails from '../../hooks/useFetchDetails';
import { useDispatch, useSelector } from 'react-redux';
import { FaList, FaHeart } from 'react-icons/fa';
import { IoIosBookmark } from 'react-icons/io';
import VideoPlay from '../../components/VideoPlay';
import useFetch from '../../hooks/useFetch';
import { useUserContext } from '../../context/userContext';
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { setFavorites } from '../../store/favoriteSlice';
import { setWatchlist } from '../../store/watchlistSlice';
import { addToFavorite, addToWatchlist } from '../../services/userService';

const DetailPage = () => {
  const { media_type, id } = useParams();
  const user = useUserContext();
  const dispatch = useDispatch();

  const imageURL = useSelector((state) => state.movieData.imageURL);
  const favorites = useSelector((state) => state.favoriteData);
  const watchlist = useSelector((state) => state.watchlistData);

  const { data } = useFetchDetails(`${media_type}/${id}`);
  const { data: castData } = useFetchDetails(`${media_type}/${id}/credits`);

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

  const storeData = {
    media_type: media_type,
    data: data,
  };

  const handleAddFavorite = async () => {
    if (!user.isAuthenticated) {
      console.log('User is not authenticated');
      return;
    }

    const isItemExist = favorites.some((item) => item.data.id === data.id);
    if (isItemExist) {
      console.log('Movie / TV Show already exists in favorites');
      return;
    }

    const userId = user.userData['uid'];
    try {
      await addToFavorite(userId, storeData);
      console.log('Item added to favorites');
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  const handleAddWatchlist = async () => {
    if (!user.isAuthenticated) {
      console.log('User is not authenticated');
      return;
    }

    const isItemExist = watchlist.some((item) => item.data.id === data.id);
    if (isItemExist) {
      console.log('Movie / TV Show already exists in watchlist');
      return;
    }

    const userId = user.userData['uid'];

    try {
      await addToWatchlist(userId, storeData);
    } catch (error) {
      console.error('Error adding to watchlist:', error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user.isAuthenticated || !user.userData) {
        console.log('User is not authenticated or userData is missing.');
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, 'Users', user.userData.uid));
        if (userDoc.exists()) {
          dispatch(setFavorites(userDoc.data().favorites || []));
          dispatch(setWatchlist(userDoc.data().watchlist || []));
        } else {
          console.log('User document does not exist.');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [user, dispatch]);

  return (
    <section>
      <div>
        <div className="flex items-center">
          <div className="max-w-[250px] w-full min-h-auto rounded-lg">
            <img src={imageURL + data?.poster_path} className="w-full h-full object-cover rounded-lg" alt={data?.title || data?.name || 'Poster'} />
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
              <div className="icon-button group p-6 bg-gray-900 text-white rounded-full text-xl cursor-pointer relative" onClick={handleAddFavorite}>
                <FaHeart />
                <span className="tooltip">Mark as favorite</span>
              </div>
              <div className="icon-button group p-6 bg-gray-900 text-white rounded-full text-xl cursor-pointer relative" onClick={handleAddWatchlist}>
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

          <div className="w-full flex justify-between gap-14 my-20 bg-gray-100 p-6 rounded-lg">
            <div className="border-r-2 border-r-gray-900 w-full">
              <h1 className="text-[1.3rem] font-semibold mb-2">Original Title</h1>
              <span className="text-[1.2rem]">{data?.original_title || 'N/A'}</span>
            </div>

            <div className="border-r-2 border-r-gray-900 w-full">
              <h1 className="text-[1.3rem] font-semibold mb-2">Original Language</h1>
              <span className="text-[1.2rem]">{data?.original_language || 'N/A'}</span>
            </div>

            <div className="w-full">
              <h1 className="text-[1.3rem] font-semibold mb-2">Budget</h1>
              <span className="text-[1.2rem]">{formatCurrency(data?.budget)}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <h1 className="text-[1.8rem] font-semibold mb-4">Trailer</h1>
          <VideoPlay data={data} media_type={media_type} />
        </div>
      </div>
    </section>
  );
};

export default DetailPage;
