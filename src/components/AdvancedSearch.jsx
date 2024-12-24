import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchPokemons } from '../redux/actions';

const pokemonTypes = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 
  'rock', 'bug', 'ghost', 'steel', 'fire', 'water', 
  'grass', 'electric', 'psychic', 'ice', 'dragon', 
  'dark', 'fairy'
];

function AdvancedSearch({ onSearch }) {
  const dispatch = useDispatch();
  const [filters, setFilters] = useState({
    type: '',
    minAttack: '',
    minDefense: '',
    ability: '',
    minHeight: '',
    minWeight: ''
  });

  const handleSearch = () => {
    dispatch(fetchPokemons({ filters }));
    onSearch(filters);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 bg-gray-100 rounded-lg">
      <select 
        value={filters.type}
        onChange={(e) => setFilters({...filters, type: e.target.value})}
        className="p-2 border rounded"
      >
        <option value="">All Types</option>
        {pokemonTypes.map(type => (
          <option key={type} value={type}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </option>
        ))}
      </select>

      <input 
        type="number"
        placeholder="Min Attack"
        value={filters.minAttack}
        onChange={(e) => setFilters({...filters, minAttack: e.target.value})}
        className="p-2 border rounded"
      />

      <input 
        type="number"
        placeholder="Min Defense"
        value={filters.minDefense}
        onChange={(e) => setFilters({...filters, minDefense: e.target.value})}
        className="p-2 border rounded"
      />

      <input 
        type="text"
        placeholder="Ability"
        value={filters.ability}
        onChange={(e) => setFilters({...filters, ability: e.target.value})}
        className="p-2 border rounded"
      />

      <input 
        type="number"
        placeholder="Min Height"
        value={filters.minHeight}
        onChange={(e) => setFilters({...filters, minHeight: e.target.value})}
        className="p-2 border rounded"
      />

      <input 
        type="number"
        placeholder="Min Weight"
        value={filters.minWeight}
        onChange={(e) => setFilters({...filters, minWeight: e.target.value})}
        className="p-2 border rounded"
      />

      <button 
        onClick={handleSearch}
        className="col-span-2 md:col-span-3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Apply Filters
      </button>
    </div>
  );
}

export default AdvancedSearch;