import { useActiveChain } from '@Hooks/useActiveChain';
import { response } from '@Views/TradePage/type';
import { getConfig } from '@Views/TradePage/utils/getConfig';
import axios from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';
import { getAddress } from 'viem';

export const useMarketsRequest = () => {
  const { activeChain } = useActiveChain();
  const configData = getConfig(activeChain.id);
  const { data: bothVersionMrkets, error, mutate } = useBothVersionsMarkets();
  return {
    data: {
      optionContracts: bothVersionMrkets?.optionContracts.filter(
        (optionContract) => {
          return (
            optionContract.poolContract !== null &&
            getAddress(configData.router) ===
              getAddress(optionContract.routerContract) &&
            optionContract.configContract !== null
          );
        }
      ),
    },
    error,
    mutate,
  };
};

export const useAllV2_5MarketsRequest = () => {
  const { data: bothVersionMrkets, error, mutate } = useBothVersionsMarkets();
  return {
    data: {
      optionContracts: bothVersionMrkets?.optionContracts.filter(
        (optionContract) =>
          optionContract.poolContract !== null &&
          optionContract.configContract !== null
      ),
    },
    error,
    mutate,
  };
};

export const useV2Markets = () => {
  const { data: bothVersionMrkets, error, mutate } = useBothVersionsMarkets();
  const { activeChain } = useActiveChain();
  const configData = getConfig(activeChain.id);
  return {
    data: {
      optionContracts: bothVersionMrkets?.optionContracts,
    },
    error,
    mutate,
  };
};

//fetches all markets from graphql
export const useBothVersionsMarkets = () => {
  const { activeChain } = useActiveChain();
  const configData = getConfig(activeChain.id);
  console.log('configData.router', configData.router);
  async function fetcher(): Promise<response> {
    const response = await axios.post(indexer_url, {
      query: `{ 
        optionContracts(limit:1000, where:{routerContract:"${getAddress(
          configData.router
        )}"}){
          items{
            configContract {
              address
              maxFee
              maxPeriod
              minFee
              minPeriod
              platformFee
              earlyCloseThreshold
              isEarlyCloseEnabled
              IV
              IVFactorOTM
              IVFactorITM
              creationWindowAddress
            }
            index
            precesion
            routerContract
            address
            poolContract
            isPaused
            category
            asset
            isRegistered
            pool
          }
                }
            }`,
    });
    return response.data?.data as response;
  }

  const { data, error, mutate } = useSWR<response, Error>(
    `v3AppConfig-activeChain-${activeChain.id}`,
    {
      fetcher: fetcher,
      refreshInterval: 60000,
    }
  );
  console.log('data-rep', data);
  const response = useMemo(() => {
    if (!data) return { data, error, mutate };

    return {
      mutate,
      error,
      data: {
        optionContracts: data.optionContracts.items.filter((option) => {
          if (option.poolContract === null) return true;
          const check =
            configData.poolsInfo[
              getAddress(
                option.poolContract
              ) as keyof typeof configData.poolsInfo
            ] !== undefined;
          return check;
        }),
      },
    };
  }, [data, error]);

  return response;
};
