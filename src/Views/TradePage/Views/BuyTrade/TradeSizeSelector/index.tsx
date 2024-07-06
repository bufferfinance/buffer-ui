import { toFixed } from '@Utils/NumString';
import {
  add,
  divide,
  gt,
  gte,
  multiply,
  subtract,
} from '@Utils/NumString/stringArithmatics';
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
import { useReadContract } from 'wagmi';
import { useOneCTWallet } from '@Views/OneCT/useOneCTWallet';

const TradeSizeSelectorBackground = styled.div`
  margin-top: 15px;
  width: 100%;
`;

export const TradeSizeSelector: React.FC<{
  onSubmit?: any;
  payout?: any;
}> = ({ onSubmit, payout }) => {
  const { switchPool, poolDetails } = useSwitchPool();
  const readcallData = useAtomValue(buyTradeDataAtom);
  const { registeredOneCT } = useOneCTWallet();
  const tradeSize = useAtomValue(tradeSizeAtom);

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
            payout={payout}
            platfromFee={platformFee}
            tradeToken={tradeToken}
            balance={balance}
            tradeSize={tradeSize}
          />
        )}
      </ColumnGap>
    </TradeSizeSelectorBackground>
  );
};

export const PlatfromFeeError = ({
  platfromFee,
  tradeToken,
  balance,
  tradeSize,
  payout,
}: {
  platfromFee: string;
  tradeToken: string;
  balance: string;
  tradeSize: string;
  payout: any;
}) => {
  console.log('payout', payout);
  if (payout == undefined || payout == null) return null;
  const jackpotValue = useJackpotInfo();
  const denominator = divide(multiply(payout, '2'), 2);
  let jackpotEligibilityValue =
    jackpotValue?.minSizes?.[tradeToken]?.toString() ?? '100';
  jackpotEligibilityValue = divide(jackpotEligibilityValue, denominator);
  console.log(`index-jackpotEligibilityValue: `, jackpotEligibilityValue);
  const jackpotEligible = gte(tradeSize || '0', jackpotEligibilityValue || '1');
  const notEnoughForTrade = gt(tradeSize || '0', balance);
  const notEnooghForFee = gt(add(tradeSize || '0', platfromFee), balance);
  const isError = notEnooghForFee;

  const JackpotChip = tradeSize ? (
    <div className="ml-auto flex items-center gap-1">
      {jackpotEligible ? (
        <>
          <LightToolTipSVG className="mt-[2px]" />
          Eligible for{' '}
          <Link to="/Jackpot" className="hover:underline hover:cursor-pointer">
            Jackpot
          </Link>{' '}
          💰{' '}
        </>
      ) : (
        <>
          <LightToolTipSVG className="mt-[2px]" />
          Add {Math.ceil(
            +subtract(jackpotEligibilityValue, tradeSize || '0')
          )}{' '}
          for
          <Link to="/Jackpot" className="hover:underline hover:cursor-pointer">
            Jackpot
          </Link>{' '}
          💰{' '}
        </>
      )}
    </div>
  ) : null;
  if (notEnooghForFee && notEnoughForTrade) return <></>;
  console.log(
    `index-notEnooghForFee && notEnoughForTrade: `,
    notEnooghForFee && notEnoughForTrade
  );
  return (
    <RowGapItemsTop
      gap="2px"
      className={`text-${isError ? 'red' : '[#7F87A7]'} text-f10`}
    >
      {isError ? (
        <>
          <div className="flex items-center gap-2">
            Insufficient funds for platform fee.{' '}
            <BuyUSDCLink token={tradeToken as 'ARB'} />
          </div>
        </>
      ) : (
        !isError && (
          <div className="flex flex-col">
            <span className="flex gap-1">
              <LightToolTipSVG className="mt-[2px]" />
              Platform fee : + {platfromFee} {tradeToken}
            </span>
            <span>{JackpotChip}</span>
          </div>
        )
      )}
    </RowGapItemsTop>
  );
};

export const PlatfromFeeErrorOld = ({
  platfromFee,
  tradeToken,
  balance,
  tradeSize,
}: {
  platfromFee: string;
  tradeToken: string;
  balance: string;
  tradeSize: string;
}) => {
  const jackpotValue = useJackpotInfo();
  const jackpotEligibilityValue =
    jackpotValue?.minSizes?.[tradeToken]?.toString() ?? '100';
  const jackpotEligible = gte(tradeSize || '0', jackpotEligibilityValue || '1');
  const notEnoughForTrade = gt(tradeSize || '0', balance);
  const notEnooghForFee = gt(add(tradeSize || '0', platfromFee), balance);
  const isError = notEnooghForFee;
  const JackpotChip = null;
  if (notEnooghForFee && notEnoughForTrade) return <></>;
  console.log(
    `index-notEnooghForFee && notEnoughForTrade: `,
    notEnooghForFee && notEnoughForTrade
  );
  return (
    <RowGapItemsTop
      gap="2px"
      className={`text-${isError ? 'red' : '[#7F87A7]'} text-f10`}
    >
      {isError ? (
        <>
          <div className="flex items-center gap-2">
            Insufficient funds for platform fee.{' '}
            <BuyUSDCLink token={tradeToken as 'ARB'} />
          </div>
        </>
      ) : (
        !isError && (
          <div className="flex flex-col">
            <span className="flex gap-1">
              <LightToolTipSVG className="mt-[2px]" />
              Platform fee : + {platfromFee} {tradeToken}
            </span>
            <span>{JackpotChip}</span>
          </div>
        )
      )}
    </RowGapItemsTop>
  );
};
