import { useSelector } from 'react-redux';
import { useUserContext } from '../../context/userContext';
import { useState } from 'react';

const ProfilePage = () => {
  const user = useUserContext();
  const favorites = useSelector((state) => state.favoriteData);
  const watchlist = useSelector((state) => state.watchlistData);
  const imageURL = useSelector((state) => state.movieData.imageURL);

  const [activeList, setActiveList] = useState('');

  const handleListClick = (listType) => {
    setActiveList(listType);
  };

  const userName = user.userData ? `${user.userData.firstName} ${user.userData.lastName}` : 'Guest';
  const userEmail = user.userData ? user.userData.email : 'Not logged in';

  return (
    <section className="relative w-full">
      <div>
        <div className="w-full p-14 bg-gray-800 rounded-lg flex items-center space-x-8 text-white mb-14">
          <img src="./src/assets/images/avatar.png" className="max-w-[240px] w-full" alt="" />
          <div>
            <h1 className="text-[2.5rem] font-bold">{userName}</h1>
            <h3 className="text-[1.5rem]">{userEmail}</h3>
          </div>
        </div>

        <div className="relative w-full h-full flex gap-4">
          <div className="flex flex-col w-[140px] text-[1.1rem] font-semibold gap-2">
            <div className={`p-5 rounded-lg cursor-pointer ${activeList === 'favorites' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`} onClick={() => handleListClick('favorites')}>
              <span>Favorites</span>
            </div>

            <div className={`p-5 rounded-lg cursor-pointer ${activeList === 'watchlist' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'}`} onClick={() => handleListClick('watchlist')}>
              <span>Watchlist</span>
            </div>
          </div>

          <div className="flex-1 text-white rounded-lg">
            {activeList === 'favorites' && (
              <div>
                {favorites.length > 0 ? (
                  <div className="grid grid-cols-5 gap-3">
                    {favorites.map((item, index) => (
                      <div key={item.id + index} className="max-w-[200px] h-auto rounded-lg">
                        <div className="w-full h-full">
                          <img src={imageURL + item.data.poster_path} className="w-full h-full object-cover rounded-lg" alt="" />
                        </div>
                        <h1 className="text-black mt-4 font-semibold">{item.data.title || item.data.name}</h1>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <h1 className="text-black">Favorites is empty</h1>
                  </div>
                )}
              </div>
            )}

            {activeList === 'watchlist' && (
              <div>
                {watchlist.length > 0 ? (
                  <div className="grid grid-cols-5 gap-3">
                    {watchlist.map((item, index) => (
                      <div key={item.id + index} className="max-w-[200px] h-auto rounded-lg">
                        <div className="w-full h-full">
                          <img src={imageURL + item.data.poster_path} className="w-full h-full object-cover rounded-lg" alt="" />
                        </div>
                        <h1 className="text-black mt-4 font-semibold">{item.data.title || item.data.name}</h1>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center items-center w-full h-full">
                    <h1 className="text-black">Watchlist is empty</h1>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
