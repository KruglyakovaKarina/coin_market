import React, { useEffect, useState, FC } from 'react';
import { IPortfolio } from '../interfaces/portfolio.interface';
import ReactModal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCaretDown,
  faCaretUp,
  faClose,
} from '@fortawesome/free-solid-svg-icons';
import { formatNum } from '../helper/formatNum';
import { ICoin } from '../interfaces/coin.interface';

const PortfolioModal: FC<{
  closeModal: any;
  modalIsOpen: any;
  coins: ICoin[];
  portfolioPrice: number;
}> = ({ closeModal, modalIsOpen, coins, portfolioPrice }) => {
  const [portfolio, setPortfolio] = useState<IPortfolio>(
    JSON.parse(localStorage.getItem('my_portfolio') ?? '{}')
  );
  const [currentCoins, setCurrentCoins] = useState<{ [key: string]: ICoin }>(
    {}
  );
  useEffect(() => {
    setCurrentCoins({});
    coins.forEach((coin) => {
      setCurrentCoins((prevState) => {
        return { ...prevState, [coin.id]: coin };
      });
    });
  }, [coins]);
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
        },
        content: {
          width: '1024px',
          height: '800px',
          position: 'static',
          display: 'flex',
          margin: '100px auto',
          borderRadius: '10px',
          padding: '0 20px 10px 20px',
          overflow: 'auto',
        },
      }}
    >
      {portfolioPrice ? (
        <div className='modalPortfolioContainer'>
          <table className='mainTable'>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Price</th>
                <th>Change(24h)</th>
                <th>Buy Price</th>
                <th>Buy Quantity</th>
                <th>Total Price</th>
                <th>Profit/Loss</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(portfolio).map(([key, value]: any) => (
                <tr key={key}>
                  <td>{value.rank}</td>
                  <td>
                    <div className='coinNameContainer'>
                      <img
                        className='coinLogo'
                        src={`https://assets.coincap.io/assets/icons/${value.symbol.toLowerCase()}@2x.png`}
                      />
                      <p className='coinName'>{value.name}</p>
                      <p className='coinSymbol'>{value.symbol}</p>
                    </div>
                  </td>
                  <td>{formatNum(currentCoins[value.id]?.priceUsd) ?? ''}</td>
                  <td
                    style={{
                      color:
                        value.changePercent24Hr > 0 ? '#16c784' : '#ea3943',
                    }}
                  >
                    {value.changePercent24Hr > 0 ? (
                      <FontAwesomeIcon icon={faCaretUp} />
                    ) : (
                      <FontAwesomeIcon icon={faCaretDown} />
                    )}
                    <span>
                      {Number(value.changePercent24Hr).toFixed(2) + '%'}
                    </span>
                  </td>
                  <td>{formatNum(value.coinPrice)}</td>
                  <td>{value.numOfCoin}</td>
                  <td>{formatNum(value.coinPrice * value.numOfCoin)}</td>
                  <td>
                    {formatNum(
                      currentCoins[value.id]?.priceUsd - value.coinPrice
                    )}
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='emptyPortfolio'>
          <div className='emptyPortfolioBtnCont'>
            <div></div>
            <button onClick={closeModal}>
              <FontAwesomeIcon icon={faClose} />
            </button>
          </div>
          <div className='emptyPortfolioTexts'>
            <img src='https://s2.coinmarketcap.com/static/cloud/img/portfolio/no-portfolio.png?_=1f9e116'></img>
            <h1>Let’s get started with your first portfolio!</h1>
            <h4>Track profits, losses and valuation all in one place.</h4>
          </div>
        </div>
      )}
    </ReactModal>
  );
};

export default PortfolioModal;
