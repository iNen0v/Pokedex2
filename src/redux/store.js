import { configureStore } from '@reduxjs/toolkit';
import pokemonReducer from './reducers/pokemonReducer';
import favoritesReducer from './reducers/favoritesReducer';

const store = configureStore({
  reducer: {
    pokemons: pokemonReducer,
    favorites: favoritesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false
    })
});

// Persist favorites across reloads.
let lastFavoritesJson = null;
store.subscribe(() => {
  if (typeof window === 'undefined') return;
  try {
    const favorites = store.getState().favorites || [];
    const json = JSON.stringify(favorites);
    if (json === lastFavoritesJson) return;
    lastFavoritesJson = json;
    window.localStorage.setItem('favorites', json);
  } catch {
    // Ignore storage failures (private mode, quota, disabled storage, etc.)
  }
});

export default store;