import React from 'react';
import { motion } from 'framer-motion';
import '../styles/PokemonStats.scss';

function PokemonStats({ stats }) {
  const getStatColor = (statValue) => {
    if (statValue >= 150) return "#00ff00";
    if (statValue >= 100) return "#90ee90";
    if (statValue >= 50) return "#ffd900";
    return "#ff4444";
  };

  return (
    <div className="stats-display" style={{ marginTop: '0.5rem' }}>
      {stats.map((stat) => (
        <div key={stat.stat.name} className="stat-row" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.3rem' }}>
          <span className="stat-name" style={{ flex: 1, fontSize: '0.8rem' }}>
            {stat.stat.name === 'special-attack' ? 'Sp. Atk' :
             stat.stat.name === 'special-defense' ? 'Sp. Def' :
             stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1)}
          </span>
          <div className="stat-bar-container" style={{ flex: 2, backgroundColor: 'rgba(255, 255, 255, 0.2)', borderRadius: '3px', overflow: 'hidden' }}>
            <motion.div
              className="stat-bar"
              initial={{ width: 0 }}
              animate={{ width: `${(stat.base_stat / 255) * 100}%` }}
              style={{ 
                backgroundColor: getStatColor(stat.base_stat),
                height: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
                paddingRight: '4px',
                color: 'black',
                fontSize: '0.7rem',
                fontWeight: 'bold'
              }}
            >
              {stat.base_stat}
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PokemonStats;