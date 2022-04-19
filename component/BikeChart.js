import React from 'react'
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Radar } from 'react-chartjs-2';

  ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
  );
  

  export const data = {
    labels: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일','일요일'],
    datasets: [
      {
        label: '# of Votes',
        data: [1,7, 5, 8, 6, 2,9],
        backgroundColor: 'rgba(0, 99, 132, 0.2)',
        borderColor: 'rgba(0, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };


function BikeChart() {
  return (
    <div><div><Radar data={data}  /></div></div>
  )
}

export default BikeChart