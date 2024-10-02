import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import MoviesPage from '../pages/Movies/MoviesPage';
import SeriesPage from '../pages/Series/SeriesPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '',
        element: <MoviesPage />,
      },
      {
        path: '/series',
        element: <SeriesPage />,
      },
    ],
  },
]);

export default router;
