import { createSlice } from '@reduxjs/toolkit';

export const watchlistSlice = createSlice({
  name: 'watchlist',
  initialState: [],
  reducers: {
    setWatchlist: (state, action) => {
      return action.payload;
    },
  },
});

export const { setWatchlist } = watchlistSlice.actions;

export default watchlistSlice.reducer;
