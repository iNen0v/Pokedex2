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
     <div className="filters__group">
       <label className="filters__label">Type</label>
       <select 
         value={filters.type} 
         onChange={(e) => setFilters({...filters, type: e.target.value})}
         className="filters__select"
       >
         <option value="">All types</option>
         {pokemonTypes.map(type => (
           <option 
             key={type} 
             value={type}
             style={{background: typeColors[type]}}
           >
             {type.charAt(0).toUpperCase() + type.slice(1)}
           </option>
         ))}
       </select>
     </div>

     <div className="filters__group">
       <label className="filters__label">Min Attack</label>
       <div className="filters__input-wrapper">
         <input
           type="range"
           min="0"
           max="150"
           value={filters.minAttack || 0}
           onChange={(e) => setFilters({...filters, minAttack: e.target.value})}
           className="filters__range"
         />
         <input
           type="number"
           placeholder="0"
           value={filters.minAttack}
           onChange={(e) => setFilters({...filters, minAttack: e.target.value})}
           className="filters__number"
         />
       </div>
     </div>

     <div className="filters__group">
       <label className="filters__label">Min Defense</label>
       <div className="filters__input-wrapper">
         <input
           type="range"
           min="0"
           max="150"
           value={filters.minDefense || 0}
           onChange={(e) => setFilters({...filters, minDefense: e.target.value})}
           className="filters__range"
         />
         <input
           type="number"
           placeholder="0"
           value={filters.minDefense}
           onChange={(e) => setFilters({...filters, minDefense: e.target.value})}
           className="filters__number"
         />
       </div>
     </div>

     <button 
       onClick={handleClearFilters}
       className="filters__clear"
     >
       Clear Filters
     </button>
   </motion.div>
 );
}

export default Filters;