import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/EvolutionChain.scss';

function EvolutionChain({ speciesUrl }) {
  const [evolutionData, setEvolutionData] = useState(null);
  const [evolutionStages, setEvolutionStages] = useState([]);

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
      // Build evolution stages that handle branched evolutions
      const stages = [];
      
      const processEvolutionChain = (chain, stageIndex) => {
        // Ensure we have an array for this stage
        if (!stages[stageIndex]) {
          stages[stageIndex] = [];
        }
        
        // Add current pokemon to this stage
        stages[stageIndex].push({
          name: chain.species.name,
          url: chain.species.url,
          min_level: chain.evolution_details[0]?.min_level,
          trigger: chain.evolution_details[0]?.trigger?.name,
          item: chain.evolution_details[0]?.item?.name
        });
        
        // Process all evolution branches (not just the first one)
        if (chain.evolves_to && chain.evolves_to.length > 0) {
          chain.evolves_to.forEach(evolution => {
            processEvolutionChain(evolution, stageIndex + 1);
          });
        }
      };
      
      processEvolutionChain(evolutionData.chain, 0);
      setEvolutionStages(stages);
    }
  }, [evolutionData]);

  return (
    <div className="evolution-chain">
      <h3>Evolution Chain</h3>
      <div className="evolution-stages">
        {evolutionStages.map((stage, stageIndex) => (
          <React.Fragment key={`stage-${stageIndex}`}>
            {stageIndex > 0 && <div className="evolution-arrow">→</div>}
            <div className={`evolution-stage-group ${stage.length > 1 ? 'branched' : ''}`}>
              {stage.map((evolution) => (
                <motion.div 
                  key={evolution.name}
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
              ))}
            </div>
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