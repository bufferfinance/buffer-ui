import { getHashUrlQueryParam } from '@Utils/getHashUrlQueryParam';
import { isTestnet } from 'config';
import { defineChain } from 'viem';
import { arbitrum, polygon, polygonMumbai } from 'viem/chains';

export const urlSettings = getHashUrlQueryParam(window.location.href);
const arbitrumSepolia = defineChain({
  id: 421614,
  name: 'Arbitrum Sepolia',
  network: 'arb-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'AETH',
  },
  rpcUrls: {
    default: {
      http: ['https://sepolia-rollup.arbitrum.io/rpc'],
    },
    public: {
      http: ['https://sepolia-rollup.arbitrum.io/rpc'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://api-sepolia.arbiscan.io/api' },
  },
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 81930,
    },
  },
  testnet: true,
});

export function getSupportedChains() {
  return isTestnet ? [arbitrumSepolia] : [arbitrum];
}

export const getAllChains = () => {
  switch (urlSettings?.chain) {
    case 'arbitrum':
      return isTestnet ? [arbitrumSepolia, polygonMumbai] : [arbitrum, polygon];
    case 'polygon':
      return isTestnet ? [polygonMumbai, arbitrumSepolia] : [polygon, arbitrum];
    default:
      return isTestnet ? [arbitrumSepolia, polygonMumbai] : [arbitrum, polygon];
  }
};
