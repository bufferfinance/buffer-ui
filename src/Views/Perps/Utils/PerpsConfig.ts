import axios from 'axios';

export const perpsClient = axios.create({
  baseURL: 'https://api-ui.hyperliquid-testnet.xyz',
});

export const PerpsQueries = {
  Markets: 'metaAndAssetCtxs',
  Holdings: 'clearinghouseState',
  OHLC: 'candleSnapshot',
  Balance: 'spotClearinghouseState',
};

export const PerpsConfig = {
  tokens: {
    USDC: '0x1870dc7a474e045026f9ef053d5bb20a250cc084',
  },
  chainId: 421614,
} as const;

// {
//     "aggregateByTime":true,
//     "endTime": 2114361000000,
//     "reversed": true,
//     "startTime":1727942400000,
//     "type": "userFillsByTime",
//     "user":"0x6F721D0A8aBDb5dBBdaB3c05eFA81371C0d21D68"
//   }
