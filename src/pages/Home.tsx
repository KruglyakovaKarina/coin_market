import React from 'react';
import CoinTable from '../components/CoinTable';
import Header from '../components/Header';
import Search from '../components/Search';

const Home = () => {
  return (
    <div>
      <Header />
      <Search />
      <CoinTable />
    </div>
  );
};

export default Home;
