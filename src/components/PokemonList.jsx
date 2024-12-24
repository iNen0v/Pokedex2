import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import PokemonCard from './PokemonCard';
import '../styles/PokemonList.scss';

const LoadingAnimation = () => (
 <div className="loading-animation">
   <motion.div 
     className="loading-pokeball"
     animate={{ 
       rotate: 360,
       scale: [1, 1.2, 1]
     }}
     transition={{ 
       rotate: { duration: 2, repeat: Infinity, ease: "linear" },
       scale: { duration: 1, repeat: Infinity }
     }}
   >
     <div className="pokeball"></div>
   </motion.div>
   <p>Loading Pokémon...</p>
 </div>
);

function PokemonList({ pokemons, onPokemonSelect, selectedPokemonId, battleMode, onToggleBattleMode, loading }) {
 const navigate = useNavigate();
 const favorites = useSelector(state => state.favorites);
 const [showFavorites, setShowFavorites] = useState(false);
 const [currentPage, setCurrentPage] = useState(1);
 const pokemonsPerPage = 12;

 const displayedPokemons = showFavorites
   ? pokemons.filter(pokemon => favorites.includes(pokemon.id))
   : pokemons;

 const indexOfLastPokemon = currentPage * pokemonsPerPage;
 const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
 const currentPokemons = displayedPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon);
 const totalPages = Math.ceil(displayedPokemons.length / pokemonsPerPage);

 const handlePageChange = (pageNumber) => {
   setCurrentPage(pageNumber);
   window.scrollTo({ top: 0, behavior: 'smooth' });
 };

 const containerStyle = {
   width: '100%',
   backgroundColor: '#1a1a1a',
   padding: '20px'
 };

 const headerStyle = {
   maxWidth: '1400px',
   margin: '0 auto 20px',
   display: 'flex',
   gap: '10px',
   alignItems: 'center'
 };

 const buttonStyle = (isActive) => ({
   backgroundColor: isActive ? '#ff4444' : '#4CAF50',
   color: 'white',
   border: 'none',
   padding: '10px 20px',
   borderRadius: '5px',
   cursor: 'pointer'
 });

 const battleButtonStyle = {
   backgroundColor: battleMode ? '#ff4444' : '#dc2626',
   color: 'white',
   border: 'none',
   padding: '10px 20px',
   borderRadius: '5px',
   cursor: 'pointer'
 };

 const listStyle = {
   display: 'flex',
   flexWrap: 'wrap',
   gap: '20px',
   maxWidth: '1400px',
   margin: '0 auto'
 };

 const cardStyle = {
   width: '300px'
 };

 return (
   <div style={containerStyle}>
     <div style={headerStyle}>
       <button 
         style={buttonStyle(showFavorites)}
         onClick={() => setShowFavorites(!showFavorites)}
       >
         {showFavorites ? 'Show All' : 'Show Favorites'}
       </button>

       <button 
         style={battleButtonStyle}
         onClick={() => navigate('/battle')}
       >
         Battle Arena
       </button>

       {showFavorites && (
         <span style={{ color: 'white' }}>
           Showing {displayedPokemons.length} favorite Pokemon
         </span>
       )}
     </div>

     {loading ? (
       <LoadingAnimation />
     ) : currentPokemons.length === 0 ? (
       <div className="no-results">
         <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
         >
           <h3>No Pokémon Found</h3>
           <p>Try adjusting your filters or search criteria</p>
         </motion.div>
       </div>
     ) : (
       <div style={listStyle}>
         {currentPokemons.map((pokemon, index) => (
           <motion.div
             key={pokemon.id}
             style={cardStyle}
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 0.3, delay: index * 0.05 }}
             onClick={(e) => onPokemonSelect && onPokemonSelect(pokemon)}
           >
             <Link 
               to={`/pokemon/${pokemon.id}`}
               style={{ textDecoration: 'none' }}
               onClick={(e) => battleMode && e.preventDefault()}
             >
               <PokemonCard
                 pokemon={pokemon}
                 isFavorite={favorites.includes(pokemon.id)}
                 isSelected={selectedPokemonId === pokemon.id}
               />
             </Link>
           </motion.div>
         ))}
       </div>
     )}

     {totalPages > 1 && !loading && (
       <div className="pokemon-list__pagination">
         <button
           onClick={() => handlePageChange(currentPage - 1)}
           disabled={currentPage === 1}
           className="pokemon-list__pagination-button"
         >
           Previous
         </button>

         <div className="pokemon-list__pagination-numbers">
           {[...Array(totalPages)].map((_, index) => (
             <button
               key={index + 1}
               onClick={() => handlePageChange(index + 1)}
               className={`pokemon-list__pagination-number ${
                 currentPage === index + 1 ? 'active' : ''
               }`}
             >
               {index + 1}
             </button>
           ))}
         </div>

         <button
           onClick={() => handlePageChange(currentPage + 1)}
           disabled={currentPage === totalPages}
           className="pokemon-list__pagination-button"
         >
           Next
         </button>
       </div>
     )}
   </div>
 );
}

export default PokemonList;