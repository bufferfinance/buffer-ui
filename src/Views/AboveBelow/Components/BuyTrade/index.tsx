import { BuyTradeBackground } from '@Views/TradePage/Views/BuyTrade/index';
import { Buy } from './BuyButton';
import { ExpiryDate } from './ExpiryDate';
import { PayoutProfit } from './PayoutProfit';
import { TradeSize } from './TradeSize';

export const BuyTrade: React.FC<{ isMobile: boolean }> = ({ isMobile }) => {
  return (
    <BuyTradeBackground>
      <ExpiryDate isMobile={isMobile} />
      {/* <PriceFormat /> */}
      {/* <PriceTable isMobile={isMobile} /> */}
      {/* <SelectedTradeData /> */}
      <TradeSize />
      <PayoutProfit />
      <Buy />
    </BuyTradeBackground>
  );
};
