import { useActiveChain } from '@Hooks/useActiveChain';
import axios from 'axios';
import useSWR from 'swr';
import { UDProductID, baseUrl } from '../config';
import { useProducts } from '@Views/AboveBelow/Hooks/useProductName';
import { dsc, mainClient } from '@ConfigContract';
import { useActiveMarket } from './useActiveMarket';
import { joinStrings } from '../utils';
import { useAtomValue } from 'jotai';
import { timeSelectorAtom } from '../atoms';
import { useMemo } from 'react';

interface SettlementFee {
  settlement_fee: number;
  settlement_fee_sign_expiration: number;
  settlement_fee_signature: string;
  period: number;
  isAbove: boolean;
}
export interface IBaseSettlementFees {
  up: SettlementFee;
  down: SettlementFee;
}
interface IBaseSettlementFeesRes {
  up: SettlementFee[];
  down: SettlementFee[];
}
const ex = null;
export const useSettlementFee = () => {
  const { activeChain } = useActiveChain();
  const { activeMarket } = useActiveMarket();
  const currentTime = useAtomValue(timeSelectorAtom);

  const products = useProducts();
  const responsedata = useSWR<IBaseSettlementFeesRes | null>(
    [activeChain, 'settlementFee'],
    {
      // fetcher: () => ({
      //   up: {
      //     settlement_fee: 1250,
      //     settlement_fee_sign_expiration: 1727440999,
      //     settlement_fee_signature:
      //       '0x9de65dc09f00a3e343db1dbd90c04fa7f40a78cb0f1210b78cd7847a996e0d2c6b5e0df80ff66824ec3dabc511d32868b05f401972dc00e1a730f0d5a50c91171c',
      //     period: 15,
      //     isAbove: true,
      //   },
      //   down: {
      //     settlement_fee: 1250,
      //     settlement_fee_sign_expiration: 1727440999,
      //     settlement_fee_signature:
      //       '0x9de65dc09f00a3e343db1dbd90c04fa7f40a78cb0f1210b78cd7847a996e0d2c6b5e0df80ff66824ec3dabc511d32868b05f401972dc00e1a730f0d5a50c91171c',
      //     period: 15,
      //     isAbove: false,
      //   },
      // }),
      fetcher: async () => {
        if (!activeChain || !activeMarket) return null;
        const activePair = joinStrings(
          activeMarket.token0,
          activeMarket.token1,
          ''
        );
        const response = await dsc.get(
          `settlement_fee/?environment=${activeChain.id}&product_id=${products.UP_DOWN.product_id}&queryPair=${activePair}`
        );
        console.log('response', response);

        return response?.data;
      },
      refreshInterval: 2500,
    }
  );

  const response = useMemo(() => {
    const periodInMinutes = currentTime.seconds / 60;

    // let upFeeObj = response.data['up'].find(
    //   (ob) => ob.period == periodInMinutes
    // );
    // let downFeeObj = response.data['down'].find(
    //   (ob) => ob.period == periodInMinutes
    // );
    // let res = { up: upFeeObj, down: downFeeObj };
    if (!responsedata.data) return { data: ex };
    let idx = 0;
    for (let i = 0; i < responsedata.data?.down.length; i++) {
      console.log(
        'resfor',
        responsedata.data.down[i].period,
        i,
        periodInMinutes
      );
      if (responsedata.data.down[i].period <= periodInMinutes) {
        idx = i;
      }
    }
    const data = {
      up: responsedata.data.up[idx],
      down: responsedata.data.down[idx],
    };
    return { data };
  }, [responsedata, currentTime?.seconds]);
  return response;
  // return data || null;
};
