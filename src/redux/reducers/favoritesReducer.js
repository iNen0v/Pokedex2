import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action) => {
      const pokemonId = action.payload;
      const index = state.indexOf(pokemonId);
      if (index === -1) {
        state.push(pokemonId);
      } else {
        state.splice(index, 1);
      }
    }
  }
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;