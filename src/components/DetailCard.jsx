import React from 'react';
import { motion } from 'framer-motion';

function DetailCard({ pokemon }) {
  return (
    <motion.div 
      className="detail-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="detail-card__header">
        <div className="detail-card__sprites">
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <img src={pokemon.sprites.back_default} alt={pokemon.name} />
        </div>
        <h2 className="detail-card__name">{pokemon.name}</h2>
      </div>

      <div className="detail-card__info">
        <div className="detail-card__stats">
          <h3>Base Info</h3>
          <div className="detail-card__stat">
            <span>Height:</span> {pokemon.height / 10}m
          </div>
          <div className="detail-card__stat">
            <span>Weight:</span> {pokemon.weight / 10}kg
          </div>
          <div className="detail-card__stat">
            <span>Base Experience:</span> {pokemon.base_experience}
          </div>
        </div>

        <div className="detail-card__abilities">
          <h3>Abilities</h3>
          {pokemon.abilities.map((ability) => (
            <div key={ability.ability.name} className="detail-card__ability">
              {ability.ability.name}
              {ability.is_hidden && <span>(Hidden)</span>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
export default DetailCard;