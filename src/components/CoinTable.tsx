import { useEffect, useState, FC } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatNum } from '../helper/formatNum';
import { useSortableData } from '../hooks/useSortTableData';
import { ICoin } from '../interfaces/coin.interface';

interface ICoinTable {
  coins: ICoin[];
}

const CoinTable = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [limit, setLimit] = useState(20);
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
  }, [limit]);
  const { items, requestSort } = useSortableData(coins);
  return (
    <div>
      <div className='container'>
        <table className='mainTable'>
          <thead>
            <tr>
              <th>
                <button
                  type='button'
                  onClick={() => requestSort('rank')}
                  className='btnThSort'
                >
                  #
                </button>
              </th>
              <th>
                <button
                  type='button'
                  onClick={() => requestSort('name')}
                  className='btnThSort'
                >
                  Name
                </button>
              </th>
              <th>
                <button
                  type='button'
                  onClick={() => requestSort('priceUsd')}
                  className='btnThSort'
                >
                  Price
                </button>
              </th>
              <th>
                <button
                  type='button'
                  onClick={() => requestSort('marketCapUsd')}
                  className='btnThSort'
                >
                  Market Cap
                </button>
              </th>
              <th>
                <button
                  type='button'
                  onClick={() => requestSort('changePercent24Hr')}
                  className='btnThSort'
                >
                  Change(24h)
                </button>
              </th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {items.map(
              ({
                id,
                rank,
                name,
                symbol,
                priceUsd,
                marketCapUsd,
                changePercent24Hr,
              }) => (
                <tr key={id}>
                  <td>{rank}</td>
                  <td>
                    <div className='coinNameContainer'>
                      <img
                        className='coinLogo'
                        src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                      ></img>
                      <div className='coinName'>{name}</div>
                      <div className='coinSymbol'>{symbol}</div>
                    </div>
                  </td>
                  <td>{formatNum(priceUsd)}</td>
                  <td>{formatNum(marketCapUsd)}</td>
                  <td
                    style={{
                      color: changePercent24Hr > 0 ? '#16c784' : '#ea3943',
                    }}
                  >
                    {Number(changePercent24Hr).toFixed(2) + '%'}
                  </td>
                  <td>
                    <FontAwesomeIcon icon={faPlus} />
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      <button
        type='button'
        className='btnViewMore'
        onClick={() => setLimit(limit + 20)}
      >
        View more
      </button>
    </div>
  );
};

export default CoinTable;
