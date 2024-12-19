import { HLNamesABI } from '@ABIs/HyperliquidNames.abi';
import { useUserAccount } from '@Hooks/useUserAccount';

import useSWR from 'swr';
import { useReadContract } from 'wagmi';
//0xCCc9b4225edD38d3Ff1cC738efC2e6bDEeF241F2.primaryName([address]);
export const useHLName = () => {
  const { address } = useUserAccount();
  const response = useReadContract({
    address: '0x3B55d601CE87262fECfbc5583A442Ebe4d07bdB6',
    abi: HLNamesABI,
    functionName: 'primaryName',
    args: [address],
  });
  console.log('response', response);
  return response.data;
};
