import { ArrowUpDown, ExternalLink, Settings } from 'lucide-react';
import { SummaryData } from './Perps.types';
/*
const summaryData: SummaryData = {
    marginSummary: {
      accountValue: '1000000',
      totalNtlPos: '288.88',
      totalRawUsd: '288.88',
      totalMarginUsed: '14.44',
    },
    crossMarginSummary: {
      accountValue: '1000000',
      totalNtlPos: '288.88',
      totalRawUsd: '288.88',
      totalMarginUsed: '14.44',
    },
    crossMaintenanceMarginUsed: '7.22',
    withdrawable: '985556',
    assetPositions: [
      {
        type: 'oneWay',
        position: {
          coin: 'BTC',
          szi: '0.00292',
          leverage: {
            type: 'cross',
            value: 20,
          },
          entryPx: '92361',
          positionValue: '288.88',
          unrealizedPnl: '519.18',
          returnOnEquity: '142.3',
          liquidationPx: '24942',
          marginUsed: '14.44',
          maxLeverage: 100,
          cumFunding: {
            allTime: '-2.32',
            sinceOpen: '-2.32',
            sinceChange: '-2.32',
          },
        },
      },
    ],
    time: Date.now(),
  };
*/
export default function TradingTable({
  summaryData,
}: {
  summaryData: SummaryData;
}) {
  return (
    <div className="w-full rounded-lg  bg-gray-900 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead className="border-b border-solid border-color-light ">
          <tr>
            <th className="p-4 text-left text-sm font-medium text-gray-400">
              <div className="flex items-center gap-2">
                Coin
                {/* <ArrowUpDown className="h-4 w-4" /> */}
              </div>
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-400">
              Size
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-400">
              Position Value
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-400">
              Entry Price
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-400">
              Mark Price
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-400">
              PNL (ROE %)
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-400">
              Liq. Price
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-400">
              Margin
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-400">
              Funding
            </th>
            <th className="p-4 text-left text-sm font-medium text-gray-400">
              TP/SL
            </th>
            <th className="p-4 text-right text-sm font-medium text-gray-400">
              <div className="flex items-center justify-end gap-4">
                <button className="text-teal-500 hover:text-teal-400">
                  Close All
                </button>
                {/* <Settings className="h-4 w-4 text-gray-400" /> */}
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {summaryData.assetPositions.map((assetPosition, index) => (
            <tr key={index} className="">
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-200">
                    {assetPosition.position.coin}
                  </span>
                  <span className="rounded bg-gray-800 px-1 py-0.5 text-xs text-gray-400">
                    {assetPosition.position.leverage.value}x
                  </span>
                </div>
              </td>
              <td className="p-4">
                <span className="text-teal-500">
                  {assetPosition.position.szi} {assetPosition.position.coin}
                </span>
              </td>
              <td className="p-4">
                <span className="text-gray-200">
                  ${parseFloat(assetPosition.position.positionValue).toFixed(2)}
                </span>
              </td>
              <td className="p-4">
                <span className="text-gray-200">
                  {parseFloat(assetPosition.position.entryPx).toLocaleString()}
                </span>
              </td>
              <td className="p-4">
                <span className="text-gray-200">98,930</span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-teal-500">
                    +${assetPosition.position.unrealizedPnl}
                  </span>
                  <span className="text-teal-500">
                    (+{assetPosition.position.returnOnEquity}%)
                  </span>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </td>
              <td className="p-4">
                <span className="text-gray-200">
                  {parseFloat(
                    assetPosition.position.liquidationPx
                  ).toLocaleString()}
                </span>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-gray-200">
                    ${assetPosition.position.marginUsed}
                  </span>
                  <span className="text-gray-400">
                    ({assetPosition.position.leverage.type})
                  </span>
                </div>
              </td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <span className="text-red-500">
                    {assetPosition.position.cumFunding.sinceOpen}
                  </span>
                </div>
              </td>
              <td className="p-4">--/--</td>
              <td className="p-4">
                <div className="flex items-center justify-end gap-2">
                  <button className="rounded bg-gray-800 px-2 py-1 text-sm text-gray-200 hover:bg-gray-700">
                    Limit
                  </button>
                  <button className="rounded bg-gray-800 px-2 py-1 text-sm text-gray-200 hover:bg-gray-700">
                    Market
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
