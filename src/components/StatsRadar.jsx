import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import '../styles/StatsRadar.scss';

function StatsRadar({ stats }) {
  const data = stats.map(stat => ({
    subject: stat.stat.name === 'special-attack' ? 'Sp.Atk' :
             stat.stat.name === 'special-defense' ? 'Sp.Def' :
             stat.stat.name.charAt(0).toUpperCase() + stat.stat.name.slice(1),
    value: stat.base_stat
  }));

  return (
    <div className="stats-radar">
      <ResponsiveContainer width="100%" height={300}>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="#ffffff44" />
          <PolarAngleAxis dataKey="subject" stroke="#fff" />
          <PolarRadiusAxis stroke="#ffffff44" />
          <Radar
            name="Stats"
            dataKey="value"
            stroke="#FFD700"
            fill="#FFD700"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default StatsRadar;