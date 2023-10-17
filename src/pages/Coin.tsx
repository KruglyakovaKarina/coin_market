import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICoin } from '../interfaces/coin.interface';
import { formatNum } from '../helper/formatNum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../components/Spinner';

const Coin = () => {
  let { id = '' } = useParams();
  const [coin, setCoin] = useState<ICoin | null>(null);

  const fetchCoin = async (id: string) => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${id}`).then(
      (res) => res.json()
    );

    if (res.data) {
      setCoin(res.data);
    } else {
      setCoin(null);
    }
  };
  useEffect(() => {
    fetchCoin(id);
  }, []);

  return (
    <div className='container'>
      <div className='coinContainer'>
        {coin ? (
          <div>
            <div className='coinInfo'>
              <img
                className='coinInfoLogo'
                src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
              />
              <div className='coinInfoNames'>
                <span className='coinInfoName'>{coin.name}</span>
                <span className='coinInfoSymbol'>{coin.symbol}</span>
              </div>
            </div>
            <div className='coinPrices'>
              <span className='coinPricesPrice'>
                {formatNum(coin.priceUsd)}
              </span>
              <div
                className='coinPricesChange'
                style={{
                  color: coin.changePercent24Hr > 0 ? '#16c784' : '#ea3943',
                }}
              >
                {coin.changePercent24Hr > 0 ? (
                  <FontAwesomeIcon icon={faCaretUp} />
                ) : (
                  <FontAwesomeIcon icon={faCaretDown} />
                )}
                <span>
                  {Number(coin.changePercent24Hr).toFixed(2) + '% (1d)'}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <Spinner />
        )}
        <div className='coinGraph'></div>
        <div className='coinGraph'></div>
      </div>
    </div>
  );
};

export default Coin;
