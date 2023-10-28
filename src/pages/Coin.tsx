import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICoin } from '../interfaces/coin.interface';
import { formatNum } from '../helper/formatNum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../components/Spinner';
import Chart from '../components/Chart';
import Modal from '../components/Modal';
import Header from '../components/Header';

const Coin = () => {
  const { id = '' } = useParams();
  const [coin, setCoin] = useState<ICoin | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchCoin = async (coinId: string) => {
    const res = await fetch(`https://api.coincap.io/v2/assets/${coinId}`).then(
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
  }, [id]);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <Header />
      <div className='coinContainer'>
        <div className='coin'>
          {coin ? (
            <div>
              <div className='coinNamesAndRank'>
                <div className='coinInfo'>
                  <img
                    className='coinInfoLogo'
                    src={`https://assets.coincap.io/assets/icons/${coin.symbol.toLowerCase()}@2x.png`}
                  />
                  <div className='coinInfoNames'>
                    <p className='coinInfoName'>{coin.name}</p>
                    <div className='coinInfoSymbol'>
                      <p>{coin.symbol}</p>
                    </div>
                  </div>
                </div>
                <div className='coinRank'>
                  <p>#{coin.rank}</p>
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
              <div className='coinGraph'>
                <Chart />
              </div>
              <div className='coinStatisticsContainer'>
                <p className='coinStatisticsTitle'>{coin.name} statistics</p>
                <div className='coinStatistics'>
                  <div className='coinStatisticsName'>
                    <p>Market cap</p>
                    <p>Total supply</p>
                    <p>Max. supply</p>
                  </div>
                  <div className='coinStatisticsValue'>
                    <p>{Number(coin.marketCapUsd).toFixed(0)}$</p>
                    <p>{Number(coin.supply).toFixed(0) + ' ' + coin.symbol}</p>
                    <p>
                      {coin.maxSupply
                        ? Number(coin.maxSupply).toFixed(0) + ' ' + coin.symbol
                        : '∞'}
                    </p>
                  </div>
                </div>
                <button className='btnAdd' onClick={openModal}>
                  Add to portfolio
                </button>
              </div>
              <Modal
                coin={coin}
                closeModal={closeModal}
                modalIsOpen={modalIsOpen}
              />
            </div>
          ) : (
            <Spinner />
          )}
        </div>
      </div>
    </div>
  );
};

export default Coin;
