import { createSlice } from '@reduxjs/toolkit';
import { fetchPokemons } from '../actions';

const initialState = {
  data: [],
  filteredData: [],
  types: [],
  attackFilter: 0,
  defenseFilter: 0,
  loading: false,
  error: null,
  pokemonCount: 0
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setTypeFilter: (state, action) => {
      const newTypes = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.types = newTypes;
      
      if (state.data.length > 0) {
        state.filteredData = state.data.filter(pokemon => {
          // Type filter
          if (state.types.length > 0) {
            const pokemonTypes = pokemon.types.map(t => t.type.name);
            const hasMatchingType = state.types.some(type => pokemonTypes.includes(type));
            if (!hasMatchingType) return false;
          }

          // Attack filter
          if (state.attackFilter > 0) {
            const attackStat = pokemon.stats[1].base_stat;
            if (attackStat < state.attackFilter) return false;
          }

          // Defense filter
          if (state.defenseFilter > 0) {
            const defenseStat = pokemon.stats[2].base_stat;
            if (defenseStat < state.defenseFilter) return false;
          }

          return true;
        });

        state.pokemonCount = state.filteredData.length;
      }
    },

    setAttackFilter: (state, action) => {
      state.attackFilter = action.payload;
      
      if (state.data.length > 0) {
        state.filteredData = state.data.filter(pokemon => {
          // Type filter
          if (state.types.length > 0) {
            const pokemonTypes = pokemon.types.map(t => t.type.name);
            const hasMatchingType = state.types.some(type => pokemonTypes.includes(type));
            if (!hasMatchingType) return false;
          }

          // Attack filter
          if (state.attackFilter > 0) {
            const attackStat = pokemon.stats[1].base_stat;
            if (attackStat < state.attackFilter) return false;
          }

          // Defense filter
          if (state.defenseFilter > 0) {
            const defenseStat = pokemon.stats[2].base_stat;
            if (defenseStat < state.defenseFilter) return false;
          }

          return true;
        });

        state.pokemonCount = state.filteredData.length;
      }
    },

    setDefenseFilter: (state, action) => {
      state.defenseFilter = action.payload;
      
      if (state.data.length > 0) {
        state.filteredData = state.data.filter(pokemon => {
          // Type filter
          if (state.types.length > 0) {
            const pokemonTypes = pokemon.types.map(t => t.type.name);
            const hasMatchingType = state.types.some(type => pokemonTypes.includes(type));
            if (!hasMatchingType) return false;
          }

          // Attack filter
          if (state.attackFilter > 0) {
            const attackStat = pokemon.stats[1].base_stat;
            if (attackStat < state.attackFilter) return false;
          }

          // Defense filter
          if (state.defenseFilter > 0) {
            const defenseStat = pokemon.stats[2].base_stat;
            if (defenseStat < state.defenseFilter) return false;
          }

          return true;
        });

        state.pokemonCount = state.filteredData.length;
      }
    },

    clearFilters: (state) => {
      state.types = [];
      state.attackFilter = 0;
      state.defenseFilter = 0;
      state.filteredData = state.data;
      state.pokemonCount = state.data.length;
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.filteredData = action.payload;
        state.pokemonCount = action.payload.length;
      })
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { 
  setTypeFilter, 
  setAttackFilter, 
  setDefenseFilter, 
  clearFilters 
} = pokemonSlice.actions;

export default pokemonSlice.reducer;