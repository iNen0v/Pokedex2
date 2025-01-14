import React from 'react';
import HPBar from './HPBar';
import '../styles/ArenaCard.scss';

const ArenaCard = ({ pokemon, isActive }) => {
  return (
    <div className={`battle-card ${isActive ? 'active' : ''}`}>
      <div className="pokemon-sprite">
        <img 
          src={pokemon.sprites.front_default} 
          alt={pokemon.name} 
          className="battle-arena__pokemon-card-image"
        />
      </div>
      <h3 className="battle-arena__pokemon-card-name">{pokemon.name}</h3>
      <HPBar currentHP={pokemon.currentHP} maxHP={pokemon.stats[0].base_stat} />
      <div className="pokemon-types">
        {pokemon.types.map(type => (
          <span key={type.type.name} className={`type-badge ${type.type.name}`}>
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default ArenaCard;