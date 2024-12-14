import React from 'react';
import { motion } from 'framer-motion';

const typeRelations = {
  normal: {
    weakTo: ['fighting'],
    immuneTo: ['ghost'],
    resistantTo: []
  },
  fire: {
    weakTo: ['water', 'ground', 'rock'],
    resistantTo: ['fire', 'grass', 'ice', 'bug', 'steel', 'fairy'],
    immuneTo: []
  },
  water: {
    weakTo: ['electric', 'grass'],
    resistantTo: ['fire', 'water', 'ice', 'steel'],
    immuneTo: []
  },
  grass: {
    weakTo: ['fire', 'ice', 'poison', 'flying', 'bug'],
    resistantTo: ['water', 'grass', 'electric', 'ground'],
    immuneTo: []
  },
  electric: {
    weakTo: ['ground'],
    resistantTo: ['electric', 'flying', 'steel'],
    immuneTo: []
  },
  ice: {
    weakTo: ['fire', 'fighting', 'rock', 'steel'],
    resistantTo: ['ice'],
    immuneTo: []
  },
  fighting: {
    weakTo: ['flying', 'psychic', 'fairy'],
    resistantTo: ['bug', 'rock', 'dark'],
    immuneTo: []
  },
  poison: {
    weakTo: ['ground', 'psychic'],
    resistantTo: ['grass', 'fighting', 'poison', 'bug', 'fairy'],
    immuneTo: []
  },
  ground: {
    weakTo: ['water', 'grass', 'ice'],
    resistantTo: ['poison', 'rock'],
    immuneTo: ['electric']
  },
  flying: {
    weakTo: ['electric', 'ice', 'rock'],
    resistantTo: ['grass', 'fighting', 'bug'],
    immuneTo: ['ground']
  },
  psychic: {
    weakTo: ['bug', 'ghost', 'dark'],
    resistantTo: ['fighting', 'psychic'],
    immuneTo: []
  },
  bug: {
    weakTo: ['fire', 'flying', 'rock'],
    resistantTo: ['grass', 'fighting', 'ground'],
    immuneTo: []
  },
  rock: {
    weakTo: ['water', 'grass', 'fighting', 'ground', 'steel'],
    resistantTo: ['normal', 'fire', 'poison', 'flying'],
    immuneTo: []
  },
  ghost: {
    weakTo: ['ghost', 'dark'],
    resistantTo: ['poison', 'bug'],
    immuneTo: ['normal', 'fighting']
  },
  dragon: {
    weakTo: ['ice', 'dragon', 'fairy'],
    resistantTo: ['fire', 'water', 'grass', 'electric'],
    immuneTo: []
  },
  dark: {
    weakTo: ['fighting', 'bug', 'fairy'],
    resistantTo: ['ghost', 'dark'],
    immuneTo: ['psychic']
  },
  steel: {
    weakTo: ['fire', 'fighting', 'ground'],
    resistantTo: ['normal', 'grass', 'ice', 'flying', 'psychic', 'bug', 'rock', 'dragon', 'steel', 'fairy'],
    immuneTo: ['poison']
  },
  fairy: {
    weakTo: ['poison', 'steel'],
    resistantTo: ['fighting', 'bug', 'dark'],
    immuneTo: ['dragon']
  }
};

function TypeAdvantages({ types }) {
  const getTypeEffectiveness = () => {
    let weaknesses = new Set();
    let resistances = new Set();
    let immunities = new Set();

    types.forEach(type => {
      const relations = typeRelations[type.type.name];
      relations.weakTo?.forEach(t => weaknesses.add(t));
      relations.resistantTo?.forEach(t => resistances.add(t));
      relations.immuneTo?.forEach(t => immunities.add(t));
    });

    return { weaknesses, resistances, immunities };
  };

  const { weaknesses, resistances, immunities } = getTypeEffectiveness();

  return (
    <motion.div 
      className="type-advantages"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}
    >
      <div className="effectiveness-section" style={{ marginBottom: '0.3rem' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>Weak Against</h4>
        <div className="type-list">
          {[...weaknesses].map(type => (
            <span 
              key={type} 
              className={`type ${type}`}
              style={{
                padding: '2px 4px',
                borderRadius: '3px',
                marginRight: '2px',
                fontSize: '0.7rem',
                display: 'inline-block'
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="effectiveness-section" style={{ marginBottom: '0.3rem' }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>Resistant To</h4>
        <div className="type-list">
          {[...resistances].map(type => (
            <span 
              key={type} 
              className={`type ${type}`}
              style={{
                padding: '2px 4px',
                borderRadius: '3px',
                marginRight: '2px',
                fontSize: '0.7rem',
                display: 'inline-block'
              }}
            >
              {type}
            </span>
          ))}
        </div>
      </div>

      {immunities.size > 0 && (
        <div className="effectiveness-section">
          <h4 style={{ fontWeight: 'bold', marginBottom: '0.2rem' }}>Immune To</h4>
          <div className="type-list">
            {[...immunities].map(type => (
              <span 
                key={type} 
                className={`type ${type}`}
                style={{
                  padding: '2px 4px',
                  borderRadius: '3px',
                  marginRight: '2px',
                  fontSize: '0.7rem',
                  display: 'inline-block'
                }}
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default TypeAdvantages;