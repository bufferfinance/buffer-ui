import { HLNamesABI } from '@ABIs/HyperliquidNames.abi';
import { useUserAccount } from '@Hooks/useUserAccount';

import useSWR from 'swr';
import { useReadContract } from 'wagmi';
//0xCCc9b4225edD38d3Ff1cC738efC2e6bDEeF241F2.primaryName([address]);
export const useHLName = () => {
  const { address } = useUserAccount();
  const response = useReadContract({
    address: '0xCCc9b4225edD38d3Ff1cC738efC2e6bDEeF241F2',
    abi: HLNamesABI,
    functionName: 'primaryName',
    args: [address],
  });
  return response.data;
};
