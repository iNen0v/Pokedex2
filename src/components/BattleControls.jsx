import React from 'react';
import '../styles/BattleControls.scss';
const BattleControls = ({ pokemon, onAttack, disabled }) => {
  return (
    <div className="battle-controls">
      {pokemon.moves.slice(0, 4).map((move) => (
        <button
          key={move.move.name}
          onClick={() => onAttack(move)}
          disabled={disabled}
          className="battle-button"
        >
          {move.move.name}
        </button>
      ))}
    </div>
  );
};

export default BattleControls;