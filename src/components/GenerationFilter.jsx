import React from 'react';
import { motion } from 'framer-motion';

const generations = [
  { id: 1, range: [1, 151], name: "Generation I" },
  { id: 2, range: [152, 251], name: "Generation II" },
  { id: 3, range: [252, 386], name: "Generation III" }
];

function GenerationFilter({ selectedGen, setSelectedGen }) {
  return (
    <div className="generation-filter">
      <select 
        value={selectedGen} 
        onChange={(e) => setSelectedGen(e.target.value)}
      >
        <option value="">All Generations</option>
        {generations.map(gen => (
          <option key={gen.id} value={gen.id}>
            {gen.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenerationFilter;