import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Shield } from 'lucide-react';
import '../styles/BattleFilters.scss';

const typeIcons = {
  normal: '⚪',
  fire: '🔥',
  water: '💧',
  grass: '🌿',
  electric: '⚡',
  ice: '❄️',
  fighting: '👊',
  poison: '☠️',
  ground: '🌍',
  flying: '🦅',
  psychic: '🔮',
  bug: '🐛',
  rock: '🪨',
  ghost: '👻',
  dragon: '🐉',
  dark: '🌑',
  steel: '⚔️',
  fairy: '✨'
};

const typeColors = {
  normal: '#A8A878',
  fire: '#fa0707',
  water: '#6890F0',
  grass: '#78C850',
  electric: '#F8D030',
  ice: '#98D8D8',
  fighting: '#c06c28',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dark: '#705848',
  dragon: '#7038F8',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

function ArenaFilters({ filters, setFilters }) {
  return (
    <div className="battle-filters">
      {/* Типове покемони */}
      <div className="type-filters">
        {Object.entries(typeIcons).map(([type, icon]) => (
          <motion.button
            key={type}
            onClick={() => {
              const newTypes = filters.types.includes(type)
                ? filters.types.filter(t => t !== type)
                : [...filters.types, type];
              setFilters({ ...filters, types: newTypes });
            }}
            style={{
              backgroundColor: filters.types.includes(type) ? typeColors[type] : `${typeColors[type]}20`,
              borderColor: typeColors[type]
            }}
            whileHover={{ y: -2, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
            whileTap={{ y: 0 }}
          >
            <span>{icon}</span>
            <span>{type}</span>
          </motion.button>
        ))}
      </div>

      {/* Статистики */}
      <div className="stats-section">
        {[
          { label: 'Attack', key: 'minAttack', icon: <Zap />, color: '#ef4444' },
          { label: 'Defense', key: 'minDefense', icon: <Shield />, color: '#3b82f6' }
        ].map(stat => (
          <div key={stat.key} className="stat-row">
            <div className="stat-header">
              {stat.icon}
              <span>{stat.label}: {filters[stat.key] || 0}</span>
            </div>
            <div className="slider-container">
              <div className="slider-track" style={{
                background: `linear-gradient(to right, ${stat.color} ${(filters[stat.key] || 0) / 1.5}%, rgba(55, 65, 81, 0.8) ${(filters[stat.key] || 0) / 1.5}%)`
              }} />
              <input
                type="range"
                min="0"
                max="150"
                value={filters[stat.key] || 0}
                onChange={(e) => setFilters({ ...filters, [stat.key]: e.target.value })}
              />
              <div className="range-labels">
                {['Low', 'Med', 'High'].map(label => (
                  <button
                    key={label}
                    className={filters[stat.key] >= (['Low', 'Med', 'High'].indexOf(label) * 50) ? 'active' : ''}
                    onClick={() => setFilters({
                      ...filters,
                      [stat.key]: ((['Low', 'Med', 'High'].indexOf(label) + 1) * 50).toString()
                    })}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="filters-footer">
        <div className="pokemon-count">
          <Database />
          <span>{filters.totalPokemon || 0} Pokémon found</span>
        </div>
        {(filters.types.length > 0 || filters.minAttack || filters.minDefense) && (
          <motion.button
            className="clear-all"
            onClick={() => setFilters({
              types: [],
              minAttack: '',
              minDefense: '',
              showRare: false
            })}
            whileHover={{ y: -1 }}
            whileTap={{ y: 0 }}
          >
            Clear All
          </motion.button>
        )}
      </div>
    </div>
  );
}

export default ArenaFilters;