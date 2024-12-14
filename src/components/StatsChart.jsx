import { ResponsiveBar } from '@nivo/bar';

function StatsChart({ stats }) {
  const data = stats.map(stat => ({
    stat: stat.stat.name,
    value: stat.base_stat
  }));

  return (
    <div className="stats-chart">
      <ResponsiveBar
        data={data}
        keys={['value']}
        indexBy="stat"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: 'nivo' }}
        borderColor={{ theme: 'background' }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0
        }}
      />
    </div>
  );
}