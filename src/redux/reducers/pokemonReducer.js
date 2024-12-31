import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemons } from '../actions';

const initialState = {
  data: [],  
  loading: false,
  error: null,
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {}, 
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        console.log('Pokemon data loaded:', action.payload); 
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default pokemonSlice.reducer;