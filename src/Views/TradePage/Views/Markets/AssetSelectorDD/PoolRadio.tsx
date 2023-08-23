import { RowGap } from '@Views/TradePage/Components/Row';
import { RadioTextHead } from '@Views/TradePage/Components/TextWrapper';
import { useActivePoolObject } from '@Views/TradePage/Hooks/useActivePoolObject';
import { radioValueAtom } from '@Views/TradePage/atoms';
import { Trans } from '@lingui/macro';
import { useAtom } from 'jotai';

export const PoolRadio: React.FC = () => {
  const { poolNameList: tradingAssets } = useActivePoolObject();
  const [selectedAsset, setSelectedAsset] = useAtom(radioValueAtom);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSelectedAsset(event.target.value);
  }

  return (
    <RowGap gap="8px" className="ml-auto">
      <RadioTextHead>
        <Trans>Trading Asset</Trans>
      </RadioTextHead>

      {tradingAssets?.map((asset, index) => {
        const isActive = selectedAsset === asset;
        return (
          <RowGap gap="4px" key={asset}>
            <input
              type="radio"
              id="poolRadio"
              className="bg-transperent"
              name="age"
              value={asset}
              checked={isActive}
              onChange={handleChange}
            />
            <label
              htmlFor="poolRadio"
              className={`text-f12 ${isActive ? 'text-1' : 'text-2'}`}
            >
              {' '}
              {asset}
            </label>
          </RowGap>
        );
      })}
    </RowGap>
  );
};
