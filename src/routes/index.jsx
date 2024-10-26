import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MoviePage from '../pages/Movie';
import SeriesPage from '../pages/Series';
import HomePage from '../pages/Home';

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
        path: '/movie',
        element: <MoviePage />,
      },
      {
        path: '/series',
        element: <SeriesPage />,
      },
    ],
  },
]);

export default router;
