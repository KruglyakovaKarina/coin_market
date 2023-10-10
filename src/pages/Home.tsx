import React, { useEffect, useState } from 'react';
import { ICoin } from '../interfaces/coin.interface';
import CoinTable from '../components/CoinTable';

const limit = 50;

const Home = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);

  useEffect(() => {
    const fetchCoins = async () => {
      const res = await fetch(
        `https://api.coincap.io/v2/assets?limit=${limit}`
      );
      const data = await res.json();
      console.log(data.data);
      setCoins(data.data);
    };

    fetchCoins();
  }, []);
  return (
    <div>
      <CoinTable coins={coins} />
    </div>
  );
};

export default Home;
