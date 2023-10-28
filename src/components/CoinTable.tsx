import { useEffect, useState, FC } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatNum } from '../helper/formatNum';
import { useSortableData } from '../hooks/useSortTableData';
import { ICoin } from '../interfaces/coin.interface';
import Spinner from './Spinner';
import { useNavigate } from 'react-router-dom';

const CoinTable = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const limit = 20;
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [canShowMore, setCanShowMore] = useState(true);
  const navigate = useNavigate();

  const fetchCoins = async () => {
    setIsLoading(true);
    const res = await fetch(
      `https://api.coincap.io/v2/assets?limit=${limit}&offset=${page * limit}`
    );
    const data = await res.json();
    if (data.data.length) {
      setCanShowMore(true);
      setCoins([...coins, ...data.data]);
    } else {
      setCanShowMore(false);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchCoins();
  }, [page]);

  const { items, requestSort } = useSortableData(coins);

  return (
    <div>
      <div className='containerTable'>
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
                <tr key={id} onClick={() => navigate(`/${id}`)}>
                  <td>{rank}</td>
                  <td>
                    <div className='coinNameContainer'>
                      <img
                        className='coinLogo'
                        src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                      />
                      <p className='coinName'>{name}</p>
                      <p className='coinSymbol'>{symbol}</p>
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

      {isLoading ? (
        <Spinner />
      ) : (
        <button
          type='button'
          className='btnShowMore'
          onClick={() => setPage((prevState) => prevState + 1)}
          disabled={!canShowMore}
        >
          Show more
        </button>
      )}
    </div>
  );
};

export default CoinTable;
