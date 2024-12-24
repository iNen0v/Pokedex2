import React from 'react';
import { motion } from 'framer-motion';

function PokemonInfo({ pokemon, health, isAttacking, canAttack, onAttack }) {
  if (!pokemon) return null;

  return (
    <div className={`text-center ${isAttacking ? 'scale-110' : ''}`}>
      <div className="flex gap-2 justify-center mb-2">
        {pokemon.types.map(type => (
          <span 
            key={type.type.name}
            className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
          >
            {type.type.name}
          </span>
        ))}
      </div>

      <img 
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
        className="w-40 h-40 mx-auto"
      />

      <h3 className="text-white capitalize font-bold text-xl mb-2">
        {pokemon.name}
      </h3>

      <div className="w-48 bg-gray-700 rounded-full h-4 mb-4">
        <motion.div 
          className="bg-green-500 rounded-full h-4"
          initial={{ width: "100%" }}
          animate={{ width: `${health}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
      <span className="text-white text-sm">{Math.round(health)}%</span>

      {canAttack && (
        <div className="grid grid-cols-2 gap-2 mt-4">
          {pokemon.moves?.slice(0, 4).map(move => (
            <button
              key={move.move.name}
              onClick={() => onAttack?.(move)}
              className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
            >
              {move.move.name.replace('-', ' ')}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default PokemonInfo;