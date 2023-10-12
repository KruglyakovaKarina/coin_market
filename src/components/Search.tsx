import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICoin } from '../interfaces/coin.interface';

const Search = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [search, setSearch] = useState('');
  const limit = 5;

  const searchCoins = async (searchValue: string) => {
    const res = await fetch(
      `https://api.coincap.io/v2/assets?limit=${limit}&search=${searchValue}`
    );
    const data = await res.json();
    setCoins(data.data);
  };

  useEffect(() => {
    if (search) {
      searchCoins(search);
    }
  }, [search]);

  return (
    <div className='searchPos'>
      <div className='searchContainer'>
        <input
          type='search'
          placeholder='Search'
          onChange={(e) => setSearch(e.target.value)}
          className='searchInput'
        />
        <button className='btnSearch'>
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>

      {search ? (
        <div>
          <span className='searchResults'>
            {coins.length ? (
              coins.map(({ rank, name, symbol }) => (
                <div className='searchResultsContainer'>
                  <>
                    <div className='searchResultNameContainer'>
                      <img
                        src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                        className='searchResultLogo'
                      />
                      <p className='searchResultName'>{name}</p>
                      <p className='searchResultSymbol'>{symbol}</p>
                    </div>
                    <p className='searchResultRank'>{'#' + rank}</p>
                  </>
                </div>
              ))
            ) : (
              <p>Not found</p>
            )}
          </span>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Search;
