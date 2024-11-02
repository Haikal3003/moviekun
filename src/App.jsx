import { Outlet } from 'react-router-dom';
import axios from 'axios';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import { useDispatch } from 'react-redux';
import { setBannerData, setImageURL } from './store/movieSlice';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  const fetchTrendingMovie = async () => {
    try {
      const res = await axios.get('/trending/movie/week');
      dispatch(setBannerData(res.data.results));
    } catch (error) {
      console.log('error: ', error);
    }
  };

  const fetchConfiguration = async () => {
    try {
      const res = await axios.get('/configuration');
      dispatch(setImageURL(res.data.images.secure_base_url + 'original'));
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  useEffect(() => {
    fetchTrendingMovie();
    fetchConfiguration();
  }, []);

  return (
    <main className="relative font-poppins ">
      <div className="px-[5rem] py-[2.5rem]">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </main>
  );
}

export default App;
