type Leverage = {
  type: 'cross' | 'isolated' | string; // Specify allowed types or leave as string for flexibility
  value: number;
};

type CumFunding = {
  allTime: string;
  sinceOpen: string;
  sinceChange: string;
};

type Position = {
  coin: string;
  szi: string;
  leverage: Leverage;
  entryPx: string;
  positionValue: string;
  unrealizedPnl: string;
  returnOnEquity: string;
  liquidationPx: string;
  marginUsed: string;
  maxLeverage: number;
  cumFunding: CumFunding;
};

type AssetPosition = {
  type: 'oneWay' | 'hedged' | string; // Specify allowed types or leave as string for flexibility
  position: Position;
};

type MarginSummary = {
  accountValue: string;
  totalNtlPos: string;
  totalRawUsd: string;
  totalMarginUsed: string;
};

export type SummaryData = {
  marginSummary: MarginSummary;
  crossMarginSummary: MarginSummary;
  crossMaintenanceMarginUsed: string;
  withdrawable: string;
  assetPositions: AssetPosition[];
  time: number; // Timestamp in milliseconds
};

interface Limit {
  tif: 'FrontendMarket'; // "FrontendMarket"
}

interface T {
  limit: Limit;
}

interface Order {
  a: number; // Represents the value of 'a' (54)
  b: boolean; // Represents the value of 'b' (false)
  p: string; // Represents the value of 'p' ("5.8263")
  r: boolean; // Represents the value of 'r' (true)
  s: string; // Represents the value of 's' ("421.1")
  t: T; // Nested object 't' containing 'limit'b
}

export interface PerpsAction {
  grouping: 'na'; // Represents the value of 'grouping' ("na")
  orders: Order[]; // An array of 'orders'
  type: 'order';
}
export interface AgentApproveAction {
  agentAddress: `0x${string}`;
  agentName: string;
  type: 'approveAgent';
  nonce: number;
}

export type AgentApproveResponse = {
  status: 'ok';
  response: {
    type: 'default';
  };
};
