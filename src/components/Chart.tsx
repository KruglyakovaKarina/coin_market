import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { useParams } from 'react-router-dom';
import { IPrice } from '../interfaces/price.interface';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = () => {
  const { id = '' } = useParams();
  const [prices, setPrices] = useState<IPrice[]>([]);
  const interval = 'm5';
  const endTime = Date.now();
  const [startTime, setStartTime] = useState<number>(endTime - 86400000);

  const fetchPrice = async (coinId: string) => {
    const res = await fetch(
      `https://api.coincap.io/v2/assets/${coinId}/history?interval=${interval}&start=${startTime}&end=${endTime}`
    ).then((res) => res.json());

    setPrices(res.data);
  };

  const getValues = (data: IPrice[]) => {
    return data.map((val) => val.priceUsd);
  };

  const getLabels = (data: IPrice[]) => {
    return data.map((val) => moment(val.date).format(' h:mm:ss a'));
  };

  const chart = {
    labels: getLabels(prices),

    datasets: [
      {
        label: id,
        data: getValues(prices),
      },
    ],
  };

  useEffect(() => {
    fetchPrice(id);
  }, [interval]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    pointStyle: false,
  };

  return (
    <div className='coinChart'>
      <div>
        <button type='button' onClick={() => setInterval('d1')}>
          1D
        </button>
        <button type='button'>7D</button>
        <button type='button'>1M</button>
      </div>
      <Line options={options} data={chart} />
    </div>
  );
};

export default Chart;
