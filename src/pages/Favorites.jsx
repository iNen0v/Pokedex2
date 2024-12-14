import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useFavorites } from '../hooks/useFavorites';
import PokemonCard from '../components/PokemonCard';

function Favorites() {
 const [favorites] = useFavorites();
 const [favoritePokemons, setFavoritePokemons] = useState([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   const fetchFavorites = async () => {
     try {
       const pokemonData = await Promise.all(
         favorites.map(id => 
           axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
         )
       );
       setFavoritePokemons(pokemonData.map(response => response.data));
     } catch (error) {
       console.error('Error fetching favorites:', error);
     }
     setLoading(false);
   };

   fetchFavorites();
 }, [favorites]);

 return (
   <motion.div 
     className="favorites-page"
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
   >
     <h1>Favorite Pokémon</h1>
     
     {loading ? (
       <div className="loading">Loading...</div>
     ) : favoritePokemons.length === 0 ? (
       <div className="no-favorites">
         No favorite Pokémon yet. Add some from the Pokédex!
       </div>
     ) : (
       <div className="pokemon-grid">
         {favoritePokemons.map(pokemon => (
           <PokemonCard key={pokemon.id} pokemon={pokemon} />
         ))}
       </div>
     )}
   </motion.div>
 );
}

export default Favorites;