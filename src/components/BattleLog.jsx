import React, { useEffect, useRef } from 'react';
import '../styles/BattleLog.scss';

const BattleLog = ({ logs }) => {
  const logContainerRef = useRef(null);

 
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const getMessageType = (log) => {
    if (log.includes('wins the battle')) return 'victory';
    if (log.includes('fainted')) return 'faint';
    if (log.includes('used') && log.includes('dealt')) return 'attack';
    if (log.includes('missed') || log.includes('failed')) return 'miss';
    if (log.includes('effective')) return 'effective';
    return 'default';
  };

  return (
    <div className="battle-log">
      <h3 className="battle-log__title">Battle Log</h3>
      <div 
        ref={logContainerRef} 
        className="battle-log__container"
      >
        {logs.map((log, index) => (
          <div
            key={index}
            className={`battle-log__entry battle-log__entry--${getMessageType(log)}`}
          >
            {log}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BattleLog;