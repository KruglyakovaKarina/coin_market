import React, { useEffect, useState } from 'react';
import PortfolioModal from './PortfolioModal';
import { ICoin } from '../interfaces/coin.interface';
import { formatNum } from '../helper/formatNum';

const Header = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchCoins = async () => {
    const res = await fetch(`https://api.coincap.io/v2/assets`);
    const data = await res.json();
    setCoins([...coins, ...data.data]);
  };

  useEffect(() => {
    fetchCoins();
  }, []);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [portfolioPrice, setPortfolioPrice] = useState(
    JSON.parse(localStorage.getItem('totalPricePortfolio') ?? '0')
  );

  return (
    <div className='headerContainer'>
      <div className='header'>
        <div className='headerPopularCoins'>
          {coins.slice(0, 3).map(({ name, priceUsd }) => (
            <div className='headerCoins'>
              <div className='headerNames'>{name}:</div>
              <div className='headerPrices'>{formatNum(priceUsd) ?? ''}</div>
            </div>
          ))}
        </div>
        <div className='portfolio'>
          <button className='portfolioPrice' onClick={openModal}>
            <div className='headerCoins'>
              <div className='headerNames'>Portfolio:</div>
              <div className='headerPrices'>{formatNum(portfolioPrice)}</div>
            </div>
          </button>

          <PortfolioModal
            coins={coins}
            portfolioPrice={portfolioPrice}
            closeModal={closeModal}
            modalIsOpen={modalIsOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
