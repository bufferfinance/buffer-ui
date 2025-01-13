function formatTime(timestamp: number): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
}

import DownIcon from '@SVG/Elements/DownIcon';
import UpIcon from '@SVG/Elements/UpIcon';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  ClockIcon,
  CheckCircleIcon,
  XCircleIcon,
  XCircle,
  XIcon,
} from 'lucide-react';

interface TradeTimelineProps {
  trade: {
    initiation_time: number;
    settledTrade?: {
      opened_time: number;
      status: 'OPENED' | 'CANCELLED';
      reason?: string;
    };
  };
  trend: 'UP' | 'DOWN';
  totalFee: number;
}

export function TradeTimeline({ trade, trend, totalFee }: TradeTimelineProps) {
  const { initiation_time, settledTrade } = trade;

  return (
    <div className="w-80 bg-[#2a2b3d] rounded-lg shadow-lg overflow-hidden border border-[#3d3e56]">
      <div className="px-4 py-3 bg-[#22233a] flex items-center justify-between">
        <span className="font-bold text-gray-200 flex items-center">
          {trend === 'UP' ? (
            <UpIcon className="w-4 h-4 text-green mr-1 scale-75" />
          ) : (
            <DownIcon className="w-4 h-4 text-red mr-1 scale-75" />
          )}
          BTCUSD{' '}
          <span
            className={`font-semibold ml-1 ${
              trend === 'UP' ? 'text-green' : 'text-red'
            }`}
          >
            @10120 USD
          </span>
        </span>
        <div className="flex items-center">10 USD</div>
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
                {formatTime(initiation_time)}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Trade usually gets settled in &lt;1min.
              </p>
            </div>
          </div>

          {/* Settlement Status */}
          {settledTrade && (
            <div className="relative transition-all duration-500">
              <div
                className={`absolute left-[-24px] top-[2px] w-5 h-5 rounded-full bg-[#22233a] border-2 flex items-center justify-center
                ${
                  settledTrade.status === 'OPENED'
                    ? 'settlement-border-green'
                    : 'settlement-border-red'
                }`}
              >
                {settledTrade.status === 'OPENED' ? (
                  <CheckCircleIcon className="w-3 h-3 text-green" />
                ) : (
                  <XIcon className="w-3 h-3 text-red" />
                )}
              </div>
              <div className="flex flex-col">
                <h2
                  className={`font-semibold ${
                    settledTrade.status === 'OPENED'
                      ? 'text-green-400'
                      : 'text-red-400'
                  }`}
                >
                  Trade{' '}
                  {settledTrade.status === 'OPENED' ? 'Opened' : 'Cancelled'}
                </h2>
                <p className="text-sm text-gray-300">
                  {formatTime(settledTrade.opened_time)}
                </p>
                {settledTrade.status === 'OPENED' ? (
                  <a
                    href="#"
                    className="text-xs text-blue-400 hover:underline mt-1"
                  >
                    Go to trade
                  </a>
                ) : (
                  <p className="text-xs text-gray-400 mt-1">
                    Reason: {settledTrade.reason || 'Unknown'}
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

export default function TradeSettlementLogger() {
  const [trade, setTrade] = useState({
    initiation_time: Date.now(),
  });

  const [totalFee] = useState(1234.56);
  const [trend] = useState<'UP' | 'DOWN'>('UP');

  useEffect(() => {
    // Simulate trade opening after 4 seconds
    const timer = setTimeout(() => {
      setTrade((prevTrade) => ({
        ...prevTrade,
        settledTrade: {
          opened_time: Date.now(),
          status: Math.random() > 0.5 ? 'OPENED' : 'CANCELLED',
          reason: 'Insufficient funds',
        },
      }));
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return <TradeTimeline trade={trade} trend={trend} totalFee={totalFee} />;
}
