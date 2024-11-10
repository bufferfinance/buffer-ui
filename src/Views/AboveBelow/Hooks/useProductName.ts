import { useActiveChain } from '@Hooks/useActiveChain';
import { aboveBelowBaseUrl } from '@Views/ABTradePage/config';
import { appConfig } from '@Views/TradePage/config';
import axios from 'axios';
import { useMemo } from 'react';
import useSWR from 'swr';

export const useProductName = () => {
  const { activeChain } = useActiveChain();

  return useMemo(()=>({data:{
    "UD":{product_id:"abc"},
    "AB":{product_id:"xyz"},}
  }),[])
};
export const useProducts = () => {
  const { activeChain } = useActiveChain();

  return useMemo(() => {
    if (activeChain.id in appConfig)
      if (appConfig[activeChain.id]?.product_id) {
        return appConfig[activeChain.id].product_id;
      }
    return null;
  }, [activeChain]);
};
