import demoState from '@/state/qid2settlementStatus';
import { TradeType } from '@Views/TradePage/type';
import { create } from 'zustand';
interface Notification {
  logs: { [id: number]: TradeType };
  subscribe: (trade: TradeType) => void;
  sync: (trades: TradeType[]) => void;
  unsubscribe: (trade: TradeType) => void;
}
export const useTradeSettlmentLogger = create<Notification>()((set) => ({
  logs: {},
  subscribe: (trade: TradeType) => {
    set((s) => ({ logs: { ...s.logs, [trade.id]: trade } }));
  },
  sync: (trades: TradeType[]) => {
    set((s) => {
      const newState = { ...s };
      newState.logs = { ...s.logs };
      for (const trade of trades) {
        if (trade.queue_id in s.logs) {
          newState.logs[trade.queue_id] = trade;
        }
      }
      return newState;
    });
  },
  unsubscribe: (trade: TradeType) => {
    set((s) => {
      const newState = { ...s };
      newState.logs = { ...s.logs };
      delete newState.logs[trade.id];
      return newState;
    });
  },
}));
