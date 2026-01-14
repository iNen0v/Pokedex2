import { createSlice } from '@reduxjs/toolkit';

function loadFavoritesFromStorage() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem('favorites');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Normalize to numbers, drop invalid entries.
    return parsed
      .map((id) => Number(id))
      .filter((id) => Number.isFinite(id));
  } catch {
    return [];
  }
}

const initialState = loadFavoritesFromStorage();

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