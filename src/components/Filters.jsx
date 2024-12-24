import React from 'react';
import { motion } from 'framer-motion';
import '../styles/Filters.scss';

const pokemonTypes = [
 "normal", "fire", "water", "grass", "electric", "ice", 
 "fighting", "poison", "ground", "flying", "psychic", 
 "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"
];

const typeColors = {
 normal: '#A8A878',
 fire: '#F08030',
 water: '#6890F0',
 grass: '#78C850',
 electric: '#F8D030',
 ice: '#98D8D8',
 fighting: '#C03028',
 poison: '#A040A0',
 ground: '#E0C068',
 flying: '#A890F0',
 psychic: '#F85888',
 bug: '#A8B820',
 rock: '#B8A038',
 ghost: '#705898',
 dark: '#705848',
 dragon: '#7038F8',
 steel: '#B8B8D0',
 fairy: '#EE99AC'
};

const quickFilters = [
 { name: 'Strong Attackers', attack: 100, defense: 0 },
 { name: 'Tanks', attack: 0, defense: 100 },
 { name: 'Balanced', attack: 70, defense: 70 }
];

function Filters({ filters, setFilters }) {
 const handleClearFilters = () => {
   setFilters({
     type: '',
     minAttack: '',
     minDefense: ''
   });
 };

 return (
   <motion.div 
     className="filters"
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.3 }}
   >
     <div className="filters__quick">
       {quickFilters.map(filter => (
         <button
           key={filter.name}
           onClick={() => setFilters({
             ...filters,
             minAttack: filter.attack,
             minDefense: filter.defense
           })}
           className="filters__quick-button"
         >
           {filter.name}
         </button>
       ))}
     </div>

     <div className="filters__types">
       <label className="filters__label">Types</label>
       <div className="filters__type-grid">
         {pokemonTypes.map(type => (
           <button
             key={type}
             onClick={() => setFilters({...filters, type})}
             className={`filters__type-button ${filters.type === type ? 'active' : ''}`}
             style={{'--type-color': typeColors[type]}}
           >
             <img src={`/types/${type}.svg`} alt={type} className="filters__type-icon" />
             <span>{type}</span>
           </button>
         ))}
       </div>
     </div>

     <div className="filters__stats">
       <div className="filters__stat">
         <label className="filters__label">
           Attack: {filters.minAttack || 0}
         </label>
         <div className="filters__slider-container">
           <input
             type="range"
             min="0"
             max="150"
             value={filters.minAttack || 0}
             onChange={(e) => setFilters({...filters, minAttack: e.target.value})}
             className="filters__range"
             style={{
               background: `linear-gradient(to right, #ef4444 ${(filters.minAttack || 0) / 1.5}%, rgba(55, 65, 81, 0.8) ${(filters.minAttack || 0) / 1.5}%)`
             }}
           />
           <input
             type="number"
             value={filters.minAttack}
             onChange={(e) => setFilters({...filters, minAttack: e.target.value})}
             className="filters__number"
             placeholder="0"
           />
         </div>
       </div>

       <div className="filters__stat">
         <label className="filters__label">
           Defense: {filters.minDefense || 0}
         </label>
         <div className="filters__slider-container">
           <input
             type="range"
             min="0"
             max="150"
             value={filters.minDefense || 0}
             onChange={(e) => setFilters({...filters, minDefense: e.target.value})}
             className="filters__range"
             style={{
               background: `linear-gradient(to right, #3b82f6 ${(filters.minDefense || 0) / 1.5}%, rgba(55, 65, 81, 0.8) ${(filters.minDefense || 0) / 1.5}%)`
             }}
           />
           <input
             type="number"
             value={filters.minDefense}
             onChange={(e) => setFilters({...filters, minDefense: e.target.value})}
             className="filters__number"
             placeholder="0"
           />
         </div>
       </div>
     </div>

     <button 
       onClick={handleClearFilters}
       className="filters__clear"
     >
       Clear All Filters
     </button>
   </motion.div>
 );
}

export default Filters;