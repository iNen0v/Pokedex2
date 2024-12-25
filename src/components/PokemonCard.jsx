import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import '../styles/PokemonCard.scss'

function PokemonCard({ pokemon, isFavorite, isSelected }) {
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
  }, [pokemon.url]);

  const getTypeColor = (type) => {
    const colors = {
      fire: 'from-red-500 to-orange-500',
      water: 'from-blue-500 to-blue-400',
      grass: 'from-green-500 to-emerald-400',
      electric: 'from-yellow-400 to-amber-300',
      ice: 'from-cyan-400 to-blue-300',
      fighting: 'from-red-600 to-rose-500',
      poison: 'from-purple-500 to-fuchsia-400',
      ground: 'from-yellow-600 to-amber-500',
      flying: 'from-indigo-400 to-violet-300',
      psychic: 'from-pink-500 to-rose-400',
      bug: 'from-lime-500 to-green-400',
      rock: 'from-yellow-700 to-amber-600',
      ghost: 'from-purple-600 to-indigo-500',
      dragon: 'from-indigo-600 to-blue-500',
      dark: 'from-gray-700 to-gray-600',
      steel: 'from-gray-400 to-slate-300',
      fairy: 'from-pink-400 to-rose-300'
    };
    return colors[type] || 'from-gray-500 to-gray-400';
  };

  const getPokemonDescription = (types, stats) => {
    const descriptions = {
      fire: 'A passionate and energetic Pokemon that brings warmth wherever it goes.',
      water: 'A graceful Pokemon that thrives in aquatic environments.',
      grass: 'A natural Pokemon that flourishes in harmony with nature.',
      electric: 'A dynamic Pokemon crackling with electric energy.',
      psychic: 'A mysterious Pokemon with extraordinary mental powers.',
      dragon: 'A legendary Pokemon of immense power and ancient wisdom.',
      ghost: 'A mysterious Pokemon that appears in abandoned places.',
      ice: 'A cool Pokemon that thrives in frozen environments.',
      ground: 'A sturdy Pokemon that lives deep within the earth.',
      fairy: 'A magical Pokemon with enchanting powers.',
      fighting: 'A disciplined Pokemon with exceptional combat skills.',
      poison: 'A toxic Pokemon that produces powerful venom.',
      rock: 'A tough Pokemon with rock-solid defense.',
      steel: 'A resilient Pokemon with metallic properties.',
      bug: 'An adaptable Pokemon that excels in forest environments.',
      dark: 'A cunning Pokemon that prefers the darkness.',
      flying: 'An agile Pokemon that rules the skies.'
    };
    return descriptions[types[0].type.name] || 'A fascinating Pokemon with unique abilities.';
  };

  const getPokemonBehavior = (types) => {
    const behaviors = {
      fire: 'Often seen practicing its fire-breathing techniques.',
      water: 'Enjoys swimming and playing in water bodies.',
      grass: 'Spends time absorbing sunlight and nurturing plants.',
      electric: 'Gets energized during thunderstorms.',
      psychic: 'Meditates to enhance its mental abilities.',
      dragon: 'Prefers solitude and high altitudes.',
      ghost: 'Appears mostly at night and in dark places.',
      ice: 'Creates beautiful ice crystals while moving.',
      ground: 'Burrows underground to rest and hide.',
      fairy: 'Dances in moonlight to gather energy.',
      fighting: 'Trains constantly to improve its strength.',
      poison: 'Secretes toxins to mark its territory.',
      rock: 'Camouflages itself among boulders.',
      steel: 'Polishes its body to maintain its shine.',
      bug: 'Works together with others of its kind.',
      dark: 'Hunts more effectively at night.',
      flying: 'Soars through the sky searching for food.'
    };
    return behaviors[types[0].type.name] || 'Shows interesting patterns of behavior in the wild.';
  };

  if (loading) return <div className="pokemon-card loading">Loading...</div>;
  if (!details) return <div className="pokemon-card error">Error loading Pokemon</div>;

  const mainType = details.types[0].type.name;
  const gradientClass = getTypeColor(mainType);

  return (
    <motion.div
      className={`pokemon-card relative overflow-hidden ${isSelected ? 'ring-2 ring-yellow-400' : ''}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      style={{
        borderRadius: '15px',
      }}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-10`}></div>

      <div className="relative p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <span className="text-xl font-bold text-gray-300">
            #{String(details.id).padStart(4, '0')}
          </span>
          {isFavorite && (
            <span className="text-yellow-500 text-2xl">★</span>
          )}
        </div>

        {/* Main Content */}
        <div className="text-center">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <img 
              src={details.sprites.front_default}
              alt={details.name}
              className="w-full h-full object-contain transform hover:scale-110 transition-transform"
            />
          </div>

          <h3 className="text-2xl font-bold capitalize mb-3 text-white">
            {details.name}
          </h3>

          {/* Types */}
          <div className="flex gap-2 justify-center mb-4">
            {details.types.map((type) => (
              <span
                key={type.type.name}
                className={`px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r ${getTypeColor(type.type.name)}`}
              >
                {type.type.name}
              </span>
            ))}
          </div>

          {/* Description and Info Sections */}
          <div className="bg-black bg-opacity-20 rounded-lg p-4 mb-4">
            <p className="text-gray-200 text-sm mb-3 border-l-4 border-blue-500 pl-3">
              {getPokemonDescription(details.types, details.stats)}
            </p>
            <p className="text-gray-300 text-sm italic border-l-4 border-purple-500 pl-3">
              {getPokemonBehavior(details.types)}
            </p>
          </div>

          {/* Additional Info with Colors */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 p-3 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold text-green-400 mb-1">Habitat</h4>
              <p className="text-white">
                {details.types[0].type.name === 'water' ? 
                  <span className="text-blue-300">Lakes and Rivers</span> :
                 details.types[0].type.name === 'fire' ? 
                  <span className="text-red-300">Volcanic Areas</span> :
                 details.types[0].type.name === 'grass' ? 
                  <span className="text-green-300">Dense Forests</span> :
                 details.types[0].type.name === 'electric' ? 
                  <span className="text-yellow-300">Power Plants</span> :
                 details.types[0].type.name === 'psychic' ? 
                  <span className="text-pink-300">Urban Areas</span> :
                 details.types[0].type.name === 'ice' ? 
                  <span className="text-cyan-300">Snowy Mountains</span> :
                 details.types[0].type.name === 'dragon' ? 
                  <span className="text-purple-300">Ancient Ruins</span> :
                 details.types[0].type.name === 'ghost' ? 
                  <span className="text-indigo-300">Haunted Places</span> :
                 details.types[0].type.name === 'ground' ? 
                  <span className="text-amber-300">Deep Caves</span> :
                 details.types[0].type.name === 'fairy' ? 
                  <span className="text-pink-200">Enchanted Forests</span> :
                 <span className="text-gray-300">Various Regions</span>
                }
              </p>
            </div>
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-3 rounded-lg backdrop-blur-sm">
              <h4 className="font-semibold text-purple-400 mb-1">Characteristics</h4>
              <p className="text-white">
                <span className="text-purple-300">Size:</span> {(details.height / 10).toFixed(1)}m
                <br />
                <span className="text-pink-300">Weight:</span> {(details.weight / 10).toFixed(1)}kg
              </p>
            </div>
            {/* Nature Info */}
            <div className="bg-gradient-to-br from-orange-600/20 to-yellow-600/20 p-3 rounded-lg backdrop-blur-sm col-span-2">
              <h4 className="font-semibold text-orange-400 mb-1">Nature & Behavior</h4>
              <div className="grid grid-cols-2 gap-2 text-white">
                <div>
                  <span className="text-yellow-300">Nature:</span> {' '}
                  <span className={`
                    ${details.stats[1].base_stat > details.stats[2].base_stat ? 'text-red-300' :
                      details.stats[2].base_stat > details.stats[1].base_stat ? 'text-blue-300' :
                      'text-green-300'}
                  `}>
                    {details.stats[1].base_stat > details.stats[2].base_stat ? 'Aggressive' :
                     details.stats[2].base_stat > details.stats[1].base_stat ? 'Defensive' :
                     'Balanced'}
                  </span>
                </div>
                <div>
                  <span className="text-amber-300">Category:</span> {' '}
                  <span className="text-white">{details.types[0].type.name.charAt(0).toUpperCase() + details.types[0].type.name.slice(1)} Type</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default PokemonCard;