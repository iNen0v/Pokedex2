// components/Battle.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SpecialAttacks from "./SpecialAttacks";

function Battle({ pokemon1, pokemon2, onClose }) {
 const [p1Health, setP1Health] = useState(100);
 const [p2Health, setP2Health] = useState(100);
 const [currentTurn, setCurrentTurn] = useState(1);
 const [battleLog, setBattleLog] = useState([]);
 const [winner, setWinner] = useState(null);

 const calculateDamage = (attacker, defender, move) => {
   const attack = attacker.stats.find(s => s.stat.name === "attack").base_stat;
   const defense = defender.stats.find(s => s.stat.name === "defense").base_stat;
   const baseDamage = (attack / defense) * (move.power || 50) * 0.5;
   return Math.floor(baseDamage);
 };

 const executeAttack = (attacker, defender, setDefenderHealth, attack) => {
   const damage = calculateDamage(attacker, defender, attack);

   setDefenderHealth(prev => {
     const newHealth = Math.max(0, prev - damage);
     if (newHealth === 0) {
       setWinner(attacker.name);
     }
     return newHealth;
   });

   setBattleLog(prev => [
     ...prev,
     `${attacker.name} used ${attack.name || 'attack'} and dealt ${damage} damage!`
   ]);
   
   setCurrentTurn(prev => prev === 1 ? 2 : 1);
 };

 useEffect(() => {
   if (p1Health <= 0) {
     setWinner(pokemon2.name);
   } else if (p2Health <= 0) {
     setWinner(pokemon1.name);
   }
 }, [p1Health, p2Health, pokemon1.name, pokemon2.name]);

 return (
   <motion.div 
     className="battle-arena"
     initial={{ opacity: 0 }}
     animate={{ opacity: 1 }}
   >
     <button className="close-battle" onClick={onClose}>×</button>

     <div className="pokemon-battle">
       <motion.div 
         className="pokemon-fighter"
         animate={{ x: currentTurn === 1 ? 20 : 0 }}
       >
         <h3>{pokemon1.name}</h3>
         <img src={pokemon1.sprites.front_default} alt={pokemon1.name} />
         <div className="health-bar">
           <motion.div 
             className="health-fill"
             animate={{ width: `${p1Health}%` }}
           />
           <span className="health-text">{Math.ceil(p1Health)}%</span>
         </div>
         {currentTurn === 1 && !winner && (
           <div className="battle-controls">
             <button 
               className="attack-btn"
               onClick={() => executeAttack(pokemon1, pokemon2, setP2Health, { power: 50 })}
             >
               Basic Attack
             </button>
             <SpecialAttacks
               type={pokemon1.types[0].type.name}
               onAttack={(attack) => executeAttack(pokemon1, pokemon2, setP2Health, attack)}
             />
           </div>
         )}
       </motion.div>

       <div className="vs">VS</div>

       <motion.div 
         className="pokemon-fighter"
         animate={{ x: currentTurn === 2 ? -20 : 0 }}
       >
         <h3>{pokemon2.name}</h3>
         <img src={pokemon2.sprites.front_default} alt={pokemon2.name} />
         <div className="health-bar">
           <motion.div 
             className="health-fill"
             animate={{ width: `${p2Health}%` }}
           />
           <span className="health-text">{Math.ceil(p2Health)}%</span>
         </div>
         {currentTurn === 2 && !winner && (
           <div className="battle-controls">
             <button 
               className="attack-btn"
               onClick={() => executeAttack(pokemon2, pokemon1, setP1Health, { power: 50 })}
             >
               Basic Attack
             </button>
             <SpecialAttacks
               type={pokemon2.types[0].type.name}
               onAttack={(attack) => executeAttack(pokemon2, pokemon1, setP1Health, attack)}
             />
           </div>
         )}
       </motion.div>
     </div>

     {winner && (
       <motion.div
         className="winner-announcement"
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
       >
         {winner} wins the battle!
       </motion.div>
     )}

     <div className="battle-log">
       {battleLog.map((log, index) => (
         <motion.div
           key={index}
           initial={{ opacity: 0, x: -20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: index * 0.1 }}
         >
           {log}
         </motion.div>
       ))}
     </div>
   </motion.div>
 );
}

export default Battle;