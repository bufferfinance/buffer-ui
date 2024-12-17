import axios from 'axios';
import { defineChain } from 'viem';
import { arbitrum } from 'viem/chains';

export const ContractsConfig = {
  421614: {
    graph: {
      MAIN: 'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/above-below-sepolia/version/v0.2.1-ud-updat3e-contracts/api',
      ABOVE_BELOW:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/above-below-sepolia/api',
      EVENTS:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/up-down-v3-testnet/version/platform-evts-ab/api',
      REWARDS: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/jackpot/api`,
      LEADERBOARD: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/jackpot/version/v3.0.31-leaderboard-tracking-update-contracts/api`,
      DASHBOARD: '',
      PROFILE: '',
      LP: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/jackpot/version/v3.0.34-lp-tracking/api`,
    },
    signer_manager: '0x4499D65378E7D6ECb152caB3893dfFBB654F9961',
    ab: {
      router: '0xc8083f764d5ce46E4DbEa3dEB975C3301c8d08aB',
    },
    ud: {
      router: '0x693351786cf6f328B1495bd9d527d898929580AE',
    },
    jackpot: '0x6D09f5606e2190e0E42E0ebD89250748981eec3C',
    poolsInfo: {
      '0x464c93cab18A051a24BD520bb97c22C583b48F01': {
        tokenAddress: '0xb180dB4293D9247Dc974F1445082ae55A91C9539',
        faucet: '0xAb4df8Aaa1F54E84C469f4bc0e513436088C9B86',
        decimals: 6,
        token: 'USDC.e',
        permitName: 'USDC',
        is_pol: false,
      },
      '0xEe8f62C080A6da2B91ab3478D58e6999daAAb8be': {
        tokenAddress: '0x7Fe2dD3b4619802B8c4b404f5e440756391439ba',
        faucet: '0xB54521E255d23F2fA7f37d29C7E76D8FFa85fc05',
        decimals: 6,
        token: 'USDC',
        permitName: 'USDC',
        is_pol: false,
      },
      '0x70086DFD2b089359A6582A18D24aBE1AcE40f8D0': {
        tokenAddress: '0x9132016099CEbb740db64A36da0D3307824Ad159',
        faucet: '0x62Db9CD484b3B59e1d0444cea1f0D0D3c00bf2F5',
        decimals: 18,
        token: 'BFR',
        permitName: 'Token',
        is_pol: false,
      },
      '0x52126176479d8aFADF2Bc32eDe79dfDdFe69189c': {
        tokenAddress: '0xd8F5E01e1723EFDdc7faA76a8C3FeFb4A8ef5b76',
        faucet: '0x6B655D99962F58B9Aa0fFB18281408CdBCf61800',
        decimals: 18,
        token: 'ARB',
        permitName: 'ARB',
        is_pol: false,
      },
    },
  },
  42161: {
    graph: {
      ABOVE_BELOW:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.6-arbitrum-one/version/v0.0.6-ab-add-usd-values/api',
      MAIN: 'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.6-arbitrum-one/version/v0.0.4-ud-trades-markets/api',
      EVENTS:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/events/version/v2.5-up-events-mainnet/api',
      REWARDS: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/jackpot/api`,
      LEADERBOARD: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/mainnet-dummy/version/v0.0.11-leaderboard-price-fix/api`,
      DASHBOARD:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.5-arbitrum-mainnet/version/v2.9.1-ud-ab-nfts-leagues-stats-defillama-merge/api',
      PROFILE:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/arbitrum-mainnet/version/v2.7.2-v2.6-profile-data/api',
      LP: 'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/mainnet-dummy/version/v0.0.6-lp-price-fix/api',
    },
    signer_manager: '0x84cb6d8Fafa09D8A606f423feD6BB2745e677526',
    ab: {
      router: '0x94582981c3be6092b912265C2d2cE172e7f9c3B1',
    },
    ud: {
      router: '0x2BAA48961C1CD376484b601278bF7A51E94293a9',
    },
    jackpot: '0xe34cd1D40733B991fea9ea8545Fa1F490200d6e8',
    poolsInfo: {
      '0x6Ec7B10bF7331794adAaf235cb47a2A292cD9c7e': {
        tokenAddress: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        faucet: '0x0000000000000000000000000000000000000000',
        decimals: 6,
        token: 'USDC.e',
        permitName: 'USD Coin (Arb1)',
        is_pol: false,
      },
      '0xfD9f8841C471Fcc55f5c09B8ad868BdC9eDeBDE1': {
        tokenAddress: '0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8',
        faucet: null,
        decimals: 6,
        token: 'USDC',
        is_pol: true,
      },
      '0xEe8f62C080A6da2B91ab3478D58e6999daAAb8be': {
        tokenAddress: '0x7Fe2dD3b4619802B8c4b404f5e440756391439ba',
        faucet: '0xB54521E255d23F2fA7f37d29C7E76D8FFa85fc05',
        decimals: 6,
        token: 'USDC',
        permitName: 'USDC',
        is_pol: false,
      },
      '0x70086DFD2b089359A6582A18D24aBE1AcE40f8D0': {
        tokenAddress: '0x9132016099CEbb740db64A36da0D3307824Ad159',
        faucet: '0x62Db9CD484b3B59e1d0444cea1f0D0D3c00bf2F5',
        decimals: 18,
        token: 'BFR',
        permitName: 'Token',
        is_pol: false,
      },
      '0xaE0628C88EC6C418B3F5C005f804E905f8123833': {
        tokenAddress: '0x912CE59144191C1204E64559FE8253a0e49E6548',
        faucet: '0x6B655D99962F58B9Aa0fFB18281408CdBCf61800',
        decimals: 18,
        token: 'ARB',
        permitName: 'Arbitrum',
        is_pol: false,
      },
    },
  },
  42161121: {
    graph: {
      ABOVE_BELOW:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.6-arbitrum-one/version/v0.0.6-ab-add-usd-values/api',
      MAIN: 'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.6-arbitrum-one/version/v0.0.4-ud-trades-markets/api',
      EVENTS:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/events/version/v2.5-up-events-mainnet/api',
      REWARDS: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/jackpot/api`,
      LEADERBOARD: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/mainnet-dummy/version/v0.0.11-leaderboard-price-fix/api`,
      DASHBOARD:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.5-arbitrum-mainnet/version/v2.9.1-ud-ab-nfts-leagues-stats-defillama-merge/api',
      PROFILE:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/arbitrum-mainnet/version/v2.7.2-v2.6-profile-data/api',
      LP: 'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/mainnet-dummy/version/v0.0.6-lp-price-fix/api',
    },
    signer_manager: '0xdc43CeA44593F9054BB52b7161981918ABdE067a',
    ab: {
      router: '0x94582981c3be6092b912265C2d2cE172e7f9c3B1',
    },
    ud: {
      router: '0xf4cc4978C5d80945364fBdBD3750429505ADeB89',
    },
    jackpot: '0xe34cd1D40733B991fea9ea8545Fa1F490200d6e8',
    poolsInfo: {
      '0xA4fcbfbFFc7feEaAc50f804fc88Df0fb5CF2362B': {
        tokenAddress: '0xf9b92Fde16c458953a479464e46F4ddf3B0B183e',
        faucet: null,
        decimals: 6,
        token: 'USDC',
        permitName: 'USD Coin',
        is_pol: false,
      },
      '0xf9b92Fde16c458953a479464e46F4ddf3B0B183e': {
        tokenAddress: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
        faucet: null,
        decimals: 6,
        token: 'USDC',
        permitName: 'USD Coin',
        is_pol: false,
      },
      '0x70086DFD2b089359A6582A18D24aBE1AcE40f8D0': {
        tokenAddress: '0x9132016099CEbb740db64A36da0D3307824Ad159',
        faucet: '0x62Db9CD484b3B59e1d0444cea1f0D0D3c00bf2F5',
        decimals: 18,
        token: 'BFR',
        permitName: 'Token',
        is_pol: false,
      },
      '0xaE0628C88EC6C418B3F5C005f804E905f8123833': {
        tokenAddress: '0x912CE59144191C1204E64559FE8253a0e49E6548',
        faucet: '0x6B655D99962F58B9Aa0fFB18281408CdBCf61800',
        decimals: 18,
        token: 'ARB',
        permitName: 'Arbitrum',
        is_pol: false,
      },
    },
  },
  998: {
    graph: {
      ABOVE_BELOW:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.6-arbitrum-one/version/v0.0.6-ab-add-usd-values/api',
      MAIN: 'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.6-arbitrum-one/version/v0.0.4-ud-trades-markets/api',
      EVENTS:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/events/version/v2.5-up-events-mainnet/api',
      REWARDS: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/jackpot/api`,
      LEADERBOARD: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/mainnet-dummy/version/v0.0.11-leaderboard-price-fix/api`,
      DASHBOARD:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.5-arbitrum-mainnet/version/v2.9.1-ud-ab-nfts-leagues-stats-defillama-merge/api',
      PROFILE:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/arbitrum-mainnet/version/v2.7.2-v2.6-profile-data/api',
      LP: 'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/mainnet-dummy/version/v0.0.6-lp-price-fix/api',
    },
    signer_manager: '0x77Ed4a8399C9Cf9C6A043B8076a0D8f09e0778ED',
    ab: {
      router: '0x3BB5127F72ae5603A5D639ffAe8B16438Ae769b6',
    },
    ud: {
      router: '0x3E0806EEe0877b330C6bf0BB7d6406202506874C',
    },
    referral: '0x711515cb230dA44B6630EF9a82ceE2529492f4C8',
    jackpot: '0xe34cd1D40733B991fea9ea8545Fa1F490200d6e8',
    poolsInfo: {
      '0x405F2EAd33A0676A68f27a9cb467f4dCF0e99409': {
        tokenAddress: '0xf91f0eeFD0a5da9f3Fd063F3C670ad69d7A777fa',
        faucet: '0x9D8b049A61cdF67843d4FE82CC9c43f8A21c5F5e',
        decimals: 6,
        token: 'USDC',
        permitName: 'USDC',
        is_pol: false,
      },
      '0x02DCCe05B544aC831EC46DEE674e81ef09b4D12B': {
        tokenAddress: '0xbddFe30f12Ef1BD0dB3C03CbE406f1b94d3D09d4',
        faucet: '0x6B655D99962F58B9Aa0fFB18281408CdBCf61800',
        decimals: 18,
        token: 'ARB',
        permitName: 'Arbitrum',
        is_pol: false,
      },
    },
  },
  9988: {
    graph: {
      ABOVE_BELOW:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.6-arbitrum-one/version/v0.0.6-ab-add-usd-values/api',
      MAIN: 'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.6-arbitrum-one/version/v0.0.4-ud-trades-markets/api',
      EVENTS:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/events/version/v2.5-up-events-mainnet/api',
      REWARDS: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/jackpot/api`,
      LEADERBOARD: `https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/mainnet-dummy/version/v0.0.11-leaderboard-price-fix/api`,
      DASHBOARD:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/v2.5-arbitrum-mainnet/version/v2.9.1-ud-ab-nfts-leagues-stats-defillama-merge/api',
      PROFILE:
        'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/arbitrum-mainnet/version/v2.7.2-v2.6-profile-data/api',
      LP: 'https://subgraph.satsuma-prod.com/e66b06ce96d2/bufferfinance/mainnet-dummy/version/v0.0.6-lp-price-fix/api',
    },
    signer_manager: '0x1D843b3edc11C97aF823120A7c3F16922f3B7c22',
    ab: {
      router: '0xF6b93FEe640E8ADF5d5c214Aa74de2767B1882e3',
    },
    ud: {
      router: '0x8e5FCE8266Bdd31CD4b4Fbd6677Bd16A4ca6E276',
    },
    jackpot: '0xe34cd1D40733B991fea9ea8545Fa1F490200d6e8',
    poolsInfo: {
      '0x613676b74fFe3af9C5c452A8C3B57f949Fc05A19': {
        tokenAddress: '0x122b552a304C28afbbc72aE1D1884a96AD1Fa2Cf',
        faucet: '0x6c3338B68e37227b022cEd263FEF7D421aB5e68c',
        decimals: 6,
        token: 'USDC',
        permitName: 'USDC',
        is_pol: false,
      },
      '0xbe9a26bF0771bb8C8e69657F4E85a201420939F1': {
        tokenAddress: '0x8909Fda0D59fe090D31887D2Ad54743183CA45EE',
        faucet: '0x6B655D99962F58B9Aa0fFB18281408CdBCf61800',
        decimals: 18,
        token: 'ARB',
        permitName: 'Arbitrum',
        is_pol: false,
      },
      // "0x0D8Ea07994838b8672449355553820f1BEF11F72": {
      //   tokenAddress: '0x214BdaF1111296d7fe28f529c4265EAf13A550D7',
      //   faucet: null,
      //   decimals: 6,
      //   token: 'USDC',
      //   permitName: 'USDC',
      //   is_pol: false,
      // }
    },
  },
};
export const pdev = axios.create({
  baseURL: indexer_url,
});
// Dev Server Client
export const dsc = axios.create({
  baseURL: api_url,
});
export const mainClient = axios.create({
  baseURL: api_url,
});
// 0x03118E014F75A09BE1c6522c6f5f411980f9a000
