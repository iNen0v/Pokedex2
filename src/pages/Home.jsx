import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import PokemonList from '../components/PokemonList';
import Filters from '../components/Filters';
import { fetchPokemons } from '../redux/actions';

function Home() {
  const dispatch = useDispatch();
  const { data: pokemons, loading } = useSelector(state => state.pokemons);
  const [sortBy, setSortBy] = useState('id');
  const [filters, setFilters] = useState({
    type: '',
    minAttack: '',
    minDefense: ''
  });

  useEffect(() => {
    dispatch(fetchPokemons());
  }, [dispatch]);

  const filterAndSortPokemons = () => {
    let filtered = pokemons;

    if (filters.type) {
      filtered = filtered.filter(pokemon =>
        pokemon.types.some(t => t.type.name === filters.type)
      );
    }

    if (filters.minAttack) {
      filtered = filtered.filter(pokemon =>
        pokemon.stats[1].base_stat >= parseInt(filters.minAttack)
      );
    }

    if (filters.minDefense) {
      filtered = filtered.filter(pokemon =>
        pokemon.stats[2].base_stat >= parseInt(filters.minDefense)
      );
    }

    return [...filtered].sort((a, b) => {
      switch(sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'attack':
          return b.stats[1].base_stat - a.stats[1].base_stat;
        case 'defense':
          return b.stats[2].base_stat - a.stats[2].base_stat;
        default:
          return a.id - b.id;
      }
    });
  };

  const filteredAndSortedPokemons = filterAndSortPokemons();

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-[300px] mx-auto py-6">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/98/International_Pok%C3%A9mon_logo.svg"
          alt="Pokemon Logo"
          className="w-full"
        />
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex gap-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-2 rounded bg-gray-800 text-white"
            >
              <option value="id">Number</option>
              <option value="name">Name</option>
              <option value="attack">Attack</option>
              <option value="defense">Defense</option>
            </select>

            <Filters filters={filters} setFilters={setFilters} />
          </div>
        </div>

        {loading ? (
          <div className="text-center">Loading...</div>
        ) : (
          <PokemonList
            pokemons={filteredAndSortedPokemons}
            onPokemonSelect={() => {}}
            battleMode={false}
          />
        )}
      </div>
    </div>
  );
}

export default Home;