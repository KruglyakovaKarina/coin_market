import { ICoinWithNumAndPrice } from './coin.interface';

export interface IPortfolio {
  [key: string]: ICoinWithNumAndPrice;
}
