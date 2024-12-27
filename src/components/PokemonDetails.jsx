import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../redux/reducers/favoritesReducer';
import PokemonStats from './PokemonStats';
import TypeAdvantages from './TypeAdvantages';
import EvolutionChain from './EvolutionChain';
import '../styles/PokemonDetails.scss';

const typeColors = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC'
};

function PokemonDetails() {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [pokemon, setPokemon] = useState(null);
  const [pokemonSpecies, setPokemonSpecies] = useState(null);
  const favorites = useSelector(state => state.favorites) || [];
  const isFavorite = favorites.includes(Number(id));

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const [pokemonResponse, speciesResponse] = await Promise.all([
          axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
          axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
        ]);
        
        setPokemon(pokemonResponse.data);
        setPokemonSpecies(speciesResponse.data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchPokemonData();
  }, [id]);

  const handleFavoriteClick = () => {
    dispatch(toggleFavorite(Number(id)));
  };

  if (!pokemon || !pokemonSpecies) return <div className="loading">Loading...</div>;

  const mainType = pokemon.types[0].type.name;
  const backgroundColor = typeColors[mainType];

  const description = pokemonSpecies.flavor_text_entries
    .find(entry => entry.language.name === 'en')
    ?.flavor_text.replace(/\f/g, ' ');

  return (
    <div className="pokemon-details">
      <Link to="/" className="back-button">
        ← Back to Pokédex
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="detail-card"
        style={{
          background: `linear-gradient(135deg, ${backgroundColor}88 0%, ${backgroundColor}44 100%)`
        }}
      >
        <div className="detail-card__header">
          <h1 className="detail-card__title">{pokemon.name}</h1>
          <div className="detail-card__types">
            {pokemon.types.map(type => (
              <span 
                key={type.type.name} 
                className="type-badge"
                style={{ backgroundColor: typeColors[type.type.name] }}
              >
                {type.type.name}
              </span>
            ))}
          </div>
        </div>

        <div className="detail-card__body">
          <div className="detail-card__main-info">
            <div className="detail-card__sprites">
              <motion.img 
                src={pokemon.sprites.front_default} 
                alt={pokemon.name}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
              <motion.img 
                src={pokemon.sprites.back_default} 
                alt={pokemon.name}
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </div>

            <div className="detail-card__description">
              <p>{description}</p>
            </div>
          </div>

          <div className="detail-card__info-grid">
            <div className="info-group">
              <h3>Classification</h3>
              <p>{pokemonSpecies.genera.find(g => g.language.name === 'en')?.genus}</p>
              <p><strong>Height:</strong> {pokemon.height / 10}m</p>
              <p><strong>Weight:</strong> {pokemon.weight / 10}kg</p>
            </div>

            <div className="info-group">
              <h3>Training</h3>
              <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
              <p><strong>Base Happiness:</strong> {pokemonSpecies.base_happiness}</p>
              <p><strong>Catch Rate:</strong> {pokemonSpecies.capture_rate}</p>
              <p><strong>Growth Rate:</strong> {pokemonSpecies.growth_rate.name}</p>
            </div>

            <div className="info-group">
              <h3>Breeding</h3>
              <p><strong>Egg Groups:</strong> {
                pokemonSpecies.egg_groups.map(group => group.name).join(', ')
              }</p>
              <p><strong>Habitat:</strong> {pokemonSpecies.habitat?.name || 'Unknown'}</p>
              <p><strong>Generation:</strong> {
                pokemonSpecies.generation.name.split('-')[1].toUpperCase()
              }</p>
            </div>

            <div className="info-group">
              <h3>Abilities</h3>
              <div className="abilities-list">
                {pokemon.abilities.map(ability => (
                  <span key={ability.ability.name} className="ability-badge">
                    {ability.ability.name}
                    {ability.is_hidden && <small>(Hidden)</small>}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Добавяме секцията с еволюциите */}
          <div className="detail-card__evolution">
            <EvolutionChain speciesUrl={`https://pokeapi.co/api/v2/pokemon-species/${id}/`} />
          </div>
        </div>

        <motion.button
          className="favorite-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          style={{
            backgroundColor: isFavorite ? '#ff4444' : backgroundColor,
            color: '#FFF'
          }}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </motion.button>
      </motion.div>
    </div>
  );
}

export default PokemonDetails;