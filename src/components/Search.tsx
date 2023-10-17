import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { ICoin } from '../interfaces/coin.interface';
import Spinner from './Spinner';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
  const [coins, setCoins] = useState<ICoin[]>([]);
  const [search, setSearch] = useState('');
  const limit = 5;
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const searchCoins = async (searchValue: string) => {
    setIsLoading(true);
    const res = await fetch(
      `https://api.coincap.io/v2/assets?limit=${limit}&search=${searchValue}`
    );
    const data = await res.json();
    setCoins(data.data);
    setIsLoading(false);
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
            {isLoading ? (
              <Spinner />
            ) : (
              <>
                {coins.length ? (
                  coins.map(({ id, rank, name, symbol }) => (
                    <div className='searchResultsContainer'>
                      <>
                        <div className='searchResultNameContainer'>
                          <img
                            src={`https://assets.coincap.io/assets/icons/${symbol.toLowerCase()}@2x.png`}
                            className='searchResultLogo'
                          />
                          <p className='searchResultName'>
                            <button
                              onClick={() => navigate(`/${id}`)}
                              className='btnSearchResult'
                            >
                              {name}
                            </button>
                          </p>
                          <p className='searchResultSymbol'>{symbol}</p>
                        </div>
                        <p className='searchResultRank'>{'#' + rank}</p>
                      </>
                    </div>
                  ))
                ) : (
                  <p>Not found</p>
                )}
              </>
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
