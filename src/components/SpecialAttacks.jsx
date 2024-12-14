import React from 'react';
import { motion } from 'framer-motion';

const typeAttacks = {
 fire: [
   { name: "Flamethrower", power: 90, type: "fire" },
   { name: "Fire Blast", power: 110, type: "fire" }
 ],
 water: [
   { name: "Hydro Pump", power: 110, type: "water" },
   { name: "Surf", power: 90, type: "water" }
 ],
 grass: [
   { name: "Solar Beam", power: 120, type: "grass"},
   { name: "Leaf Blade", power: 90, type: "grass"}
 ],
 electric: [
   { name: "Thunder", power: 110, type: "electric"},
   { name: "Thunderbolt", power: 90, type: "electric"}
 ]
};

function SpecialAttacks({ type, onAttack }) {
 return (
   <div className="special-attacks">
     {typeAttacks[type]?.map((attack, index) => (
       <motion.button
         key={attack.name}
         onClick={() => onAttack(attack)}
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ delay: index * 0.1 }}
         className={`attack-btn ${type}`}
       >
         {attack.name}
         <span className="power">Power: {attack.power}</span>
       </motion.button>
     ))}
   </div>
 );
}

export default SpecialAttacks;