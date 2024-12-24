import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import PokemonList from '../components/PokemonList';
import Filters from '../components/Filters';
import { fetchPokemons } from '../redux/actions';
import '../styles/Home.scss';

function Home() {
 const dispatch = useDispatch();
 const { data: pokemons, loading } = useSelector(state => state.pokemons);
 const [sortBy, setSortBy] = useState('id');
 const [filters, setFilters] = useState({
   type: '',
   minAttack: '',
   minDefense: ''
 });

 useEffect(() => {
   dispatch(fetchPokemons());
 }, [dispatch]);

 const filterAndSortPokemons = () => {
   let filtered = pokemons;

   if (filters.type) {
     filtered = filtered.filter(pokemon =>
       pokemon.types.some(t => t.type.name === filters.type)
     );
   }

   if (filters.minAttack) {
     filtered = filtered.filter(pokemon =>
       pokemon.stats[1].base_stat >= parseInt(filters.minAttack)
     );
   }

   if (filters.minDefense) {
     filtered = filtered.filter(pokemon =>
       pokemon.stats[2].base_stat >= parseInt(filters.minDefense)
     );
   }

   return [...filtered].sort((a, b) => {
     switch(sortBy) {
       case 'name':
         return a.name.localeCompare(b.name);
       case 'attack':
         return b.stats[1].base_stat - a.stats[1].base_stat;
       case 'defense':
         return b.stats[2].base_stat - a.stats[2].base_stat;
       default:
         return a.id - b.id;
     }
   });
 };

 const filteredAndSortedPokemons = filterAndSortPokemons();

 return (
   <div className="pokemon-home">
     <div className="pokemon-home__background-pattern" />
     <div className="pokemon-home__decorative-line" />

     <motion.div 
       className="pokemon-home__logo-container"
       initial={{ y: -20, opacity: 0 }}
       animate={{ y: 0, opacity: 1 }}
       transition={{ duration: 0.5 }}
     >
       <img
         src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
         alt="Pokemon Logo"
         className="pokemon-home__logo"
       />
     </motion.div>

     <div className="pokemon-home__content">
       <div className="pokemon-home__control-panel">
         <div className="pokemon-home__controls">
           <select
             value={sortBy}
             onChange={(e) => setSortBy(e.target.value)}
             className="pokemon-home__select"
           >
             <option value="id">Number</option>
             <option value="name">Name</option>
             <option value="attack">Attack</option>
             <option value="defense">Defense</option>
           </select>

           <Filters filters={filters} setFilters={setFilters} />
         </div>
       </div>

       {loading ? (
         <motion.div 
           className="pokemon-home__loading"
           animate={{ opacity: [0.5, 1, 0.5] }}
           transition={{ duration: 1.5, repeat: Infinity }}
         >
           <div className="pokemon-home__loading-text">Loading Pokémon...</div>
           <div className="pokemon-home__loading-spinner" />
         </motion.div>
       ) : (
         <PokemonList
           pokemons={filteredAndSortedPokemons}
           onPokemonSelect={() => {}}
           battleMode={false}
         />
       )}
     </div>
   </div>
 );
}

export default Home;