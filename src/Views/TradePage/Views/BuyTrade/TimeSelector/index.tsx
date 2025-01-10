import { BuyTradeHeadText } from '@Views/TradePage/Components/TextWrapper';
import { TimePicker } from './TimePicker';
import { ColumnGap } from '@Views/TradePage/Components/Column';
import { useAtomValue, useSetAtom } from 'jotai';
import { setTimeSelectorAtom, timeSelectorAtom } from '@Views/TradePage/atoms';
import { Trans } from '@lingui/macro';
import { useSwitchPool } from '@Views/TradePage/Hooks/useSwitchPool';

export const TimeSelector: React.FC<{
  className?: string;
}> = ({ className = '' }) => {
  const currentTime = useAtomValue(timeSelectorAtom);
  const setCurrentTime = useSetAtom(setTimeSelectorAtom);
  const { switchPool } = useSwitchPool();

  if (!switchPool) return <></>;
  console.log('TimeSswitchPool?.min_durationelector', switchPool?.min_duration);
  return (
    <ColumnGap gap={`${className} 7px`}>
      <BuyTradeHeadText>
        <Trans>Time</Trans>
      </BuyTradeHeadText>

      <TimePicker
        currentTime={currentTime.HHMM}
        max_duration={switchPool?.max_duration}
        min_duration={'00:03'}
        setCurrentTime={setCurrentTime}
      />
    </ColumnGap>
  );
};
