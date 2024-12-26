import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PokemonInfo from './PokemonInfo';

function Battle({ pokemon1, pokemon2, onClose }) {
  const [battleView, setBattleView] = useState('pre-battle');
  const [battleLog, setBattleLog] = useState([]);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [pokemon1Health, setPokemon1Health] = useState(100);
  const [pokemon2Health, setPokemon2Health] = useState(100);
  const [winner, setWinner] = useState(null);
  const [isAttacking, setIsAttacking] = useState(false);

  console.log('Battle component rendering with:', { pokemon1, pokemon2 });

  const handleStartBattle = () => {
    setBattleView('battle');
  };

  const handleAttack = async (move) => {
    if (isAttacking || winner) return;

    setIsAttacking(true);
    const attacker = currentTurn === 1 ? pokemon1 : pokemon2;
    const defender = currentTurn === 1 ? pokemon2 : pokemon1;
    
    // Calculate damage based on types and stats
    const attackerStat = attacker.stats.find(s => s.stat.name === 'attack').base_stat;
    const defenderStat = defender.stats.find(s => s.stat.name === 'defense').base_stat;
    let damage = Math.floor(attackerStat * (1 - defenderStat / 200));

    // Type effectiveness
    const attackerType = attacker.types[0].type.name;
    if (defender.types[0].weakTo?.includes(attackerType)) {
      damage *= 2;
    } else if (defender.types[0].resistantTo?.includes(attackerType)) {
      damage *= 0.5;
    }

    damage = Math.max(1, Math.floor(damage));

    // Update health
    if (currentTurn === 1) {
      const newHealth = Math.max(0, pokemon2Health - damage);
      setPokemon2Health(newHealth);
      if (newHealth <= 0) setWinner(pokemon1);
    } else {
      const newHealth = Math.max(0, pokemon1Health - damage);
      setPokemon1Health(newHealth);
      if (newHealth <= 0) setWinner(pokemon2);
    }

    // Update battle log
    setBattleLog(prev => [...prev, {
      attacker: attacker.name,
      move: move.move.name,
      damage,
      effectiveness: damage >= 2 ? "It's super effective!" : 
                    damage <= 0.5 ? "It's not very effective..." : ""
    }]);

    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsAttacking(false);
    setCurrentTurn(currentTurn === 1 ? 2 : 1);
  };

  if (battleView === 'pre-battle') {
    return (
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg p-8">
        <h2 className="text-2xl text-white text-center mb-8">Battle Preview</h2>
        <div className="flex justify-between items-center mb-8">
        
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <img 
              src={pokemon1.sprites.front_default}
              alt={pokemon1.name}
              className="w-40 h-40"
            />
            <h3 className="text-white text-xl capitalize mb-2">{pokemon1.name}</h3>
            <div className="text-sm text-gray-300">
              <div>HP: {pokemon1.stats[0].base_stat}</div>
              <div>Attack: {pokemon1.stats[1].base_stat}</div>
              <div>Defense: {pokemon1.stats[2].base_stat}</div>
              <div>Special Attack: {pokemon1.stats[3].base_stat}</div>
              <div>Special Defense: {pokemon1.stats[4].base_stat}</div>
              <div>Speed: {pokemon1.stats[5].base_stat}</div>
            </div>
          </div>

          <div className="text-6xl font-bold text-red-500 animate-pulse px-8">
            VS
          </div>

         
          <div className="text-center p-4 bg-gray-700 rounded-lg">
            <img 
              src={pokemon2.sprites.front_default}
              alt={pokemon2.name}
              className="w-40 h-40"
            />
            <h3 className="text-white text-xl capitalize mb-2">{pokemon2.name}</h3>
            <div className="text-sm text-gray-300">
              <div>HP: {pokemon2.stats[0].base_stat}</div>
              <div>Attack: {pokemon2.stats[1].base_stat}</div>
              <div>Defense: {pokemon2.stats[2].base_stat}</div>
              <div>Special Attack: {pokemon2.stats[3].base_stat}</div>
              <div>Special Defense: {pokemon2.stats[4].base_stat}</div>
              <div>Speed: {pokemon2.stats[5].base_stat}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleStartBattle}
            className="w-full bg-red-600 text-white p-4 rounded-lg hover:bg-red-700 text-xl font-bold"
          >
            Start Battle!
          </button>
          <button
            onClick={onClose}
            className="w-full bg-gray-600 text-white p-3 rounded-lg hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl bg-gray-800 rounded-lg p-8">
      <div className="flex justify-between items-center mb-8">
        <div className={`${currentTurn === 1 ? 'ring-2 ring-yellow-500 p-4 rounded' : 'p-4'}`}>
          <PokemonInfo 
            pokemon={pokemon1}
            health={pokemon1Health}
            canAttack={currentTurn === 1}
            onAttack={handleAttack}
            isAttacking={isAttacking && currentTurn === 1}
          />
        </div>

        <div className="text-5xl font-bold text-red-500 animate-pulse">VS</div>

        <div className={`${currentTurn === 2 ? 'ring-2 ring-yellow-500 p-4 rounded' : 'p-4'}`}>
          <PokemonInfo 
            pokemon={pokemon2}
            health={pokemon2Health}
            canAttack={currentTurn === 2}
            onAttack={handleAttack}
            isAttacking={isAttacking && currentTurn === 2}
          />
        </div>
      </div>

      <div className="bg-gray-900 p-4 rounded-lg h-48 overflow-y-auto mb-4">
        {battleLog.map((log, index) => (
          <div key={index} className="text-white mb-2">
            <span className="font-bold capitalize">{log.attacker}</span> used{' '}
            <span className="text-blue-400">{log.move}</span> for{' '}
            <span className="text-red-400">{log.damage}</span> damage!
            {log.effectiveness && (
              <span className="text-yellow-400 ml-2">{log.effectiveness}</span>
            )}
          </div>
        ))}
      </div>

      {winner && (
        <div className="text-center mb-4">
          <h2 className="text-3xl font-bold text-yellow-400">
            {winner.name.toUpperCase()} WINS!
          </h2>
        </div>
      )}

      <button
        onClick={onClose}
        className="w-full bg-gray-700 text-white p-3 rounded-lg hover:bg-gray-600 mt-4"
      >
        End Battle
      </button>
    </div>
  );
}

export default Battle;