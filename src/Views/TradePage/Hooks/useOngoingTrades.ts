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
import { useTradeSettlmentLogger } from '@/stores/useTradeSettlmentLogger';
export enum TradeState {
  Queued = 'QUEUED',
  Active = 'ACTIVE',
}

const useOngoingTrades = () => {
  // const { oneCTWallet } = useOneCTWallet();
  const { activeChain } = useActiveChain();
  const sync = useTradeSettlmentLogger((s) => s.sync);
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
        const active = packedRes.data?.active;

        if (!active || !markets?.length) return [[], []];

        const activeTrades = addMarketInTrades(active, markets);
        const cancelledOrders = addMarketInTrades(
          packedRes.data?.cancelled,
          markets
        );
        sync([...activeTrades, ...cancelledOrders]);
        return [activeTrades, []] as TradeType[][];
      },
      refreshInterval: refreshInterval,
    }
  );
  return data || empty;
};

export { useOngoingTrades };
