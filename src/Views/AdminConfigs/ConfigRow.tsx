import { useWriteCall } from '@Hooks/useWriteCall';
import { divide } from '@Utils/NumString/stringArithmatics';
import BufferCheckbox from '@Views/Common/BufferCheckbox';
import { generateTransactionData } from '@Views/Safe/SafeApp';
import { ResetSVG } from '@Views/TradePage/Components/ResetSVG';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { safeTxnsAtom } from './AdminConfig';
import { Config, group2abi } from './helpers';

const ConfigRow: React.FC<any> = ({
  config,
  data,
  hideString,
}: {
  config: Config;
  data: any;
  hideString: string;
}) => {
  const [value, setValue] = useState(
    data?.[config.contract + config.getter?.name]?.[0]
  );
  // console.log(`ConfigRow-value: `, value);
  const [showIp, setShowIp] = useState(false);
  const { writeCall } = useWriteCall(config.contract, group2abi[config.group]);
  const text = config.getter?.name;
  const result = text.replace(/([A-Z])/g, ' $1');
  const finalResult = result.charAt(0).toUpperCase() + result.slice(1) + ' :';
  const isChanged = data?.[config.contract + config.getter?.name]?.[0] != value;
  const [safeTxnBatch, editSafeTxnsBatch] = useAtom(safeTxnsAtom);
  console.log(`ConfigRow-safeTxnBatch: `, safeTxnBatch);
  const isInBatch = safeTxnBatch.find(
    (a) => a.id == config.contract + config.setter.name
  );
  console.log(`ConfigRow-isInBatche-p: `, isInBatch);

  useEffect(() => {
    console.log(`ConfigRow-isInBatche: `, isInBatch);

    if (isInBatch) {
      setShowIp(true);
      setTimeout(() => {
        setValue((v) => isInBatch.prevvalue);
      });
      console.log(`ConfigRow-isInBatch.prevvalue: `, isInBatch.prevvalue);
    }
  }, []);
  function addToBatch() {
    console.log('to-add', value);
    let valueArr = [value];
    if (config.getter.op?.[0].type.includes(['['])) {
      console.log('to-add-array');
      valueArr = [value.split(',')];
    }
    if (config.setter.ip.length == 0) {
      valueArr = [];
    }
    const txnData = generateTransactionData(
      config.contract,
      group2abi[config.group],
      config.setter.name,
      valueArr
    );
    editSafeTxnsBatch((a) => [
      ...a,
      {
        setter: config.setter.name,
        prevvalue: value,
        id: config.contract + config.setter.name,
        to: config.contract,
        value: '0',
        data: txnData,
      },
    ]);
  }

  function removeFromBatch() {
    editSafeTxnsBatch((a) =>
      a.filter((b) => b.id != config.contract + config.setter.name)
    );
  }

  const reset = () => {
    setShowIp(false);
    let initialData = data?.[config.contract + config.getter?.name];
    if (config.getter.op?.[0].type.includes(['['])) {
      initialData = data?.[config.contract + config.getter?.name].join(',');
    }
    setValue(initialData);
  };
  const actualValue = data?.[config.contract + config.getter?.name]?.[0];
  let hint = config?.hint ? `(${config.hint})` : '';
  const poolString = config.pool
    ? config.pool.token + ' ' + (config.pool.is_pol ? 'POL' : '')
    : '';
  let dec = config.decimal ? `${poolString}(${config.decimal} dec)` : '';
  const isCurrentConfigSearched = () => {
    const str = `${
      config.market ? config.market.pair + ' ' + config.market.tv_id : ''
    } ${finalResult} ${config.getter.name} ${
      config.setter.name
    } ${hint} ${dec} ${poolString}`;
    return str.toLowerCase().includes(hideString.toLowerCase());
  };
  const renderValue = () => {
    // single value but in wei
    if (config.decimal) {
      return divide(actualValue, config.decimal);
    }
    // bool
    if (config.getter.op?.[0].type == 'bool') {
      return actualValue ? 'true' : 'false';
    }
    // array
    if (config.getter.op?.[0].type.includes(['['])) {
      return actualValue.join(',');
    }
    // non decimal value
    return actualValue;
  };
  useEffect(() => {
    setValue(actualValue);
  }, [actualValue]);
  const changeConfig = (value: any) => {
    writeCall(
      (a) => {
        a && reset();
      },
      config.setter.name,
      value,
      null,
      null,
      null
    );
  };
  let editButton = (
    <button
      onClick={() => {
        setShowIp(true);
      }}
      type="button"
    >
      Edit
    </button>
  );
  if (config.setter.ip.length == 0) {
    // in cases of toggle
    editButton = (
      <div className="flex items-center">
        <button
          onClick={() => {
            changeConfig([]);
          }}
          type="button"
        >
          Edit
        </button>
        {
          <>
            <BufferCheckbox
              className="scale-50"
              checked={isInBatch ? true : false}
              onCheckChange={() => {
                console.log(isInBatch);
                if (isInBatch) {
                  removeFromBatch();
                } else {
                  addToBatch();
                }
              }}
            />
            &nbsp;Batch&nbsp;
          </>
        }
      </div>
    );
  }
  useEffect(() => {
    if (isInBatch && isInBatch.prevvalue != value) {
      removeFromBatch();
    }
  }, [value]);
  return (
    <div
      className={`flex items-center text-f14 bg-2 rounded-[5px] p-2  w-full px-4 py-2 ${
        hideString && (isCurrentConfigSearched() ? '' : 'hidden')
      }`}
    >
      <form
        className="flex gap-x-4 items-center"
        onSubmit={(e) => {
          e.preventDefault();
          // single value
          let val = [value];
          console.log(`ConfigRow-value: `, value);

          // array
          if (value.includes(',')) {
            val = [value.split(',')];
          }
          changeConfig(val);
        }}
      >
        <div className=" whitespace-nowrap">
          {[finalResult, config?.market?.pair, hint, dec, poolString].join(' ')}
        </div>
        <div
          className={
            isChanged ? 'line-through decoration-[red] decoration-[2px]' : ''
          }
        >
          {renderValue()}
        </div>
        {isChanged ? (
          <div>
            <button type="submit">Change</button>
          </div>
        ) : (
          editButton
        )}
        {showIp && (
          <>
            <input
              className="bg-2 whitespace-nowrap w-full"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
              }}
            />
            <button onClick={reset}>
              <ResetSVG />
            </button>
          </>
        )}
      </form>
      {!isChanged ? (
        <></>
      ) : (
        <>
          {' '}
          <BufferCheckbox
            className="scale-50"
            checked={isInBatch ? true : false}
            onCheckChange={() => {
              console.log(isInBatch);
              if (isInBatch) {
                removeFromBatch();
              } else {
                addToBatch();
              }
            }}
          />
          &nbsp;Batch&nbsp;
        </>
      )}
    </div>
  );
};

export { ConfigRow };
