import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/EvolutionChain.scss';

function EvolutionChain({ speciesUrl }) {
  const [evolutionData, setEvolutionData] = useState(null);
  const [evolutionChain, setEvolutionChain] = useState([]);

  useEffect(() => {
    const fetchEvolutionData = async () => {
      try {
        const speciesResponse = await axios.get(speciesUrl);
        const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
        setEvolutionData(evolutionResponse.data);
      } catch (error) {
        console.error('Error fetching evolution data:', error);
      }
    };

    fetchEvolutionData();
  }, [speciesUrl]);

  useEffect(() => {
    if (evolutionData) {
      const chain = [];
      let currentEvolution = evolutionData.chain;

      while (currentEvolution) {
        chain.push({
          name: currentEvolution.species.name,
          url: currentEvolution.species.url, // Добавяме URL
          min_level: currentEvolution.evolution_details[0]?.min_level,
          trigger: currentEvolution.evolution_details[0]?.trigger?.name,
          item: currentEvolution.evolution_details[0]?.item?.name
        });
        currentEvolution = currentEvolution.evolves_to[0];
      }
      setEvolutionChain(chain);
    }
  }, [evolutionData]);

  return (
    <div className="evolution-chain">
      <h3>Evolution Chain</h3>
      <div className="evolution-stages">
        {evolutionChain.map((evolution, index) => (
          <React.Fragment key={evolution.name}>
            {index > 0 && <div className="evolution-arrow">→</div>}
            <motion.div 
              className="evolution-stage"
              whileHover={{ scale: 1.05 }}
            >
              <img 
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${getPokemonId(evolution)}.png`}
                alt={evolution.name}
              />
              <span className="evolution-name">{evolution.name}</span>
              {evolution.min_level && (
                <span className="evolution-level">Level {evolution.min_level}</span>
              )}
              {evolution.item && (
                <span className="evolution-item">{evolution.item}</span>
              )}
            </motion.div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}

function getPokemonId(evolution) {
  const urlParts = evolution.url.split('/');
  return urlParts[urlParts.length - 2];
}

export default EvolutionChain;