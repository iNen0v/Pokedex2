import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import BattleList from '../components/BattleList';

function BattlePage() {
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const { data: pokemons, loading } = useSelector(state => state.pokemons);
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredPokemons = pokemons?.filter(pokemon => 
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-white hover:text-gray-300"
          >
            ← Back
          </button>
          
          <input
            type="text"
            placeholder="Search Pokemon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent border-b border-gray-700 text-white px-2 py-1"
          />
        </div>

        {selectedPokemon && !opponent && (
          <div className="text-white mb-4 text-center text-xl">
            Selected: <span className="font-bold capitalize">{selectedPokemon.name}</span> - Choose your opponent
          </div>
        )}

        {selectedPokemon && opponent && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 flex gap-6 z-50">
            <button
              onClick={handleStartBattle}
              className="px-8 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg 
                hover:from-red-500 hover:to-red-400 transition-all duration-300 
                shadow-lg hover:shadow-red-500/50 font-bold text-lg
                transform hover:scale-105 active:scale-95"
            >
              ⚔️ Start Battle!
            </button>
            <button
              onClick={handleCancelSelection}
              className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-white rounded-lg 
                hover:from-gray-600 hover:to-gray-500 transition-all duration-300
                shadow-lg hover:shadow-gray-500/50 font-bold text-lg
                transform hover:scale-105 active:scale-95"
            >
              ✖️ Cancel
            </button>
          </div>
        )}

        {loading ? (
          <div className="text-white">Loading...</div>
        ) : (
          <BattleList
            pokemons={filteredPokemons}
            onPokemonSelect={handlePokemonSelect}
            selectedPokemonId={selectedPokemon?.id}
          />
        )}
      </div>
    </div>
  );
}

export default BattlePage;