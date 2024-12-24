import React from 'react';

const pokemonTypes = [
 "normal", "fire", "water", "grass", "electric", "ice", 
 "fighting", "poison", "ground", "flying", "psychic", 
 "bug", "rock", "ghost", "dark", "dragon", "steel", "fairy"
];

function Filters({ filters, setFilters }) {
 return (
   <div className="advanced-filters">
     <select 
       value={filters.type} 
       onChange={(e) => setFilters({...filters, type: e.target.value})}
     >
       <option value="">All types</option>
       {pokemonTypes.map(type => (
         <option key={type} value={type}>{type}</option>
       ))}
     </select>

     <input
       type="number"
       placeholder="Min Attack"
       value={filters.minAttack}
       onChange={(e) => setFilters({...filters, minAttack: e.target.value})}
     />

     <input
       type="number"
       placeholder="Min Defense"
       value={filters.minDefense}
       onChange={(e) => setFilters({...filters, minDefense: e.target.value})}
     />
   </div>
 );
}

export default Filters;