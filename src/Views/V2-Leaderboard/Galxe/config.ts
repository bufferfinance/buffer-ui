export type weeklyTournamentConfigType = {
  startTimestamp: number;
  endDay: number | undefined;
  winnersNFT: number;
  losersNFT: number;
  contestRules: string;
  rewardFixedAmount: string;
  poolPercent: string;
  minTradesToQualifyPNL: number;
  minTradesToQualifyWinrate: number;
  winrateStartWeek: number | undefined;
  minVolumeToQualifyWinrate: string | undefined;
  winrateNFT: number;
};

export const weeklyTournamentConfig: {
  [key: number]: weeklyTournamentConfigType;
} = {
  421613: {
    startTimestamp: 1676908800000,
    winnersNFT: 3,
    losersNFT: 4,
    winrateNFT: 3,
    endDay: 1,
    contestRules:
      ' https://zinc-atlasaurus-c98.notion.site/Buffer-Arbitrum-Weekly-Trading-Competitions-LIVE-f1b9720e6f5042fbbbb7ec67d7b35a52',
    rewardFixedAmount: '0',
    poolPercent: '0',
    winrateStartWeek: undefined,
    minTradesToQualifyPNL: 5,
    minTradesToQualifyWinrate: 5,
    minVolumeToQualifyWinrate: '100000000',
  },
  42161: {
    startTimestamp: 1712160000000,
    winnersNFT: 0,
    losersNFT: 0,
    winrateNFT: 0,
    endDay: 6,
    contestRules:
      'https://mirror.xyz/0xc730FbdFEb3e9dF76008A19962963cA4A2bd8de2/x6u31zeHDb5K0Ml96HzzqsqofogUpmFNlZHmiJrERNY',
    rewardFixedAmount: '1000',
    poolPercent: '5',
    winrateStartWeek: undefined,
    minTradesToQualifyPNL: 0,
    minTradesToQualifyWinrate: 0,
    minVolumeToQualifyWinrate: '0',
  },
  80001: {
    startTimestamp: 1679328000000,
    winnersNFT: 0,
    losersNFT: 0,
    winrateNFT: 0,
    endDay: 1,
    contestRules:
      'https://zinc-atlasaurus-c98.notion.site/Buffer-Polygon-Weekly-Trading-Competitions-1a568febffc542c1a855fea57a8487f2',
    rewardFixedAmount: '0',
    poolPercent: '0',
    winrateStartWeek: 1,
    minTradesToQualifyPNL: 5,
    minTradesToQualifyWinrate: 5,
    minVolumeToQualifyWinrate: '100000000',
  },
  137: {
    startTimestamp: 1679328000000,
    winnersNFT: 0,
    losersNFT: 0,
    winrateNFT: 0,
    endDay: undefined,
    contestRules:
      'https://zinc-atlasaurus-c98.notion.site/Buffer-Polygon-Weekly-Trading-Competitions-1a568febffc542c1a855fea57a8487f2',
    rewardFixedAmount: '100',
    poolPercent: '5',
    winrateStartWeek: 1,
    minTradesToQualifyPNL: 3,
    minTradesToQualifyWinrate: 5,
    minVolumeToQualifyWinrate: '100000000',
  },
};

export const isTestnet = import.meta.env.VITE_ENV.toLowerCase == 'testnet';
