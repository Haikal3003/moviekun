import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MoviePage from '../pages/Movie';
import HomePage from '../pages/Home';
import TvShowPage from '../pages/TvShow';
import DetailPage from '../pages/Detail';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: '/movies',
        element: <MoviePage />,
      },

      {
        path: '/tv',
        element: <TvShowPage />,
      },

      {
        path: '/movies/:media_type/:id',
        element: <DetailPage />,
      },

      {
        path: '/tv/:media_type/:id',
        element: <DetailPage />,
      },

      {
        path: '/:media_type/:id',
        element: <DetailPage />,
      },
    ],
  },
]);

export default router;
