import React from 'react';
import { motion } from 'framer-motion';
import '../styles/BattleCard.scss';

function BattleCard({ pokemon, isSelected }) {
  if (!pokemon) return null;

  return (
    <motion.div
      className={`battle-card ${isSelected ? 'selected' : ''}`}
      whileHover={{ y: -5 }}
    >
      <div className="pokemon-id">
        #{String(pokemon.id).padStart(4, '0')}
      </div>

      <div className="text-gray-400">
        {pokemon.types?.[0]?.type?.name}
      </div>

      <img
        src={pokemon.sprites?.front_default}
        alt={pokemon.name}
        className="pokemon-image w-32 h-32 mx-auto"
      />

      <h3 className="pokemon-name text-xl capitalize">{pokemon.name}</h3>

      <div className="stats space-y-1 text-sm">
        {[
          ['hp', pokemon.stats?.[0]?.base_stat],
          ['attack', pokemon.stats?.[1]?.base_stat],
          ['defense', pokemon.stats?.[2]?.base_stat],
          ['sp-atk', pokemon.stats?.[3]?.base_stat],
          ['sp-def', pokemon.stats?.[4]?.base_stat],
          ['speed', pokemon.stats?.[5]?.base_stat]
        ].map(([stat, value]) => (
          <div key={stat} className="stat-row">
            <span className="stat-name text-gray-400">{stat}:</span>
            <span className="stat-value">{value}</span>
          </div>
        ))}
      </div>

      <div className="damage-section weak">
        <div className="section-title">Weak Against (2x damage):</div>
        <div className="type-list">
          {pokemon.types?.[0]?.weakTo?.map(type => (
            <span key={type} className={`type type-${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="damage-section strong">
        <div className="section-title">Strong Against (½ damage):</div>
        <div className="type-list">
          {pokemon.types?.[0]?.strongAgainst?.map(type => (
            <span key={type} className={`type type-${type}`}>
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="damage-section resistant">
        <div className="section-title">Resistant To (½ damage):</div>
        <div className="type-list">
          {pokemon.types?.[0]?.resistantTo?.length > 0 ? (
            pokemon.types[0].resistantTo.map(type => (
              <span key={type} className={`type type-${type}`}>
                {type}
              </span>
            ))
          ) : (
            <span className="no-resistances">No resistances</span>
          )}
        </div>
      </div>

      <div className="battle-moves">
        <div className="moves-title">Battle Moves:</div>
        <div className="move-list">
          {pokemon.moves?.slice(0, 4).map(move => (
            <span key={move.move.name} className="move">
              {move.move.name.replace('-', ' ')}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default BattleCard;