import React from 'react';
import { motion } from 'framer-motion';

function ComparePokemons({ pokemon1, pokemon2 }) {
 const compareStats = (stat1, stat2) => {
   if (stat1 > stat2) return 'higher';
   if (stat1 < stat2) return 'lower';
   return 'equal';
 };

 return (
   <div className="compare-view">
     <div className="pokemon-header">
       <div className="pokemon-info">
         <img src={pokemon1.sprites.front_default} alt={pokemon1.name} />
         <h3>{pokemon1.name}</h3>
       </div>
       <div className="pokemon-info">
         <img src={pokemon2.sprites.front_default} alt={pokemon2.name} />
         <h3>{pokemon2.name}</h3>
       </div>
     </div>

     <div className="stats-comparison">
       {pokemon1.stats.map((stat, index) => {
         const comparison = compareStats(
           stat.base_stat,
           pokemon2.stats[index].base_stat
         );
         
         return (
           <div key={stat.stat.name} className="stat-row">
             <span className="stat-name">{stat.stat.name}</span>
             <div className={`stat-value ${comparison}`}>
               {stat.base_stat} vs {pokemon2.stats[index].base_stat}
             </div>
           </div>
         );
       })}
     </div>

     <div className="abilities-comparison">
       <h4>Abilities</h4>
       <div className="abilities-list">
         <div>
           {pokemon1.abilities.map(ability => (
             <span key={ability.ability.name}>{ability.ability.name}</span>
           ))}
         </div>
         <div>
           {pokemon2.abilities.map(ability => (
             <span key={ability.ability.name}>{ability.ability.name}</span>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
}import React from 'react';
import { motion } from 'framer-motion';

function ComparePokemons({ pokemon1, pokemon2 }) {
 const compareStats = (stat1, stat2) => {
   if (stat1 > stat2) return 'higher';
   if (stat1 < stat2) return 'lower';
   return 'equal';
 };

 return (
   <div className="compare-view">
     <div className="pokemon-header">
       <div className="pokemon-info">
         <img src={pokemon1.sprites.front_default} alt={pokemon1.name} />
         <h3>{pokemon1.name}</h3>
       </div>
       <div className="pokemon-info">
         <img src={pokemon2.sprites.front_default} alt={pokemon2.name} />
         <h3>{pokemon2.name}</h3>
       </div>
     </div>

     <div className="stats-comparison">
       {pokemon1.stats.map((stat, index) => {
         const comparison = compareStats(
           stat.base_stat,
           pokemon2.stats[index].base_stat
         );
         
         return (
           <div key={stat.stat.name} className="stat-row">
             <span className="stat-name">{stat.stat.name}</span>
             <div className={`stat-value ${comparison}`}>
               {stat.base_stat} vs {pokemon2.stats[index].base_stat}
             </div>
           </div>
         );
       })}
     </div>

     <div className="abilities-comparison">
       <h4>Abilities</h4>
       <div className="abilities-list">
         <div>
           {pokemon1.abilities.map(ability => (
             <span key={ability.ability.name}>{ability.ability.name}</span>
           ))}
         </div>
         <div>
           {pokemon2.abilities.map(ability => (
             <span key={ability.ability.name}>{ability.ability.name}</span>
           ))}
         </div>
       </div>
     </div>
   </div>
 );
}