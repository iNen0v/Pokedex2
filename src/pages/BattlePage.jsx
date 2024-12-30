import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import BattleList from "../components/BattleList";
import "../styles/BattlePage.scss";

const pokemonTypes = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
];

function BattlePage() {
  const navigate = useNavigate();
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const { data: pokemons, loading } = useSelector((state) => state.pokemons);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(null);
  const [activeTab, setActiveTab] = useState(null);

  const handlePokemonSelect = (pokemon) => {
    if (!selectedPokemon) {
      setSelectedPokemon(pokemon);
    } else if (pokemon.id !== selectedPokemon.id) {
      setOpponent(pokemon);
    }
  };

  const handleStartBattle = () => {
    if (selectedPokemon && opponent) {
      navigate(`/battle-arena/${selectedPokemon.id}/${opponent.id}`);
    }
  };

  const handleCancelSelection = () => {
    setSelectedPokemon(null);
    setOpponent(null);
    setSelectedType(null);
  };

  const handleTypeFilter = (type) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const filteredPokemons = pokemons?.filter((pokemon) => {
    const matchesSearch = pokemon.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesType =
      !selectedType || pokemon.types.some((t) => t.type.name === selectedType);
    return matchesSearch && matchesType;
  });

  return (
    <div className="battle-page">
      <motion.div
        className="battle-page__content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="battle-page__header">
          <motion.button
            className="back-button"
            onClick={() => navigate("/")}
            whileHover={{ x: -5 }}
          >
            ← Back to Pokédex
          </motion.button>
        </div>

        <div className="search-section">
          <motion.div
            className="search-container"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <input
              type="text"
              placeholder="Search for your next champion..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pokemon-search"
            />
          </motion.div>

          <motion.div
            className="type-filters"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            {pokemonTypes.map((type) => (
              <motion.button
                key={type}
                className={`${type} ${selectedType === type ? "active" : ""}`}
                onClick={() => handleTypeFilter(type)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {type}
              </motion.button>
            ))}
            {selectedType && (
              <motion.button
                className="clear-filter"
                onClick={() => setSelectedType(null)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear {selectedType} filter
              </motion.button>
            )}
          </motion.div>
        </div>

        <AnimatePresence mode="wait">
          {selectedPokemon && !opponent && (
            <motion.div
              className="selection-status"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <span className="status-text">
                <span className="selected-name">{selectedPokemon.name}</span> is
                ready! Choose your opponent
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {selectedPokemon && opponent && (
          <motion.div
            className="battle-controls"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.button
              className="battle-button start"
              onClick={handleStartBattle}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ⚔️ Start Battle!
            </motion.button>
            <motion.button
              className="battle-button cancel"
              onClick={handleCancelSelection}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ✖️ Cancel
            </motion.button>
          </motion.div>
        )}

        {loading ? (
          <motion.div
            className="loading"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            Loading champions...
          </motion.div>
        ) : (
          <BattleList
            pokemons={filteredPokemons}
            onPokemonSelect={handlePokemonSelect}
            selectedPokemonId={selectedPokemon?.id}
            opponentId={opponent?.id}
          />
        )}
      </motion.div>
    </div>
  );
}

export default BattlePage;
