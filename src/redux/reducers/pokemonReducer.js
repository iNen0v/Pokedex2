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

const getStat = (pokemon, statName) => {
  const stat = pokemon.stats.find(s => s.stat.name === statName);
  return stat ? stat.base_stat : 0;
};

const applyFilters = (state) => {
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
        const attackStat = getStat(pokemon, 'attack');
        if (attackStat < state.attackFilter) return false;
      }

      // Defense filter
      if (state.defenseFilter > 0) {
        const defenseStat = getStat(pokemon, 'defense');
        if (defenseStat < state.defenseFilter) return false;
      }

      return true;
    });

    state.pokemonCount = state.filteredData.length;
  }
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {
    setTypeFilter: (state, action) => {
      const newTypes = Array.isArray(action.payload) ? action.payload : [action.payload];
      state.types = newTypes;
      applyFilters(state);
    },

    setAttackFilter: (state, action) => {
      state.attackFilter = action.payload;
      applyFilters(state);
    },

    setDefenseFilter: (state, action) => {
      state.defenseFilter = action.payload;
      applyFilters(state);
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
        // Apply existing filters if any, otherwise just set all
        if (state.types.length > 0 || state.attackFilter > 0 || state.defenseFilter > 0) {
            applyFilters(state);
        } else {
            state.filteredData = action.payload;
            state.pokemonCount = action.payload.length;
        }
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