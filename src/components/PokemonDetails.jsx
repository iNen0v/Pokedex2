import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import Battle from '../components/Battle';

function PokemonDetails() {
 const navigate = useNavigate();
 const { id } = useParams();
 const [pokemon, setPokemon] = useState(null);
 const [showBattle, setShowBattle] = useState(false);
 const [opponent, setOpponent] = useState(null);
 const [opponents, setOpponents] = useState([]);

 useEffect(() => {
   const fetchPokemon = async () => {
     try {
       const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
       setPokemon(response.data);
     } catch (error) {
       console.error('Error:', error);
     }
   };

   const fetchOpponents = async () => {
     try {
       const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151');
       const results = response.data.results;
       const opponentDetails = await Promise.all(
         results.map(async (pokemon) => {
           const detailResponse = await axios.get(pokemon.url);
           return detailResponse.data;
         })
       );
       setOpponents(opponentDetails);
     } catch (error) {
       console.error('Error fetching opponents:', error);
     }
   };

   fetchPokemon();
   fetchOpponents();
 }, [id]);

 if (!pokemon) return <div className="loading">Loading...</div>;

 return (
   <motion.div className="details-page">
     <motion.button onClick={() => navigate('/')}>
       ← Back to Pokédex
     </motion.button>

     <div className="pokemon-info">
       <h1>{pokemon.name}</h1>
       
       <div className="pokemon-images">
         <img src={pokemon.sprites.front_default} alt={pokemon.name} />
         <img src={pokemon.sprites.back_default} alt={`${pokemon.name} back`} />
       </div>

       <div className="basic-info">
         <div>Height: {pokemon.height/10}m</div>
         <div>Weight: {pokemon.weight/10}kg</div>
         <div>Base Experience: {pokemon.base_experience}</div>
       </div>

       <div className="stats-section">
         <h3>Stats</h3>
         {pokemon.stats.map(stat => (
           <div key={stat.stat.name} className="stat-row">
             <span className="stat-name">
               {stat.stat.name === 'hp' ? 'HP' :
                stat.stat.name === 'attack' ? 'Attack' :
                stat.stat.name === 'defense' ? 'Defense' :
                stat.stat.name === 'special-attack' ? 'Special Attack' :
                stat.stat.name === 'special-defense' ? 'Special Defense' :
                stat.stat.name === 'speed' ? 'Speed' : stat.stat.name}
                : {stat.base_stat}
             </span>
             <div className="stat-bar">
               <motion.div 
                 className="stat-fill"
                 initial={{ width: 0 }}
                 animate={{ width: `${(stat.base_stat / 255) * 100}%` }}
                 transition={{ duration: 0.8 }}
               />
             </div>
           </div>
         ))}
       </div>

       <div className="battle-section">
         <select 
           onChange={(e) => {
             const selectedPokemon = opponents.find(p => p.id === parseInt(e.target.value));
             setOpponent(selectedPokemon);
           }}
           className="opponent-select"
         >
           <option value="">Select opponent</option>
           {opponents.map(p => (
             <option key={p.id} value={p.id}>{p.name}</option>
           ))}
         </select>

         <button 
           className="battle-btn"
           onClick={() => setShowBattle(true)}
           disabled={!opponent}
         >
           Start Battle
         </button>
       </div>

       {showBattle && (
         <Battle 
           pokemon1={pokemon}
           pokemon2={opponent}
           onClose={() => setShowBattle(false)}
         />
       )}
     </div>
   </motion.div>
 );
}

export default PokemonDetails;