import { useUserAccount } from '@Hooks/useUserAccount';
import useSWR from 'swr';
import { perpsClient, PerpsQueries } from '../Utils/PerpsConfig';
import { SummaryData } from '../Perps.types';

export const usePerpsHoldings = () => {
  const account = useUserAccount();
  const resp = useSWR<SummaryData | 'NA' | 'L'>(
    ['user-perps', account?.address],
    {
      fetcher: async () => {
        if (!account) return 'NA';
        const res = await perpsClient.post<SummaryData>('/info', {
          type: PerpsQueries.Holdings,
          user: account.address,
        });
        if (res.status != 200) {
          return 'NA';
        }
        return res.data;
      },
    }
  );
  if (!resp.data) {
    return 'L';
  }
  return resp.data;
};
export const usePerpsBalance = () => {
  const account = useUserAccount();
  const resp = useSWR<SummaryData | 'NA' | 'L'>(
    ['user-perps', account?.address],
    {
      fetcher: async () => {
        if (!account) return 'NA';
        const res = await perpsClient.post<SummaryData>('/info', {
          type: PerpsQueries.Balance,
          user: account.address,
        });
        if (res.status != 200) {
          return 'NA';
        }
        return res.data;
      },
    }
  );
  if (!resp.data) {
    return 'L';
  }
  return resp.data;
};
