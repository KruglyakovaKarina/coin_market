import React, { useState, FC, useEffect } from 'react';
import ReactModal from 'react-modal';
import moment from 'moment';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ICoin } from '../interfaces/coin.interface';

const Modal: FC<{
  coin: ICoin;
  closeModal: any;
  modalIsOpen: any;
}> = ({ coin, closeModal, modalIsOpen }) => {
  const [numOfCoin, setNumOfCoin] = useState(0);
  const [coinPrice, setCoinPrice] = useState(0);

  const addTransactionHandler = () => {
    const previousPortfolio = localStorage.getItem(`my_portfolio`) ?? '{}';
    if (previousPortfolio) localStorage.removeItem(`my_portfolio`);
    const portfolio = JSON.parse(previousPortfolio);
    portfolio[`${coin.id}`] = { ...coin, numOfCoin, coinPrice };
    localStorage.setItem(`my_portfolio`, JSON.stringify(portfolio));
    closeModal();
  };

  useEffect(() => {
    const localStoragePortfolio = localStorage.getItem(`my_portfolio`);
    if (localStoragePortfolio) {
      const portfolio = JSON.parse(localStoragePortfolio);
      const { numOfCoin: num } = portfolio[`${coin.id}`] ?? '{}';
      setCoinPrice(coin.priceUsd);
      setNumOfCoin(num | 0);
    }
  }, []);

  return (
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
              min={0}
              defaultValue={numOfCoin}
              type='number'
              onChange={(e) => setNumOfCoin(Number(e.target.value))}
            ></input>
          </div>
          <div className='modalQuantity'>
            <h4>Price Per Coin</h4>
            <input
              min={0}
              value={Number(coin.priceUsd).toFixed(2)}
              type='number'
            ></input>
          </div>
        </div>
        <div className='modalDate'>
          <span>{moment(moment.now()).format('MMMM D, YYYY, h:mm A')}</span>
        </div>
        <div className='modalTotalPrice'>
          <span>Total Spent</span>
          <h2>$ {(numOfCoin * coinPrice).toFixed(2)}</h2>
        </div>
        <button
          type='submit'
          className='btnAddPortf'
          onClick={addTransactionHandler}
        >
          Add transaction
        </button>
      </div>
    </ReactModal>
  );
};

export default Modal;
