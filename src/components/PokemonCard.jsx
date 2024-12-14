import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import PokemonStats from './PokemonStats';
import TypeAdvantages from './TypeAdvantages';


function PokemonCard({ pokemon, delay }) {
 const [details, setDetails] = useState(null);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   const fetchDetails = async () => {
     try {
       if (pokemon.url) {
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

   fetchDetails();
 }, [pokemon]);

 if (loading || !details) return <div className="pokemon-card loading">Loading...</div>;

 return (
   <motion.div
     className="pokemon-card"
     initial={{ opacity: 0, y: 20 }}
     animate={{ opacity: 1, y: 0 }}
     transition={{ delay }}
     whileHover={{ y: -5 }}
   >
     <span className="pokemon-number">
       #{String(details.id).padStart(4, '0')}
     </span>

     <img
       src={details.sprites.front_default}
       alt={details.name}
       className="pokemon-image"
     />

     <div className="pokemon-info">
       <h3>{details.name}</h3>

       <div className="types">
         {details.types.map((type) => (
           <span key={type.type.name} className={`type ${type.type.name}`}>
             {type.type.name}
           </span>
         ))}
       </div>

       <PokemonStats stats={details.stats} />
       <TypeAdvantages types={details.types} />
     </div>
   </motion.div>
 );
}

export default PokemonCard;