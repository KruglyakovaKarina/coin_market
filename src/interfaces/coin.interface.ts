export interface ICoin {
  id: string;
  rank: number;
  name: string;
  symbol: string;
  priceUsd: number;
  marketCapUsd: number;
  changePercent24Hr: number;
  supply: number;
  maxSupply: number;
}

export interface ICoinWithNumAndPrice extends ICoin {
  numOfCoin: number;
  coinPrice: number;
}
