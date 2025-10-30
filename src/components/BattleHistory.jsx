import React, { useState } from 'react';

function BattleHistory() {
    const [battles, setBattles] = useState(() => {
      const saved = localStorage.getItem('battleHistory');
      return saved ? JSON.parse(saved) : [];
    });
   
    const addBattle = (battle) => {
      const newBattles = [...battles, battle];
      setBattles(newBattles);
      localStorage.setItem('battleHistory', JSON.stringify(newBattles));
    };
   
    return (
      <div className="battle-history">
        <h3>Battle History</h3>
        <div className="battles-list">
          {battles.map((battle, index) => (
            <div 
              key={`${battle?.date || 'battle'}-${battle?.winner?.name || 'unknown'}-${battle?.loser?.name || 'unknown'}-${index}`}
              className="battle-record"
            >
              <div className="battle-participants">
                <span>{battle.winner.name} vs {battle.loser.name}</span>
              </div>
              <div className="battle-date">
                {new Date(battle.date).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
   }
export default BattleHistory;