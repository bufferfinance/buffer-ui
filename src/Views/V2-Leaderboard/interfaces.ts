export interface IPerformer {
  option_count: number;
  deposit_token: string;
  chain_name: string;
  chain_image: string;
  pnl: number;
  user_address: string;
  user_image: string;
  net_pnl: number;
  rank: number;
  net_percentage_pnl: number | string;
  total_net_pnl: number;
  net_total_fee: number;
  volume: number;
  score: number;
}

export interface IWeeklyLeague {
  userAddress: string;
  USDCVolume: string;
  USDCPnl: string;
  USDCTrades: string;
  USDCTradesWon: string;
  ARBVolume: string;
  ARBPnl: string;
  ARBTrades: string;
  ARBTradesWon: string;
  BFRVolume: string;
  BFRPnl: string;
  BFRTrades: string;
  BFRTradesWon: string;
  league: string;
  weekId: string;
  totalVolume: string;
  totalPnl: string;
  totalTrades: string;
  winPoints: string;
  losePoints: string;
  winRewards: string;
  loseRewards: string;
}
