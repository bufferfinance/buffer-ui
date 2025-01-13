import { useActiveChain } from '@Hooks/useActiveChain';
import { useUserAccount } from '@Hooks/useUserAccount';
import { useOneCTWallet } from '@Views/OneCT/useOneCTWallet';
import axios from 'axios';
import { useState } from 'react';
import { arbitrumSepolia } from 'src/Config/wagmiClient/getConfigChains';
import useSWR from 'swr';
import { getAddress } from 'viem';
import { useAccount } from 'wagmi';
import { arbitrum, arbitrumGoerli } from 'wagmi/chains';
import { getSingatureCached } from '../cache';
import { baseUrl, refreshInterval } from '../config';
import { TradeType } from '../type';
import { addMarketInTrades } from '../utils';
import { useAllV2_5MarketsConfig } from './useAllV2_5MarketsConfig';
import { useProducts } from '@Views/AboveBelow/Hooks/useProductName';
export enum TradeState {
  Queued = 'QUEUED',
  Active = 'ACTIVE',
}

const useOngoingTrades = () => {
  // const { oneCTWallet } = useOneCTWallet();
  const { activeChain } = useActiveChain();
  const { oneCTWallet } = useOneCTWallet();
  const { address: userAddress } = useUserAccount();
  const { address } = useAccount();
  const [empty, setEmpty] = useState([[], []]);
  const markets = useAllV2_5MarketsConfig();
  const products = useProducts();
  const { data, error } = useSWR<TradeType[][]>(
    'active-trades-' +
      address +
      '-' +
      activeChain.id +
      '-' +
      oneCTWallet?.address,
    {
      fetcher: async () => {
        if (!userAddress) return [[], []] as TradeType[][];
        // if (
        //   ![arbitrum.id, arbitrumGoerli.id, arbitrumSepolia.id].includes(
        //     activeChain.id as 42161
        //   )
        // )
        //   return [[], []];
        let currentUserSignature = null;
        if (userAddress === address)
          currentUserSignature = await getSingatureCached(oneCTWallet);

        const packedRes = await axios.get(`${baseUrl}trades/user/ongoing/`, {
          params: {
            user_address: getAddress(userAddress),
            environment: activeChain.id,
            product_id: products.UP_DOWN.product_id,
          },
        });
        const res = packedRes.data?.active;

        if (!res || !markets?.length) return [[], []];
        // limitOrders
        const limitOrders = res.filter(
          (t: any) => t.is_limit_order && t.state === 'QUEUED'
        );
        const activeTrades = res.filter(
          (t: any) =>
            !t.is_limit_order || (t.is_limit_order && t.state !== 'QUEUED')
        );
        // console.log(`activeTrades: `, activeTrades, limitOrders);
        // console.log(`markets: `, markets);
        return [
          addMarketInTrades(activeTrades, markets),
          addMarketInTrades(limitOrders, markets),
        ] as TradeType[][];
      },
      refreshInterval: refreshInterval,
    }
  );
  return data || empty;
};

export { useOngoingTrades };
