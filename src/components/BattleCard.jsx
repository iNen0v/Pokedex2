import React from 'react';
import { motion } from 'framer-motion';
import StatsRadar from './StatsRadar';
import { getBadgeColor } from '../utils/colors';
import '../styles/BattleList.scss';

function BattleCard({ pokemon, isSelected, selectionType }) {
 if (!pokemon) return null;

 return (
   <motion.div
     className={`battle-card ${isSelected ? 'selected' : ''} ${selectionType ? `player-${selectionType}` : ''}`}
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
             <span 
               key={type} 
               className="type-badge"
               style={{ backgroundColor: getBadgeColor(type) }}
             >
               {type}
             </span>
           ))}
         </div>
       </div>

       <div className="section">
         <div className="section-title">Strong Against:</div>
         <div className="type-list">
           {pokemon.types?.[0]?.strongAgainst?.map(type => (
             <span 
               key={type} 
               className="type-badge"
               style={{ backgroundColor: getBadgeColor(type) }}
             >
               {type}
             </span>
           ))}
         </div>
       </div>

       <div className="section">
         <div className="section-title">Resistant To:</div>
         <div className="type-list">
           {pokemon.types?.[0]?.resistantTo?.map(type => (
             <span 
               key={type} 
               className="type-badge"
               style={{ backgroundColor: getBadgeColor(type) }}
             >
               {type}
             </span>
           ))}
         </div>
       </div>

       {selectionType && (
         <div className="player-badge">
           {selectionType === 'player1' ? 'Player 1' : 'Player 2'}
         </div>
       )}
     </div>
   </motion.div>
 );
}

export default BattleCard;