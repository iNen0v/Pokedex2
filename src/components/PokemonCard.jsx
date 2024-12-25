import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/PokemonCard.scss';

const typeColors = {
 normal: '#A8A878',
 fire: '#f03030',
 water: '#6890F0',
 grass: '#78C850',
 electric: '#F8D030',
 ice: '#98D8D8',
 fighting: '#c06528',
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

function PokemonCard({ pokemon, isFavorite, isSelected }) {
 const [details, setDetails] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   const fetchDetails = async () => {
     try {
       if (pokemon?.url) {
         const response = await axios.get(pokemon.url);
         setDetails(response.data);
       } else {
         setDetails(pokemon);
       }
     } catch (error) {
       console.error('Error fetching pokemon details:', error);
     }
     setLoading(false);
   };

   if (pokemon) {
     fetchDetails();
   }
 }, [pokemon]);

 if (!pokemon || loading) return <div className="pokemon-card loading">Loading...</div>;
 if (!details) return <div className="pokemon-card error">Error loading Pokemon</div>;

 const mainType = details.types[0].type.name;
 const mainColor = typeColors[mainType];

 return (
   <motion.div
     className={`pokemon-card ${isSelected ? 'selected' : ''}`}
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     whileHover={{ y: -5 }}
     style={{
       background: `linear-gradient(to bottom right, rgba(30, 58, 138, 0.7), rgba(30, 58, 138, 0.3))`, // тъмно синьо с прозрачност
       borderColor: mainColor
     }}
   >
     <div className="pokemon-card__header">
       <span className="pokemon-card__number">
         #{String(details.id).padStart(4, '0')}
       </span>
       {isFavorite && (
         <span className="pokemon-card__favorite">★</span>
       )}
     </div>

     <div className="pokemon-card__content">
       <div className="pokemon-card__image-container">
         <img 
           src={details.sprites.front_default}
           alt={details.name}
           className="pokemon-card__image"
         />
       </div>

       <h3 className="pokemon-card__name">{details.name}</h3>

       <div className="pokemon-card__types">
         {details.types.map((type) => (
           <span
             key={type.type.name}
             className="pokemon-card__type"
             style={{ backgroundColor: typeColors[type.type.name] }}
           >
             {type.type.name}
           </span>
         ))}
       </div>
     </div>
   </motion.div>
 );
}

export default PokemonCard;