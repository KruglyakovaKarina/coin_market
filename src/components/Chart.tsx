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
  const [interval, setInterval] = useState<string>('m5');
  const endTime = moment.now();
  const [startTime, setStartTime] = useState<number>(endTime - 86400000);

  const fetchPrice = async (coinId: string) => {
    const res = await fetch(
      `https://api.coincap.io/v2/assets/${coinId}/history?interval=${interval}&start=${startTime}&end=${endTime}`
    ).then((res) => res.json());

    setPrices(res.data);
  };

  const getValues = (data: IPrice[]) => {
    return data ? data.map((val) => val.priceUsd) : [];
  };

  const getLabels = (data: IPrice[]) => {
    let labels: string[] = [];
    data.forEach((value) => {
      if (interval === 'm5') {
        labels.push(moment(value.date).format('HH:mm'));
      } else {
        labels.push(moment(value.date).format('MMM DD'));
      }
    });

    return labels;
  };

  const chart = {
    labels: getLabels(prices),
    datasets: [
      {
        label: id,
        data: getValues(prices),
        borderColor: '#3861fb',
      },
    ],
  };

  useEffect(() => {
    fetchPrice(id);
  }, [startTime]);

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
      <div className='btnsOptionTimeContainer'>
        <div className='btnsOptionTime'>
          <button
            type='button'
            onClick={() => {
              setStartTime(endTime - 86400000);
              setInterval('m5');
            }}
          >
            1D
          </button>
          <button
            type='button'
            onClick={() => {
              setStartTime(endTime - 604800000);
              setInterval('h1');
            }}
          >
            7D
          </button>
          <button
            type='button'
            onClick={() => {
              setStartTime(endTime - 2678400000);
              setInterval('h6');
            }}
          >
            1M
          </button>
        </div>
      </div>
      <Line options={options} data={chart} />
    </div>
  );
};

export default Chart;
