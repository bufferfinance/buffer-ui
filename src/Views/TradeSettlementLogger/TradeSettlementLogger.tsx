function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

import {
  useABTradeSettlmentLogger,
  useTradeSettlmentLogger,
} from '@/stores/useTradeSettlmentLogger';
import DownIcon from '@SVG/Elements/DownIcon';
import UpIcon from '@SVG/Elements/UpIcon';
import { getDisplayTime } from '@Utils/Dates/displayDateTime';
import { divide, toFixed } from '@Utils/NumString/stringArithmatics';
import { usePoolInfo } from '@Views/TradePage/Hooks/usePoolInfo';
import { TradeType } from '@Views/TradePage/type';
import { TradeType as TradeTypeAB } from '@Views/ABTradePage/type';

import {
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  XCircle,
  XIcon,
  CrossIcon,
} from 'lucide-react';

interface TradeTimelineProps {
  trade: TradeType | TradeTypeAB;
  getPoolInfo: (a: any) => void;
  unsubscribe: (a: any) => void;
}

export function TradeTimeline({
  trade,
  getPoolInfo,
  unsubscribe,
}: TradeTimelineProps) {
  const settledTrade = trade.state != 'QUEUED';
  console.log('logsf:rendering ', trade);
  const poolInfo = { decimals: 6 };

  return (
    <div className="w-80 relative bg-[#2a2b3d] rounded-lg shadow-lg overflow-hidden border border-[#3d3e56]">
      <button
        className="absolute right-[-6px] top-[-6px] "
        onClick={() => unsubscribe(trade)}
      >
        <CrossIcon className="rotate-45 scale-50  text-[#4a5c77] " />
      </button>
      <div className="px-4 py-3 bg-[#22233a] flex items-center justify-between">
        <span className="font-bold text-gray-200 flex items-center">
          {trade.is_above ? (
            <UpIcon className="w-4 h-4 text-green mr-1 scale-75" />
          ) : (
            <DownIcon className="w-4 h-4 text-red mr-1 scale-75" />
          )}
          BTCUSD{' '}
          <span
            className={`font-semibold ml-1 ${
              trade.is_above ? 'text-green' : 'text-red'
            }`}
          >
            @{toFixed(divide(trade.strike, 8), 2)}
          </span>
        </span>
        <div className="flex items-center">
          {toFixed(divide(trade.trade_size, poolInfo.decimals), 2)} USD
        </div>
      </div>
      <div className="px-4 py-3">
        <div className="relative pl-6">
          {/* Vertical Timeline Line */}
          {settledTrade && (
            <div className="absolute  top-[18px] bottom-[33px] left-[6.6px] w-[2px] bg-[#3d3e56]" />
          )}
          {/* Initiation Status */}
          <div className="relative mb-4">
            <div className="absolute left-[-24px] top-[2px] w-5 h-5 rounded-full  settlement-border-queued flex items-center justify-center">
              <div className="scale-90">
                <img
                  src="/Gear.png"
                  className={`w-[16px]  h-[16px] ${
                    !settledTrade && 'animate-spin'
                  } mr-[4px] `}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <h2 className="font-semibold text-blue-400">Trade Initiated</h2>
              <p className="text-sm text-gray-300">
                {getDisplayTime(
                  trade.strike_timestamp || trade.queued_timestamp
                )}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Trade usually gets settled in &lt;30s.
              </p>
            </div>
          </div>

          {/* Settlement Status */}
          {settledTrade && (
            <div className="relative transition-all duration-500">
              <div
                className={`absolute left-[-24px] top-[2px] w-5 h-5 rounded-full bg-[#22233a] border-2 flex items-center justify-center
                ${
                  trade.state === 'OPENED'
                    ? 'settlement-border-green'
                    : 'settlement-border-red'
                }`}
              >
                {trade.state === 'OPENED' ? (
                  <CheckCircleIcon className="w-3 h-3 text-green" />
                ) : (
                  <XIcon className="w-3 h-3 text-red" />
                )}
              </div>
              <div className="flex flex-col">
                <h2
                  className={`font-semibold ${
                    trade.state === 'OPENED' ? 'text-green-400' : 'text-red-400'
                  }`}
                >
                  Trade {trade.state === 'OPENED' ? 'Opened' : 'Cancelled'}
                </h2>
                <p className="text-sm text-gray-300">
                  {getDisplayTime(trade.open_timestamp)}
                </p>
                {trade.state === 'OPENED' ? (
                  <div
                    // href="#"
                    className="text-xs text-blue-400 hover:underline mt-1"
                  >
                    Wish you luck! 🚀
                  </div>
                ) : (
                  <p className="text-xs text-gray-400 mt-1">
                    Reason: {trade.cancellation_reason || 'Unknown'}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

('use client');

import React, { useState, useEffect } from 'react';

function TradeSettlementLoggerAB() {
  const logs = useABTradeSettlmentLogger((state) => state.logs);
  const ubsubscribe = useABTradeSettlmentLogger((state) => state.unsubscribe);
  const { getPoolInfo } = usePoolInfo();

  return (
    <>
      {Object.entries(logs).map(([k, v]) => (
        <TradeTimeline
          trade={v}
          key={k}
          getPoolInfo={getPoolInfo}
          unsubscribe={ubsubscribe}
        />
      ))}
    </>
  );
}
function TradeSettlementLoggerUD() {
  const logs = useTradeSettlmentLogger((state) => state.logs);
  const ubsubscribe = useTradeSettlmentLogger((state) => state.unsubscribe);
  const { getPoolInfo } = usePoolInfo();

  return (
    <>
      {Object.entries(logs).map(([k, v]) => (
        <TradeTimeline
          trade={v}
          key={k}
          getPoolInfo={getPoolInfo}
          unsubscribe={ubsubscribe}
        />
      ))}
    </>
  );
}

export default function TradeSettlementLogger() {
  return (
    <div className="flex flex-col justify-end gap-3 overflow-y-auto ">
      <TradeSettlementLoggerAB />
      <TradeSettlementLoggerUD />
    </div>
  );
}
