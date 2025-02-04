import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import PokemonList from '../components/PokemonList';
import Filters from '../components/Filters';
import SearchBar from '../components/SearchBar';
import { fetchPokemons } from '../redux/actions';
import '../styles/Home.scss';

const LoadingSpinner = () => (
  <motion.div 
    className="pokemon-home__loading"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
  >
    <motion.div 
      className="pokemon-home__pokeball-spinner"
      animate={{ rotate: 360 }}
      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
    />
    <motion.p
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="pokemon-home__loading-text"
    >
      Loading Pokémon...
    </motion.p>
  </motion.div>
);

function Home() {
  const dispatch = useDispatch();
  const { data: pokemons, loading } = useSelector(state => state.pokemons);
  const [sortBy, setSortBy] = useState('id');
  const [filters, setFilters] = useState({
    types: [],
    showRare: false
  });
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const filterAndSortPokemons = () => {
    if (!pokemons) return [];
    
    let filtered = [...pokemons];

    if (searchQuery) {
      filtered = filtered.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (filters.types?.length > 0) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(t => filters.types.includes(t.type.name))
      );
    }

    if (filters.showRare) {
      filtered = filtered.filter(pokemon => 
        pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0) >= 500
      );
    }

    return filtered.sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return a.id - b.id;
    });
  };

  const filteredAndSortedPokemons = filterAndSortPokemons();

  return (
    <div className="pokemon-home">
      <div className="pokemon-home__background-pattern" />
      <div className="pokemon-home__content">
        <motion.div 
          className="pokemon-home__logo-container"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
            alt="Pokemon Logo"
            className="pokemon-home__logo"
          />
        </motion.div>

        <div className="pokemon-home__control-panel">
          <SearchBar 
            pokemons={pokemons} 
            onSelect={(pokemon) => {
              setSearchQuery(pokemon.name);
            }}
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="pokemon-home__select"
          >
            <option value="id">Number</option>
            <option value="name">Name</option>
          </select>

          <Filters filters={filters} setFilters={setFilters} />
        </div>

        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingSpinner />
          ) : (
            <motion.div
              key="pokemon-list"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <PokemonList
                pokemons={filteredAndSortedPokemons}
                onPokemonSelect={() => {}}
                battleMode={false}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default Home;