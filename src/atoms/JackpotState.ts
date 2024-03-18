import { atomWithLocalStorage } from '@Utils/atomWithLocalStorage';
import { JackpotType, TradeType } from '@Views/TradePage/type';
import { atom } from 'jotai';

const JackpotSharesAtom = atomWithLocalStorage(
  'augmentation-jackpot',
  [] as JackpotType[]
);
