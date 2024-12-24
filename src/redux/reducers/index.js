import { combineReducers } from '@reduxjs/toolkit';
import pokemonReducer from './pokemonReducer';
import favoritesReducer from './favoritesReducer';

const rootReducer = combineReducers({
  pokemons: pokemonReducer,
  favorites: favoritesReducer
});

export default rootReducer;