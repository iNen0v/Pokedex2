import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/reducers/favoritesReducer';

function Details() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState(null);
  const favorites = useSelector(state => state.favorites) || [];
  const isFavorite = favorites.includes(Number(id));

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        setPokemon(response.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPokemon();
  }, [id]);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(Number(id)));
  };

  if (!pokemon) return <div className="loading">Loading...</div>;

  return (
    <motion.div 
      className="details-page"
      style={{
        padding: '2rem',
        maxWidth: '800px',
        margin: '0 auto',
        color: 'white'
      }}
    >
      <motion.button 
        onClick={() => navigate('/')}
        style={{
          background: 'none',
          border: 'none',
          color: 'white',
          cursor: 'pointer',
          fontSize: '1.1rem',
          marginBottom: '2rem'
        }}
      >
        ← Back to Pokédex
      </motion.button>

      <div className="pokemon-info">
        <h1 style={{ textTransform: 'capitalize', marginBottom: '1.5rem' }}>
          {pokemon.name}
        </h1>
        
        <div className="pokemon-images" style={{ 
          display: 'flex',
          gap: '2rem',
          justifyContent: 'center',
          marginBottom: '2rem'
        }}>
          <img 
            src={pokemon.sprites.front_default} 
            alt={pokemon.name}
            style={{ width: '150px', height: '150px' }}
          />
          <img 
            src={pokemon.sprites.back_default} 
            alt={`${pokemon.name} back`}
            style={{ width: '150px', height: '150px' }}
          />
        </div>

        <div className="basic-info" style={{ marginBottom: '2rem' }}>
          <div>Height: {pokemon.height/10}m</div>
          <div>Weight: {pokemon.weight/10}kg</div>
          <div>Base Experience: {pokemon.base_experience}</div>
        </div>

        <div className="stats-section" style={{ marginBottom: '2rem' }}>
          <h3 style={{ marginBottom: '1rem' }}>Stats</h3>
          {pokemon.stats.map(stat => (
            <div key={stat.stat.name} className="stat-row" style={{ marginBottom: '0.5rem' }}>
              <span className="stat-name">
                {stat.stat.name === 'hp' ? 'HP' :
                 stat.stat.name === 'attack' ? 'Attack' :
                 stat.stat.name === 'defense' ? 'Defense' :
                 stat.stat.name === 'special-attack' ? 'Special Attack' :
                 stat.stat.name === 'special-defense' ? 'Special Defense' :
                 stat.stat.name === 'speed' ? 'Speed' : stat.stat.name}
                 : {stat.base_stat}
              </span>
              <div className="stat-bar" style={{ 
                background: '#333',
                borderRadius: '4px',
                height: '8px',
                overflow: 'hidden',
                marginTop: '4px'
              }}>
                <motion.div 
                  className="stat-fill"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stat.base_stat / 255) * 100}%` }}
                  transition={{ duration: 0.8 }}
                  style={{
                    height: '100%',
                    background: '#ffd700'
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={handleFavoriteClick}
          style={{
            width: '100%',
            padding: '1rem',
            backgroundColor: isFavorite ? '#ff4444' : '#ffd700',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'background-color 0.3s',
            color: 'black'
          }}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </motion.div>
  );
}

export default Details;