import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { createSelector } from '@reduxjs/toolkit';
import BattleCard from '../components/BattleCard';
import ArenaFilters from '../components/ArenaFilters';
import { fetchPokemons } from '../redux/actions';
import '../styles/BattlePage.scss';

const selectPokemonData = (state) => state.pokemons.data;
const selectPokemonLoading = (state) => state.pokemons.loading;

const selectPokemonState = createSelector(
  [selectPokemonData, selectPokemonLoading],
  (data, loading) => ({
    pokemons: data || [],
    loading,
  })
);

function BattlePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    types: [],
    minAttack: '',
    minDefense: '',
    showRare: false,
  });

  const { pokemons, loading } = useSelector(selectPokemonState);

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const selectedPokemonData = useMemo(() => 
    pokemons.find(p => p.id === selectedPokemon?.id),
    [pokemons, selectedPokemon]
  );

  const opponentPokemonData = useMemo(() =>
    pokemons.find(p => p.id === opponent?.id),
    [pokemons, opponent]  
  );

  const filteredPokemons = useMemo(() => {
    return pokemons.filter((pokemon) => {
      if (searchTerm && !pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      if (filters.types.length > 0 && !filters.types.some(type => pokemon.types.map(t => t.type.name).includes(type))) {
        return false;
      }
      if (filters.minAttack && pokemon.stats[1].base_stat < parseInt(filters.minAttack)) {
        return false;
      }
      if (filters.minDefense && pokemon.stats[2].base_stat < parseInt(filters.minDefense)) {
        return false;
      }
      return true;
    });
  }, [pokemons, searchTerm, filters]);

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
  };

  return (
    <div className="battle-page">
      <div className="battle-page__background-pattern" />
      <div className="battle-page__decorative-line" />

      <motion.button
        className="back-button"
        onClick={() => navigate("/")}
        whileHover={{ x: -5 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <X size={16} className="icon" />
        Back to Pokédex
      </motion.button>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="relative mb-6">
          <input
            type="text"
            placeholder="Search for your next champion..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-900/95 text-white placeholder-gray-400 rounded-xl py-3 px-6 outline-none"
          />
          <Search className="absolute right-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <ArenaFilters filters={filters} setFilters={setFilters} />

        {selectedPokemonData && (
          <div className="selected-pokemon-preview">
            <motion.div 
              className="selected-pokemon"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="selection-badge">Player 1</div>
              <img 
                src={selectedPokemonData.sprites.front_default}
                alt="Selected Pokemon"
              />
            </motion.div>

            {!opponent && (
              <motion.div 
                className="vs-badge"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                Choose Opponent
              </motion.div>
            )}

            {opponentPokemonData && (
              <>
                <motion.div 
                  className="vs-badge"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                >
                  VS
                </motion.div>
                <motion.div 
                  className="selected-pokemon"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="selection-badge">Player 2</div>
                  <img 
                    src={opponentPokemonData.sprites.front_default}
                    alt="Opponent Pokemon"
                  />
                </motion.div>
              </>
            )}
          </div>
        )}

        <h1 className="battle-title">Battle Arena</h1>

        <AnimatePresence>
          {loading ? (
            <motion.div
              className="loading-screen"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="pokeball-spinner">
                <div className="center-circle" />
              </div>
              <p>Loading Pokémon...</p>
            </motion.div>
          ) : (
            <motion.div 
              className="grid-container"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '20px',
                padding: '20px'
              }}
            >
              {filteredPokemons.map((pokemon, index) => (
                <motion.div
                  key={pokemon.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handlePokemonSelect(pokemon)}
                  whileHover={{ scale: 1.03 }}
                >
                  <BattleCard
                    pokemon={pokemon}
                    isSelected={selectedPokemon?.id === pokemon.id || opponent?.id === pokemon.id}
                    selectionType={
                      selectedPokemon?.id === pokemon.id ? 'player1' : 
                      opponent?.id === pokemon.id ? 'player2' : null
                    }
                  />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {selectedPokemon && opponent && (
          <div className="battle-controls-wrapper">
            <motion.div 
              className="battle-controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
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
          </div>
        )}
      </div>
    </div>
  );
}

export default BattlePage;