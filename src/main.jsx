import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './routes';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common['Authorization'] = `Bearer ${process.env.REACT_APP_TMDB_ACCESS_TOKEN}`;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
