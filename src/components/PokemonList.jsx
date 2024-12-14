import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import PokemonCard from './PokemonCard';

function PokemonList({ pokemons = [], favorites = [], showOnlyFavorites = false }) {
  const safePokemons = Array.isArray(pokemons) ? pokemons : [];
  const safeFavorites = Array.isArray(favorites) ? favorites : [];

  const filteredPokemons = showOnlyFavorites
    ? safePokemons.filter(pokemon => {
        const id = pokemon.id || (pokemon.url && pokemon.url.split('/')[6]);
        return id && safeFavorites.includes(id);
      })
    : safePokemons;

  return (
    <motion.div className="pokemon-list">
      {filteredPokemons.map((pokemon, index) => {
        const id = pokemon.id || (pokemon.url && pokemon.url.split('/')[6]);
        if (!id) return null; 

        return (
          <Link
            to={`/pokemon/${id}`}
            key={id}
          >
            <PokemonCard 
              pokemon={pokemon} 
              delay={index * 0.1}
              isFavorite={safeFavorites.includes(id)}
            />
          </Link>
        );
      })}
    </motion.div>
  );
}

export default PokemonList;