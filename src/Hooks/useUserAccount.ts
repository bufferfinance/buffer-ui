import { useAccount } from 'wagmi';
import { useQuery } from './useQuery';

export const useUserAccount = () => {
  const { address: account } = useAccount();
  const query = useQuery();
  return {
    address: (query.get('user_address') || account) as `0x${string}`,
    viewOnlyMode: query?.get('user_address') ? true : false,
  };
};
