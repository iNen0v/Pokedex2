import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles/BattleArena.scss";

import HPBar from "../components/HPBar";
import BattleControls from "../components/BattleControls";
import ArenaCard from "../components/ArenaCard";
import BattleLog from "../components/BattleLog";

const BattleArena = () => {
  const { pokemon1Id, pokemon2Id } = useParams();
  const navigate = useNavigate();
  const pokemons = useSelector((state) => state.pokemons.data);

  const [pokemon1, setPokemon1] = useState(null);
  const [pokemon2, setPokemon2] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [battleLog, setBattleLog] = useState([]);
  const [battleEnded, setBattleEnded] = useState(false);
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    const p1 = pokemons.find((p) => p.id === parseInt(pokemon1Id));
    const p2 = pokemons.find((p) => p.id === parseInt(pokemon2Id));
    
    if (p1 && p2) {
      setPokemon1({...p1, currentHP: p1.stats[0].base_stat});
      setPokemon2({...p2, currentHP: p2.stats[0].base_stat});
    } else {
      navigate("/battle");
    }
  }, [pokemons, pokemon1Id, pokemon2Id, navigate]);

  const calculateDamage = (attacker, defender) => {
    const attack = attacker.stats[1].base_stat;
    const defense = defender.stats[2].base_stat;
    const baseDamage = Math.floor((attack / defense) * 20);
    const randomFactor = Math.random() * (1.2 - 0.8) + 0.8;
    return Math.floor(baseDamage * randomFactor);
  };

  const handleAttack = (move) => {
    if (battleEnded) return;

    const [attacker, defender] = currentTurn === 1 ? [pokemon1, pokemon2] : [pokemon2, pokemon1];
    
    const attackerImage = document.querySelector(
      `.pokemon-${currentTurn === 1 ? 'one' : 'two'} .battle-arena__pokemon-card-image`
    );
    const defenderImage = document.querySelector(
      `.pokemon-${currentTurn === 1 ? 'two' : 'one'} .battle-arena__pokemon-card-image`
    );
    const flashElement = document.querySelector('.battle-particles__attack-flash');

    if (attackerImage && defenderImage && flashElement) {
      attackerImage.classList.add('battle-arena__pokemon-card-image--attacking');
      defenderImage.classList.add('battle-arena__pokemon-card-image--defending');

      const attackType = attacker.types[0].type.name;
      attackerImage.classList.add(`battle-arena__pokemon-card-image--${attackType}-attack`);

      flashElement.classList.add('battle-particles__attack-flash--active');

      setTimeout(() => {
        attackerImage.classList.remove('battle-arena__pokemon-card-image--attacking');
        attackerImage.classList.remove(`battle-arena__pokemon-card-image--${attackType}-attack`);
        defenderImage.classList.remove('battle-arena__pokemon-card-image--defending');
        flashElement.classList.remove('battle-particles__attack-flash--active');
      }, 1000);
    }

    const damage = calculateDamage(attacker, defender);
    const newDefenderHP = Math.max(0, defender.currentHP - damage);
    const newLog = `${attacker.name} used ${move.move.name} and dealt ${damage} damage!`;

    if (currentTurn === 1) {
      setPokemon2(prev => ({...prev, currentHP: newDefenderHP}));
    } else {
      setPokemon1(prev => ({...prev, currentHP: newDefenderHP}));
    }

    setBattleLog(prev => [...prev, newLog]);

    if (newDefenderHP === 0) {
      setWinner(attacker);
      setBattleLog(prev => [...prev, `${defender.name} fainted! ${attacker.name} wins the battle!`]);
      setBattleEnded(true);
    } else {
      setCurrentTurn(currentTurn === 1 ? 2 : 1);
    }
  };

  if (!pokemon1 || !pokemon2) {
    return null;
  }

  return (
    <div className="battle-arena">
      <div className="battle-particles">
        <div className="battle-particles__vs-sparkles">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="sparkle" />
          ))}
        </div>
        
        <div className="battle-particles__background">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>
        
        <div className="battle-particles__attack-flash" />
      </div>

      <div className="battle-arena__container">
        <div className="battle-arena__header">
          <button 
            onClick={() => navigate("/battle")} 
            className="battle-arena__back-button"
          >
            ← Back
          </button>
          <h1 className="battle-arena__title">Pokemon Battle!</h1>
        </div>
  
        <div className="battle-arena__battle-container">
          <div className={`pokemon-one ${currentTurn === 1 ? 'current-turn' : ''}`}>
            <div className="turn-indicator">
              {currentTurn === 1 && (
                <div className="turn-indicator__arrow">
                  Your Turn
                </div>
              )}
            </div>
            <ArenaCard 
              pokemon={pokemon1} 
              isActive={currentTurn === 1}
            />
          </div>
  
          <div className="battle-arena__vs">
            <div className="battle-arena__vs-text">VS</div>
            <div className="battle-arena__turn-display">
              {currentTurn === 1 ? pokemon1.name : pokemon2.name}'s turn
            </div>
          </div>
  
          <div className={`pokemon-two ${currentTurn === 2 ? 'current-turn' : ''}`}>
            <div className="turn-indicator">
              {currentTurn === 2 && (
                <div className="turn-indicator__arrow">
                  Your Turn
                </div>
              )}
            </div>
            <ArenaCard 
              pokemon={pokemon2} 
              isActive={currentTurn === 2}
            />
          </div>
        </div>

        <BattleControls
          pokemon={currentTurn === 1 ? pokemon1 : pokemon2}
          onAttack={handleAttack}
          disabled={battleEnded}
        />
  
        <BattleLog logs={battleLog} />
  
        {battleEnded && (
          <div className="battle-arena__end-screen">
            <h2 className="battle-arena__end-screen-title">
              {winner.name} wins the battle!
            </h2>
            <div className="battle-arena__actions">
              <button
                onClick={() => navigate("/battle")}
                className="battle-arena__action-button battle-arena__action-button--new"
              >
                New Battle
              </button>
              <button
                onClick={() => window.location.reload()}
                className="battle-arena__action-button battle-arena__action-button--rematch"
              >
                Rematch
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BattleArena;