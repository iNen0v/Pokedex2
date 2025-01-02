// BattlePage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { debounce, throttle } from 'lodash';
import { Search, Zap, Shield, Database, X } from 'lucide-react';
import { createSelector } from '@reduxjs/toolkit';
import BattleList from '../components/BattleList';
import { fetchPokemons } from '../redux/actions';
import '../styles/BattlePage.scss';

const pokemonTypes = [
 "normal", "fire", "water", "electric", "grass", "ice", "fighting", "poison",
 "ground", "flying", "psychic", "bug", "rock", "ghost", "dragon", "dark", "steel", "fairy"
];

const quickSelectValues = {
 low: { attack: 50, defense: 50 },
 medium: { attack: 75, defense: 75 },
 high: { attack: 100, defense: 100 }
};

const selectPokemonData = createSelector(
 [(state) => state.pokemons.data, (state) => state.pokemons.loading],
 (data, loading) => ({
   data: data || [],
   loading
 })
);

function BattlePage() {
 const dispatch = useDispatch();
 const navigate = useNavigate();
 
 const [selectedPokemon, setSelectedPokemon] = useState(null);
 const [opponent, setOpponent] = useState(null);
 const [searchTerm, setSearchTerm] = useState(() => 
   localStorage.getItem('battleSearchTerm') || ''
 );
 const [selectedType, setSelectedType] = useState(() => 
   localStorage.getItem('battleSelectedType') || null
 );
 const [attackFilter, setAttackFilter] = useState(() => 
   parseInt(localStorage.getItem('battleAttackFilter')) || 0
 );
 const [defenseFilter, setDefenseFilter] = useState(() => 
   parseInt(localStorage.getItem('battleDefenseFilter')) || 0
 );

 const { data: pokemons, loading } = useSelector(selectPokemonData);

 const debouncedSearch = useMemo(
   () => debounce((value) => setSearchTerm(value), 300),
   []
 );

 const throttledAttackChange = useMemo(
   () => throttle((value) => setAttackFilter(value), 100),
   []
 );

 const throttledDefenseChange = useMemo(
   () => throttle((value) => setDefenseFilter(value), 100),
   []
 );

 useEffect(() => {
   localStorage.setItem('battleSearchTerm', searchTerm);
   localStorage.setItem('battleSelectedType', selectedType);
   localStorage.setItem('battleAttackFilter', attackFilter.toString());
   localStorage.setItem('battleDefenseFilter', defenseFilter.toString());
 }, [searchTerm, selectedType, attackFilter, defenseFilter]);

 useEffect(() => {
   dispatch(fetchPokemons());
 }, [dispatch]);

 const clearAllFilters = () => {
   setSearchTerm('');
   setSelectedType(null);
   setAttackFilter(0);
   setDefenseFilter(0);
   localStorage.removeItem('battleSearchTerm');
   localStorage.removeItem('battleSelectedType');
   localStorage.removeItem('battleAttackFilter');
   localStorage.removeItem('battleDefenseFilter');
 };

 const handlePokemonSelect = (pokemon) => {
   if (!selectedPokemon) {
     setSelectedPokemon(pokemon);
   } else if (pokemon.id !== selectedPokemon.id) {
     setOpponent(pokemon);
   }
 };

 const handleStartBattle = () => {
   if (selectedPokemon && opponent) {
     navigate(`/battle-arena/${selectedPokemon.id}/${opponent.id}`);
   }
 };

 const handleCancelSelection = () => {
   setSelectedPokemon(null);
   setOpponent(null);
   setSelectedType(null);
 };

 const filteredPokemons = useMemo(() => {
   if (!pokemons?.length) return [];
   return pokemons.filter(pokemon => {
     const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
     const matchesType = !selectedType || pokemon.types.some(t => t.type.name === selectedType);
     const matchesAttack = pokemon.stats[1].base_stat >= attackFilter;
     const matchesDefense = pokemon.stats[2].base_stat >= defenseFilter;
     return matchesSearch && matchesType && matchesAttack && matchesDefense;
   });
 }, [pokemons, searchTerm, selectedType, attackFilter, defenseFilter]);

 return (
   <div className="battle-page">
     <div className="battle-page__background-pattern" />
     <div className="battle-page__decorative-line" />

     <motion.div
       className="battle-page__content"
       initial={{ opacity: 0 }}
       animate={{ opacity: 1 }}
     >
       <div className="battle-page__header">
         <motion.button
           className="back-button"
           onClick={() => navigate("/")}
           whileHover={{ x: -5 }}
         >
           <X size={16} className="icon" />
           Back to Pokédex
         </motion.button>
       </div>

       <div className="search-section">
         <motion.div
           className="search-container"
           initial={{ y: -20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
         >
           <Search className="search-icon" />
           <input
             type="text"
             placeholder="Search for your next champion..."
             defaultValue={searchTerm}
             onChange={(e) => debouncedSearch(e.target.value)}
             className="pokemon-search"
           />
         </motion.div>

         <motion.div
           className="type-filters"
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
         >
           {pokemonTypes.map((type) => (
             <motion.button
               key={type}
               className={`${type} ${selectedType === type ? 'active' : ''}`}
               onClick={() => setSelectedType(type === selectedType ? null : type)}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
             >
               {type}
             </motion.button>
           ))}
         </motion.div>
       </div>

       <div className="stats-filters">
         <div className="filter-container">
           <div className="filter-header">
             <Zap className="filter-icon" />
             <label title="Filter by Attack power">Attack: {attackFilter}</label>
           </div>
           <input
             type="range"
             min="0"
             max="150"
             value={attackFilter}
             onChange={(e) => throttledAttackChange(Number(e.target.value))}
             className="slider"
           />
           <div className="quick-select">
             <button onClick={() => setAttackFilter(quickSelectValues.low.attack)}>Low</button>
             <button onClick={() => setAttackFilter(quickSelectValues.medium.attack)}>Med</button>
             <button onClick={() => setAttackFilter(quickSelectValues.high.attack)}>High</button>
           </div>
         </div>

         <div className="filter-container">
           <div className="filter-header">
             <Shield className="filter-icon" />
             <label title="Filter by Defense power">Defense: {defenseFilter}</label>
           </div>
           <input
             type="range"
             min="0"
             max="150"
             value={defenseFilter}
             onChange={(e) => throttledDefenseChange(Number(e.target.value))}
             className="slider"
           />
           <div className="quick-select">
             <button onClick={() => setDefenseFilter(quickSelectValues.low.defense)}>Low</button>
             <button onClick={() => setDefenseFilter(quickSelectValues.medium.defense)}>Med</button>
             <button onClick={() => setDefenseFilter(quickSelectValues.high.defense)}>High</button>
           </div>
         </div>

         <div className="filters-info">
           <Database className="filter-icon" />
           <span>{filteredPokemons?.length || 0} Pokémon found</span>
           <motion.button
             className="clear-filters-btn"
             onClick={clearAllFilters}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
           >
             Clear All
           </motion.button>
         </div>
       </div>

       <AnimatePresence mode="wait">
         {selectedPokemon && !opponent && (
           <motion.div
             className="selection-status"
             initial={{ opacity: 0, y: -20 }}
             animate={{ opacity: 1, y: 0 }}
             exit={{ opacity: 0, y: 20 }}
           >
             <span className="status-text">
               <span className="selected-name">{selectedPokemon.name}</span> is ready! Choose your opponent
             </span>
           </motion.div>
         )}
       </AnimatePresence>

       {selectedPokemon && opponent && (
         <motion.div
           className="battle-controls"
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
         >
           <motion.button
             className="battle-button start"
             onClick={handleStartBattle}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
           >
             ⚔️ Start Battle!
           </motion.button>
           <motion.button
             className="battle-button cancel"
             onClick={handleCancelSelection}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
           >
             ✖️ Cancel
           </motion.button>
         </motion.div>
       )}

       <AnimatePresence>
         {loading || !pokemons ? (
           <motion.div 
             className="loading-screen"
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
           >
             <div className="pokeball-spinner" />
             <p>Loading Pokémon...</p>
           </motion.div>
         ) : (
           <BattleList
             pokemons={filteredPokemons}
             onPokemonSelect={handlePokemonSelect}
             selectedPokemonId={selectedPokemon?.id}
             opponentId={opponent?.id}
           />
         )}
       </AnimatePresence>
     </motion.div>
   </div>
 );
}

export default BattlePage;