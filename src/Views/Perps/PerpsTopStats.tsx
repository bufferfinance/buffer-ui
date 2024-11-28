import { priceAtom } from '@Hooks/usePrice';
import { getLastbar } from '@TV/useDataFeed';
import { toFixed } from '@Utils/NumString';
import { OneDayChange } from '@Views/AboveBelow/Components/StatusBar/MarketData/OneDayChange';
import { Display } from '@Views/Common/Tooltips/Display';
import { marketsForChart } from '@Views/TradePage/config';
import { useActiveMarket } from '@Views/TradePage/Hooks/useActiveMarket';
import { CurrentPrice } from '@Views/TradePage/Views/BuyTrade/CurrentPrice';
import { MarketSelectorDD } from '@Views/TradePage/Views/MarketChart/MarketSelectorDD';
import { MarketStatsBar } from '@Views/TradePage/Views/MarketChart/MarketStatsBar';
import { AssetSelectorDD } from '@Views/TradePage/Views/Markets/AssetSelectorDD';
import { useAtomValue } from 'jotai';
import { round } from 'lodash';
import { joinStrings } from '@Views/TradePage/utils';
import { BuyTradeDescText } from '@Views/TradePage/Components/TextWrapper';

export const PerpsTopStats = ({ isMobile }: { isMobile?: boolean }) => {
  const marketPrice = useAtomValue(priceAtom);

  const { activeMarket } = useActiveMarket();
  if (!activeMarket) return null;
  const price =
    getLastbar(marketPrice, {
      tv_id: activeMarket.tv_id,
    })?.price ?? '0';
  const chartMarket =
    marketsForChart[
      joinStrings(
        activeMarket?.token0 ?? '',
        activeMarket?.token1 ?? '',
        ''
      ) as keyof typeof marketsForChart
    ];
  if (!chartMarket) return null;
  const precision = chartMarket.price_precision.toString().length - 1;
  const precisePrice = toFixed(
    price,
    chartMarket.price_precision.toString().length - 1
  );
  const data = [
    {
      header: 'Mark',
      data: <Display data={'222.2'} />,
    },
    {
      header: 'Oracle',
      data: <Display data={'222.2'} />,
    },
    {
      header: '24 hr change',
      data: <Display data={'222.2'} />,
    },
    {
      header: 'Open Intrest',
      data: <Display data={'222.2'} />,
    },
    {
      header: 'Funding / Countdown',
      data: <Display data={'222.2'} />,
    },
  ];

  return (
    <div className="flex gap-[30px] px-[15px] py-[10px]">
      <MarketSelectorDD token0={'BTC'} token1={'USD'} disabled />
      <BuyTradeDescText className="flex justify-center items-center">
        <Display
          data={round(price, precision)}
          precision={precision}
          className="!py-[1px]"
        />{' '}
      </BuyTradeDescText>
      {data.map((d, id) => {
        // dont show 24h change in separate section, show it below price
        if (isMobile && !id) return null;
        if (isMobile && id == 2) return null;
        return (
          <div
            key={id}
            className={`flex  flex-col justify-center items-start gap-y-1 ${
              id == 3 ? 'b1200:items-end' : ''
            }
        b1200:w-1/2
        
        ${id == 1 ? 'special-border-b' : ''}`}
          >
            <span className="text-f12 b1200:text-f10 text-[#82828F]">
              {d.header}
            </span>
            <span className="text-f12 w-fit b1200:text-f10">{d.data}</span>
          </div>
        );
      })}
    </div>
  );
};
