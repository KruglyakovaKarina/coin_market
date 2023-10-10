import { FC } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatNum } from '../helper/formatNum';
import { useSortableData } from '../hooks/useSortTableData';
import { ICoin } from '../interfaces/coin.interface';

interface ICoinTable {
  coins: ICoin[];
}

const CoinTable: FC<ICoinTable> = ({ coins }) => {
  const { items, requestSort, sortConfig } = useSortableData(coins);
  const getClassNamesFor = (name: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };
  return (
    <div className='container'>
      <table className='mainTable'>
        <thead>
          <tr>
            <th>
              <button
                type='button'
                onClick={() => requestSort('rank')}
                className={getClassNamesFor('rank')}
              >
                #
              </button>
            </th>
            <th>
              <button
                type='button'
                onClick={() => requestSort('name')}
                className={getClassNamesFor('name')}
              >
                Name
              </button>
            </th>
            <th>
              <button
                type='button'
                onClick={() => requestSort('priceUsd')}
                className={getClassNamesFor('priceUsd')}
              >
                Price
              </button>
            </th>
            <th>
              <button
                type='button'
                onClick={() => requestSort('marketCapUsd')}
                className={getClassNamesFor('marketCapUsd')}
              >
                Market Cap
              </button>
            </th>
            <th>
              <button
                type='button'
                onClick={() => requestSort('changePercent24Hr')}
                className={getClassNamesFor('changePercent24Hr')}
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
  );
};

export default CoinTable;
