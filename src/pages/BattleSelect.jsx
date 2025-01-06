import React, { useState, useEffect } from 'react';
import BattleCard from '../components/BattleCard';
import Battle from '../components/Battle';

const BattleSelect = ({ pokemons }) => {
  const [selectedPokemons, setSelectedPokemons] = useState([]);
  const [showBattle, setShowBattle] = useState(false);

  // Логваме всяка промяна в избраните покемони
  useEffect(() => {
    console.log('Updated selectedPokemons:', selectedPokemons);
  }, [selectedPokemons]);

  const handlePokemonSelect = (pokemon) => {
    console.log('handlePokemonSelect called with:', pokemon);

    if (selectedPokemons.find(p => p.id === pokemon.id)) {
      console.log('Pokemon already selected, removing:', pokemon.name);
      setSelectedPokemons(prev => prev.filter(p => p.id !== pokemon.id));
    } else if (selectedPokemons.length < 2) {
      console.log('Adding Pokemon to selection:', pokemon.name);
      setSelectedPokemons(prev => [...prev, pokemon]);
    } else {
      console.log('Cannot select more than 2 Pokemons');
    }

    console.log('Selected Pokemons after update:', selectedPokemons);
  };

  const handleStartBattle = () => {
    console.log('Starting battle with:', selectedPokemons);
    setShowBattle(true);
  };

  const handleCancelSelection = () => {
    console.log('Cancelling selection');
    setSelectedPokemons([]);
  };

  const handleCloseBattle = () => {
    console.log('Closing battle');
    setShowBattle(false);
    setSelectedPokemons([]);
  };

  // Логваме стартиране на битка
  if (showBattle && selectedPokemons.length === 2) {
    console.log('Rendering Battle component with:', selectedPokemons);
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
            onClick={() => {
              console.log('Clicked on Pokemon:', pokemon);
              handlePokemonSelect(pokemon);
            }}
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