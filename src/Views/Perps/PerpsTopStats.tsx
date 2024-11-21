import { OneDayChange } from '@Views/AboveBelow/Components/StatusBar/MarketData/OneDayChange';
import { Display } from '@Views/Common/Tooltips/Display';
import { CurrentPrice } from '@Views/TradePage/Views/BuyTrade/CurrentPrice';
import { MarketSelectorDD } from '@Views/TradePage/Views/MarketChart/MarketSelectorDD';
import { MarketStatsBar } from '@Views/TradePage/Views/MarketChart/MarketStatsBar';
import { AssetSelectorDD } from '@Views/TradePage/Views/Markets/AssetSelectorDD';

export const PerpsTopStats = ({ isMobile }: { isMobile?: boolean }) => {
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
    <div className="flex gap-[30px]">
      <MarketSelectorDD token0={'BTC'} token1={'USD'} />
      {/* <CurrentPrice /> */}
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
