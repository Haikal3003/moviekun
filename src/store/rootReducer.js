import { combineReducers } from 'redux';
import movieReducer from './movieSlice';
import favoriteReducer from './favoriteSlice';
import watchlistReducer from './watchlistSlice';

const rootReducer = combineReducers({
  movieData: movieReducer,
  favoriteData: favoriteReducer,
  watchlistData: watchlistReducer,
});

export default rootReducer;
