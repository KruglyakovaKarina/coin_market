import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ICoin } from '../interfaces/coin.interface';
import { formatNum } from '../helper/formatNum';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import Spinner from '../components/Spinner';
import Chart from '../components/Chart';
import ReactModal from 'react-modal';
import moment from 'moment';

const Coin = () => {
  const { id = '' } = useParams();
  const [coin, setCoin] = useState<ICoin | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [numOfCoin, setNumOfCoin] = useState(0);

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
            <ReactModal
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.7)',
                },
                content: {
                  width: '400px',
                  height: '400px',
                  overflow: 'none',
                  position: 'static',
                  display: 'flex',
                  margin: '200px auto',
                  borderRadius: '10px',
                },
              }}
            >
              <div className='modalContainer'>
                <div className='modalTitle'>
                  <h2>Add transaction</h2>
                  <button onClick={closeModal}>
                    <FontAwesomeIcon icon={faClose} />
                  </button>
                </div>
                <div className='modalCoinInfo'>
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
                <div className='modalQuantityAndPrice'>
                  <div className='modalQuantity'>
                    <h4>Quantity</h4>
                    <input
                      placeholder='0.00'
                      min={0}
                      type='number'
                      onChange={(e) => setNumOfCoin(Number(e.target.value))}
                    ></input>
                  </div>
                  <div className='modalQuantity'>
                    <h4>Price Per Coin</h4>
                    <input
                      min={0}
                      defaultValue={Number(coin.priceUsd).toFixed(2)}
                      type='number'
                    ></input>
                  </div>
                </div>
                <div className='modalDate'>
                  <span>
                    {moment(moment.now()).format('MMMM D, YYYY, h:mm A')}
                  </span>
                </div>
                <div className='modalTotalPrice'>
                  <span>Total Spent</span>
                  <h2>$ {(numOfCoin * coin.priceUsd).toFixed(2)}</h2>
                </div>
                <button type='submit' className='btnAddPortf'>
                  Add transaction
                </button>
              </div>
            </ReactModal>
          </div>
        ) : (
          <Spinner />
        )}
      </div>
    </div>
  );
};

export default Coin;
