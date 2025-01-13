import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import BattleCard from './BattleCard';
import '../styles/BattleList.scss';

function BattleList({ pokemons, onPokemonSelect, selectedPokemonId, opponentId }) {
  
  const selectedPokemon = useMemo(() => 
    pokemons.find(p => p.id === selectedPokemonId),
    [pokemons, selectedPokemonId]
  );

  
  const opponentPokemon = useMemo(() =>
    pokemons.find(p => p.id === opponentId),
    [pokemons, opponentId]  
  );

  return (
    <div className="battle-container">
      <div className="battle-container__background-pattern" />
      <div className="battle-container__decorative-line" />

      {selectedPokemonId && (
        <div className="selected-pokemon-preview">
          <motion.div 
            className="selected-pokemon"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="selection-badge">Player 1</div>
            <img 
              src={selectedPokemon?.sprites.front_default}
              alt="Selected Pokemon"
            />
          </motion.div>

          {selectedPokemonId && !opponentId && (
            <motion.div 
              className="vs-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              Choose Opponent
            </motion.div>
          )}

          {opponentId && (
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
                  src={opponentPokemon?.sprites.front_default}
                  alt="Opponent Pokemon"
                />
              </motion.div>
            </>
          )}
        </div>
      )}

      <h1 className="battle-title">Battle Arena</h1>

      <div className="content">
        {!pokemons.length ? (
          <motion.div 
            className="loading-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="pokeball-spinner">
              <div className="center-circle" />
            </div>
            <p>Зареждане на покемони...</p>
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
            {pokemons.map((pokemon, index) => (
              <motion.div
                key={pokemon.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => onPokemonSelect(pokemon)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                layout
              >
                <BattleCard
                  pokemon={pokemon}
                  isSelected={selectedPokemonId === pokemon.id || opponentId === pokemon.id}
                  selectionType={
                    selectedPokemonId === pokemon.id ? 'player1' : 
                    opponentId === pokemon.id ? 'player2' : null
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default BattleList;