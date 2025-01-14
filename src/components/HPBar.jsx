import React from 'react';
import '../styles/HPBar.scss';

const HPBar = ({ currentHP, maxHP }) => {
  const percentage = (currentHP / maxHP) * 100;
  const barColor = percentage > 50 ? 'green' : percentage > 20 ? 'yellow' : 'red';

  return (
    <div className="hp-bar-container">
      <div className="hp-bar" style={{ width: `${percentage}%`, backgroundColor: barColor }}></div>
      <div className="hp-text">{`${currentHP} / ${maxHP}`}</div>
    </div>
  );
};

export default HPBar;