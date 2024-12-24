import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import PokemonStats from './PokemonStats';
import TypeAdvantages from './TypeAdvantages';

function PokemonDetails({ pokemon }) {
  const { id } = useParams();

  return (
    <div className="pokemon-details" style={{ padding: '2rem', color: 'white' }}>
      <Link to="/" className="back-button" style={{ 
        color: 'white', 
        textDecoration: 'none',
        marginBottom: '1rem',
        display: 'inline-block' 
      }}>
        ← Back to Pokédex
      </Link>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="details-content"
      >
        <h1 style={{ 
          textTransform: 'capitalize',
          marginBottom: '1rem'
        }}>{pokemon.name}</h1>

        <div className="pokemon-images" style={{ 
          display: 'flex',
          gap: '2rem',
          marginBottom: '2rem'
        }}>
          <img src={pokemon.sprites.front_default} alt={pokemon.name} />
          <img src={pokemon.sprites.back_default} alt={pokemon.name} />
        </div>

        <div className="pokemon-info" style={{ marginBottom: '2rem' }}>
          <p>Height: {pokemon.height / 10}m</p>
          <p>Weight: {pokemon.weight / 10}kg</p>
          <p>Base Experience: {pokemon.base_experience}</p>
        </div>

        <div className="pokemon-stats">
          <h2 style={{ marginBottom: '1rem' }}>Stats</h2>
          <PokemonStats stats={pokemon.stats} />
        </div>

        <div className="pokemon-types" style={{ marginTop: '2rem' }}>
          <TypeAdvantages types={pokemon.types} />
        </div>

        <div style={{ marginTop: '2rem' }}>
          <button 
            onClick={() => {}}  
            style={{
              width: '100%',
              padding: '1rem',
              backgroundColor: '#ffd700',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Add to Favorites
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default PokemonDetails;