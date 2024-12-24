import React, { useState } from 'react';
import BattleCard from '../components/BattleCard';
import Battle from '../components/Battle';

const BattleSelect = ({ pokemons }) => {
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [showBattle, setShowBattle] = useState(false);

  const handlePokemonSelect = (pokemon) => {
    if (selectedPokemons.find(p => p.id === pokemon.id)) {
      // Ако покемонът вече е избран, премахни го
      setSelectedPokemons(prev => prev.filter(p => p.id !== pokemon.id));
    } else if (selectedPokemons.length < 2) {
      // Ако не са избрани 2 покемона, добави новия
      setSelectedPokemons(prev => [...prev, pokemon]);
    }
  };

  const handleStartBattle = () => {
    setShowBattle(true);
  };

  const handleCancelSelection = () => {
    setSelectedPokemons([]);
  };

  const handleCloseBattle = () => {
    setShowBattle(false);
    setSelectedPokemons([]);
  };

  if (showBattle && selectedPokemons.length === 2) {
    return (
      <Battle
        pokemon1={selectedPokemons[0]}
        pokemon2={selectedPokemons[1]}
        onClose={handleCloseBattle}
      />
    );
  }

  return (
    <div className="p-4">
      {/* Бутони за действие - показват се само когато има 2 избрани покемона */}
      {selectedPokemons.length === 2 && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex gap-4 z-50">
          <button
            onClick={handleStartBattle}
            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Start Battle!
          </button>
          <button
            onClick={handleCancelSelection}
            className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel Selection
          </button>
        </div>
      )}


      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {pokemons.map(pokemon => (
          <div
            key={pokemon.id}
            onClick={() => handlePokemonSelect(pokemon)}
            className="cursor-pointer"
          >
            <BattleCard
              pokemon={pokemon}
              isSelected={selectedPokemons.some(p => p.id === pokemon.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleSelect;