import { HLNamesABI } from '@ABIs/HyperliquidNames.abi';
import { useUserAccount } from '@Hooks/useUserAccount';
import axios from 'axios';

import useSWR from 'swr';
import { useReadContract } from 'wagmi';
//0xCCc9b4225edD38d3Ff1cC738efC2e6bDEeF241F2.primaryName([address]);
export const useHLName = () => {
  const { address } = useUserAccount();
  const { data } = useSWR(['dssdfdsa', address], {
    fetcher: async () => {
      if (!address) return null;
      const resp = await axios.get(
        `https://hlnames-rest-api.onrender.com/api/resolve/primary_name/${address}`,
        {
          headers: {
            Accept: '*/*',
            'X-API-Key': 'CPEPKMI-HUSUX6I-SE2DHEA-YYWFG5Y',
          },
        }
      );
      console.log('response', resp);
      return resp?.data?.primaryName;
    },
  });
  console.log("data'", data);
  return data;
};
