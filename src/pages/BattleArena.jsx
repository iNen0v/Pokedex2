import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../styles/BattleArena.scss';

const BattleArena = () => {
  const { pokemon1Id, pokemon2Id } = useParams();
  const navigate = useNavigate();
  const pokemons = useSelector(state => state.pokemons.data);
  
  const pokemon1 = pokemons.find(p => p.id === parseInt(pokemon1Id));
  const pokemon2 = pokemons.find(p => p.id === parseInt(pokemon2Id));

  const [currentTurn, setCurrentTurn] = useState(1);
  const [battleLog, setBattleLog] = useState([]);
  const [battleEnded, setBattleEnded] = useState(false);
  const [winner, setWinner] = useState(null);
  const [pokemon1HP, setPokemon1HP] = useState(null);
  const [pokemon2HP, setPokemon2HP] = useState(null);

  useEffect(() => {
    if (pokemon1 && pokemon2) {
      setPokemon1HP(pokemon1.stats[0].base_stat);
      setPokemon2HP(pokemon2.stats[0].base_stat);
    } else {
      navigate('/battle');
    }
  }, [pokemon1, pokemon2, navigate]);

  const calculateDamage = (attacker, defender) => {
    const attack = attacker.stats[1].base_stat;
    const defense = defender.stats[2].base_stat;
    const baseDamage = Math.floor((attack / defense) * 20);
    const randomFactor = Math.random() * (1.2 - 0.8) + 0.8;
    return Math.floor(baseDamage * randomFactor);
  };

  const handleAttack = (attackingPokemon, move) => {
    if (battleEnded) return;

    const defendingPokemon = currentTurn === 1 ? pokemon2 : pokemon1;
    const damage = calculateDamage(attackingPokemon, defendingPokemon);

    if (currentTurn === 1) {
      const newHP = Math.max(0, pokemon2HP - damage);
      setPokemon2HP(newHP);
      setBattleLog(prev => [...prev, `${attackingPokemon.name} used ${move.move.name} and dealt ${damage} damage!`]);

      if (newHP === 0) {
        setWinner(pokemon1);
        setBattleLog(prev => [...prev, `${pokemon2.name} fainted! ${pokemon1.name} wins the battle!`]);
        setBattleEnded(true);
        return;
      }
    } else {
      const newHP = Math.max(0, pokemon1HP - damage);
      setPokemon1HP(newHP);
      setBattleLog(prev => [...prev, `${attackingPokemon.name} used ${move.move.name} and dealt ${damage} damage!`]);

      if (newHP === 0) {
        setWinner(pokemon2);
        setBattleLog(prev => [...prev, `${pokemon1.name} fainted! ${pokemon2.name} wins the battle!`]);
        setBattleEnded(true);
        return;
      }
    }

    setCurrentTurn(currentTurn === 1 ? 2 : 1);
  };

  const renderPokemonCard = (pokemon, currentHP, isCurrentTurn, onAttack) => (
    <div className={`flex-1 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700 
      ${isCurrentTurn ? 'ring-2 ring-yellow-400 animate-pulse' : ''}`}>
      <div className="relative">
        <img
          src={pokemon.sprites.front_default || '/api/placeholder/96/96'}
          alt={pokemon.name}
          className={`w-40 h-40 mx-auto hover:scale-110 transition-transform duration-300 
            ${winner === pokemon ? 'animate-bounce' : ''}`}
        />
        <h2 className="text-2xl font-bold text-white text-center capitalize mb-4">{pokemon.name}</h2>

        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-300 mb-1">
            <span>HP</span>
            <span>{currentHP}/{pokemon.stats[0].base_stat}</span>
          </div>
          <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full transition-all duration-300"
              style={{
                width: `${(currentHP / pokemon.stats[0].base_stat) * 100}%`,
                backgroundColor: currentHP > pokemon.stats[0].base_stat * 0.5 ? '#22c55e' : 
                               currentHP > pokemon.stats[0].base_stat * 0.2 ? '#eab308' : '#ef4444'
              }}
            />
          </div>
        </div>

        <div className="space-y-3">
          {pokemon.moves?.slice(0, 4).map(move => (
            <button
              key={move.move.name}
              onClick={() => isCurrentTurn && !battleEnded && onAttack(pokemon, move)}
              disabled={!isCurrentTurn || battleEnded}
              className={`w-full p-3 rounded-lg text-white transition-all duration-200 
                ${isCurrentTurn && !battleEnded ? 
                  'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transform hover:scale-105' : 
                  'bg-gray-700 cursor-not-allowed'}`}
            >
              {move.move.name.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  if (!pokemon1 || !pokemon2 || pokemon1HP === null || pokemon2HP === null) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900">
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="container mx-auto px-4 py-8">
        <h1 className="text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
          Pokemon Battle!
          {battleEnded && winner && (
            <div className="mt-4 text-3xl text-yellow-500">Winner: {winner.name}!</div>
          )}
        </h1>

        <div className="flex justify-between items-center gap-8 mb-8">
          {renderPokemonCard(pokemon1, pokemon1HP, currentTurn === 1, handleAttack)}

          <div className="text-center">
            <div className="text-7xl font-bold text-red-500 animate-pulse mb-6">VS</div>
          </div>

          {renderPokemonCard(pokemon2, pokemon2HP, currentTurn === 2, handleAttack)}
        </div>

        <div className="max-w-4xl mx-auto bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700">
          <h3 className="text-xl font-bold text-white mb-4">Battle Log</h3>
          <div className="max-h-40 overflow-y-auto space-y-2">
            {battleLog.map((log, index) => (
              <div key={index} className="text-gray-300 py-2 px-4 rounded bg-gray-700/50 hover:bg-gray-700 transition-colors">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BattleArena;