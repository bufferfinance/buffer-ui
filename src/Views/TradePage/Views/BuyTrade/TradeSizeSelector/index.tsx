import { toFixed } from '@Utils/NumString';
import {
  add,
  divide,
  gt,
  gte,
  subtract,
} from '@Utils/NumString/stringArithmatics';
import { useOneCTWallet } from '@Views/OneCT/useOneCTWallet';
import { ColumnGap } from '@Views/TradePage/Components/Column';
import { LightToolTipSVG } from '@Views/TradePage/Components/LightToolTipSVG';
import {
  RowBetween,
  RowGap,
  RowGapItemsStretched,
  RowGapItemsTop,
} from '@Views/TradePage/Components/Row';
import { BuyTradeHeadText } from '@Views/TradePage/Components/TextWrapper';
import { buyTradeDataAtom } from '@Views/TradePage/Hooks/useBuyTradeData';
import { useSwitchPool } from '@Views/TradePage/Hooks/useSwitchPool';
import { tradeSizeAtom } from '@Views/TradePage/atoms';
import styled from '@emotion/styled';
import { useAtomValue } from 'jotai';
import { BuyUSDCLink } from '../BuyUsdcLink';
import { PoolDropdown } from './PoolDropdown';
import { TradeSizeInput } from './TradeSizeInput';
import { WalletBalance, formatBalance } from './WalletBalance';
import { useJackpotInfo } from '@Views/Jackpot/useJackpotInfo';
import { Link } from 'react-router-dom';

const TradeSizeSelectorBackground = styled.div`
  margin-top: 15px;
  width: 100%;
`;

export const TradeSizeSelector: React.FC<{
  onSubmit?: any;
}> = ({ onSubmit }) => {
  const { switchPool, poolDetails } = useSwitchPool();
  const readcallData = useAtomValue(buyTradeDataAtom);
  const { registeredOneCT } = useOneCTWallet();

  console.log(`index-switchPool: `, switchPool, readcallData, poolDetails);
  if (!poolDetails || !readcallData || !switchPool) return <></>;

  const decimals = poolDetails.decimals;
  const balance = divide(readcallData.balance ?? 0, decimals) as string;
  const tradeToken = poolDetails.token;
  const minFee = divide(switchPool.min_fee || '0', decimals) as string;
  const maxFee = divide(
    readcallData.maxTradeSizes[switchPool.optionContract] ?? '0',
    decimals
  ) as string;
  const platformFee = divide(switchPool.platformFee, decimals) as string;
  const maxTradeSize = maxFee;
  console.log(`index-maxTradeSize: `, maxTradeSize);
  return (
    <TradeSizeSelectorBackground>
      <ColumnGap gap="7px" className="w-full">
        <RowBetween>
          <RowGap gap="4px">
            <BuyTradeHeadText>Trade Size</BuyTradeHeadText>
          </RowGap>

          <WalletBalance
            balance={formatBalance(toFixed(balance, 2))}
            unit={tradeToken}
          />
        </RowBetween>
        <RowGapItemsStretched gap="0px" className="w-full">
          <TradeSizeInput
            maxTradeSize={maxTradeSize}
            registeredOneCT={!!registeredOneCT}
            tokenName={tradeToken}
            balance={balance}
            platformFee={platformFee}
            minTradeSize={minFee}
            onSubmit={onSubmit}
          />

          <PoolDropdown />
        </RowGapItemsStretched>
        {registeredOneCT && (
          <PlatfromFeeError
            platfromFee={platformFee}
            tradeToken={tradeToken}
            balance={balance}
          />
        )}
      </ColumnGap>
    </TradeSizeSelectorBackground>
  );
};

const PlatfromFeeError = ({
  platfromFee,
  tradeToken,
  balance,
}: {
  platfromFee: string;
  tradeToken: string;
  balance: string;
}) => {
  const jackpotValue = useJackpotInfo();
  console.log(`index-jackpotValue: `, jackpotValue);
  const tradeSize = useAtomValue(tradeSizeAtom);
  const jackpotEligible =
    tradeToken == 'ARB' &&
    gte(tradeSize || '0', jackpotValue?.minSize?.toString() || '1');
  const notEnoughForTrade = gt(tradeSize || '0', balance);
  const notEnooghForFee = gt(add(tradeSize || '0', platfromFee), balance);
  const isError = notEnooghForFee;
  if (notEnooghForFee && notEnoughForTrade) return <></>;
  return (
    <RowGapItemsTop
      gap="2px"
      className={`text-${isError ? 'red' : '[#7F87A7]'} text-f10`}
    >
      <LightToolTipSVG className="mt-[2px]" />
      {isError ? (
        <>
          Insufficient funds for platform fee.{' '}
          <BuyUSDCLink token={tradeToken as 'ARB'} />
        </>
      ) : (
        !isError && (
          <>
            Platform fee : + {platfromFee} {tradeToken}
          </>
        )
      )}
      <div className="ml-auto flex items-center gap-1">
        {jackpotEligible ? (
          <>
            <LightToolTipSVG className="mt-[2px]" />
            Eligible for{' '}
            <Link
              to="/Jackpot"
              className="hover:underline hover:cursor-pointer"
            >
              <a>Jackpot</a>
            </Link>{' '}
            💰{' '}
          </>
        ) : (
          <>
            <LightToolTipSVG className="mt-[2px]" />
            Add{' '}
            {(+subtract(
              jackpotValue?.minSize?.toString(),
              tradeSize || '0'
            )).toFixed(2)}{' '}
            for
            <Link
              to="/Jackpot"
              className="hover:underline hover:cursor-pointer"
            >
              <a>Jackpot</a>
            </Link>{' '}
            💰{' '}
          </>
        )}
      </div>
    </RowGapItemsTop>
  );
};
