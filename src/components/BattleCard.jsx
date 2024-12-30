import React from 'react';
import { motion } from 'framer-motion';
import StatsRadar from './StatsRadar';
import '../styles/BattleList.scss';

function BattleCard({ pokemon, isSelected }) {
 if (!pokemon) return null;

 return (
   <motion.div
     className={`battle-card ${isSelected ? 'selected' : ''}`}
     whileHover={{ scale: 1.02 }}
   >
     <div className="pokemon-header">
       <span className="pokemon-id">
         #{String(pokemon.id).padStart(4, '0')}
       </span>
       <span>{pokemon.types?.[0]?.type?.name}</span>
     </div>

     <div className="pokemon-image-container">
       <img
         src={pokemon.sprites?.front_default}
         alt={pokemon.name}
         className="pokemon-image"
       />
     </div>

     <h3 className="pokemon-name">{pokemon.name}</h3>

     <div className="stats-container">
       <StatsRadar stats={pokemon.stats} />
     </div>

     <div className="battle-info">
       <div className="section">
         <div className="section-title">Weak Against:</div>
         <div className="type-list">
           {pokemon.types?.[0]?.weakTo?.map(type => (
             <span key={type} className={`type-badge`} style={{ backgroundColor: getBadgeColor(type) }}>
               {type}
             </span>
           ))}
         </div>
       </div>

       <div className="section">
         <div className="section-title">Strong Against:</div>
         <div className="type-list">
           {pokemon.types?.[0]?.strongAgainst?.map(type => (
             <span key={type} className={`type-badge`} style={{ backgroundColor: getBadgeColor(type) }}>
               {type}
             </span>
           ))}
         </div>
       </div>

       <div className="section">
         <div className="section-title">Resistant To:</div>
         <div className="type-list">
           {pokemon.types?.[0]?.resistantTo?.map(type => (
             <span key={type} className={`type-badge`} style={{ backgroundColor: getBadgeColor(type) }}>
               {type}
             </span>
           ))}
         </div>
       </div>
     </div>
   </motion.div>
 );
}

const getBadgeColor = (type) => {
 const colors = {
   normal: '#A8A878',
   fire: '#F08030',
   water: '#6890F0',
   electric: '#F8D030',
   grass: '#78C850',
   ice: '#98D8D8',
   fighting: '#C03028',
   poison: '#A040A0',
   ground: '#E0C068',
   flying: '#A890F0',
   psychic: '#F85888',
   bug: '#A8B820',
   rock: '#B8A038',
   ghost: '#705898',
   dragon: '#7038F8',
   dark: '#705848',
   steel: '#B8B8D0',
   fairy: '#EE99AC'
 };
 return colors[type] || '#777';
};

export default BattleCard;