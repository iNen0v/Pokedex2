import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const typeInteractions = {
  grass: {
    weakTo: ['fire', 'ice', 'flying', 'poison', 'bug'],
    strongAgainst: ['water', 'ground', 'rock'],
    resistantTo: ['water', 'grass', 'electric', 'ground']
  },
  fire: {
    weakTo: ['water', 'ground', 'rock'],
    strongAgainst: ['grass', 'ice', 'bug', 'steel'],
    resistantTo: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy']
  },
  water: {
    weakTo: ['electric', 'grass'],
    strongAgainst: ['fire', 'ground', 'rock'],
    resistantTo: ['fire', 'water', 'ice', 'steel']
  },
  electric: {
    weakTo: ['ground'],
    strongAgainst: ['water', 'flying'],
    resistantTo: ['electric', 'flying', 'steel']
  },
  ice: {
    weakTo: ['fire', 'fighting', 'rock', 'steel'],
    strongAgainst: ['grass', 'ground', 'flying', 'dragon'],
    resistantTo: ['ice']
  },
  fighting: {
    weakTo: ['flying', 'psychic', 'fairy'],
    strongAgainst: ['normal', 'ice', 'rock', 'dark', 'steel'],
    resistantTo: ['bug', 'rock', 'dark']
  },
  poison: {
    weakTo: ['ground', 'psychic'],
    strongAgainst: ['grass', 'fairy'],
    resistantTo: ['fighting', 'poison', 'bug', 'grass', 'fairy']
  },
  ground: {
    weakTo: ['water', 'grass', 'ice'],
    strongAgainst: ['fire', 'electric', 'poison', 'rock', 'steel'],
    resistantTo: ['poison', 'rock']
  },
  flying: {
    weakTo: ['electric', 'ice', 'rock'],
    strongAgainst: ['grass', 'fighting', 'bug'],
    resistantTo: ['grass', 'fighting', 'bug', 'ground']
  },
  psychic: {
    weakTo: ['bug', 'ghost', 'dark'],
    strongAgainst: ['fighting', 'poison'],
    resistantTo: ['fighting', 'psychic']
  },
  bug: {
    weakTo: ['fire', 'flying', 'rock'],
    strongAgainst: ['grass', 'psychic', 'dark'],
    resistantTo: ['fighting', 'ground', 'grass']
  },
  rock: {
    weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'],
    strongAgainst: ['fire', 'ice', 'flying', 'bug'],
    resistantTo: ['normal', 'fire', 'poison', 'flying']
  },
  ghost: {
    weakTo: ['ghost', 'dark'],
    strongAgainst: ['psychic', 'ghost'],
    resistantTo: ['poison', 'bug', 'normal', 'fighting']
  },
  dragon: {
    weakTo: ['ice', 'dragon', 'fairy'],
    strongAgainst: ['dragon'],
    resistantTo: ['fire', 'water', 'electric', 'grass']
  },
  dark: {
    weakTo: ['fighting', 'bug', 'fairy'],
    strongAgainst: ['psychic', 'ghost'],
    resistantTo: ['ghost', 'dark', 'psychic']
  },
  steel: {
    weakTo: ['fire', 'fighting', 'ground'],
    strongAgainst: ['ice', 'rock', 'fairy'],
    resistantTo: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy']
  },
  fairy: {
    weakTo: ['poison', 'steel'],
    strongAgainst: ['fighting', 'dragon', 'dark'],
    resistantTo: ['fighting', 'bug', 'dark', 'dragon']
  },
  normal: {
    weakTo: ['fighting'],
    strongAgainst: [],
    resistantTo: ['ghost']
  }
};

export const fetchPokemons = createAsyncThunk(
  'pokemons/fetchAll',
  async () => {
    try {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
      
      const detailedPokemons = await Promise.all(
        response.data.results.map(async (pokemon) => {
          const details = await axios.get(pokemon.url);
          
          const enhancedTypes = details.data.types.map(type => {
            const interactions = typeInteractions[type.type.name];
            return {
              ...type,
              weakTo: interactions.weakTo,
              strongAgainst: interactions.strongAgainst,
              resistantTo: interactions.resistantTo
            };
          });

          return {
            id: details.data.id,
            name: details.data.name,
            sprites: details.data.sprites,
            stats: details.data.stats,
            types: enhancedTypes,
            height: details.data.height,
            weight: details.data.weight,
            abilities: details.data.abilities,
            base_experience: details.data.base_experience,
            moves: details.data.moves
          };
        })
      );

      return detailedPokemons.sort((a, b) => a.id - b.id);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
      throw error;
    }
  }
);