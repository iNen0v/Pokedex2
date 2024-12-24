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

export default store;