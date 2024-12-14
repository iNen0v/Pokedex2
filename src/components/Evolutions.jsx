import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

function Evolutions({ pokemonId }) {
  const [evolutionChain, setEvolutionChain] = useState(null);

  useEffect(() => {
    const fetchEvolutions = async () => {
      try {
        // Fetch the Pokémon species information
        const speciesRes = await axios.get(
          `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
        );
        // Fetch the evolution chain
        const evolutionRes = await axios.get(speciesRes.data.evolution_chain.url);
        setEvolutionChain(evolutionRes.data.chain);
      } catch (error) {
        console.error("Error fetching evolution chain:", error);
      }
    };

    fetchEvolutions();
  }, [pokemonId]);

  const renderEvolutionChain = (chain) => {
    return (
      <div className="evolution-chain">
        {/* Current Pokémon */}
        <motion.div
          className="evolution-item"
          whileHover={{ scale: 1.1 }}
          key={chain.species.name}
        >
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              chain.species.url.split("/")[6]
            }.png`}
            alt={chain.species.name}
          />
          <p>{chain.species.name}</p>
        </motion.div>
        {/* Recursive rendering for next evolutions */}
        {chain.evolves_to.length > 0 && (
          <>
            <span className="evolution-arrow">→</span>
            <div className="evolutions-next">
              {chain.evolves_to.map((evolution) => renderEvolutionChain(evolution))}
            </div>
          </>
        )}
      </div>
    );
  };

  return (
    <div className="evolutions">
      <h3>Evolution Chain</h3>
      {evolutionChain ? (
        renderEvolutionChain(evolutionChain)
      ) : (
        <p>Loading evolution chain...</p>
      )}
    </div>
  );
}

export default Evolutions;