import { PlotType } from 'plotly.js';
import React from 'react';
import Plot from 'react-plotly.js';

interface BarChartProps {
  xLabels: string[];
  yValues: number[];
  charType?: PlotType;
  width?: number;
  height?: number;
}

const CustomChart: React.FC<BarChartProps> = ({ xLabels, yValues, charType = 'bar', width = 600, height = 400 }) => {

  if (charType === 'pie') {
    return (
      <Plot
        data={[{
          type: 'pie',
          values: yValues,
          labels: xLabels,
          hoverinfo: 'label+percent+name',
        }]}
        layout={{ width, height, title: 'Covid Report' }}
      />
    );
  }

  return (
    <Plot
      data={[
        {
          x: xLabels,
          y: yValues,
          type: 'bar',
          marker: { color: 'blue' },
        }
      ]}
      layout={{ width, height, title: 'Covid Report', showlegend: true }}
    />
  );
};

export default CustomChart;
