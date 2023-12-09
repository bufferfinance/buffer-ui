import { toFixed } from '@Utils/NumString';
import { lt } from '@Utils/NumString/stringArithmatics';
import { numberWithCommas } from '@Utils/display';
import Big from 'big.js';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import NumberTooltip from '..';
interface IDisplayProp {
  data: string | number | null | undefined;
  unit?: string;
  className?: string;
  precision?: number;
  disable?: boolean;
  label?: React.ReactChild;
  content?: ReactNode;
  placement?: 'top' | 'bottom';
  colored?: boolean;
}

export const underLineClass =
  'underline underline-offset-4 decoration decoration-[#ffffff30]  w-fit';

const stringify = (num: string | number) => {
  if (typeof num == 'number') {
    num = num.toString();
  }
  return num as string;
};
export const Display: React.FC<IDisplayProp> = ({
  colored,
  data,
  unit,
  label,
  disable,
  placement,
  className,
  content,
  precision = 2,
}) => {
  try {
    const prev = useRef<string | number>();
    if (data == null || data == undefined || data == '') {
      data = '0';
    }
    // 3 4 5 4
    // d

    const [color, setColor] = useState('green');

    useEffect(() => {
      if (prev.current && data) {
        if (lt(stringify(data), stringify(prev.current))) {
          setColor('red');
        } else setColor('green');
      }
      return () => {
        prev.current = data;
      };
    }, [data]);
    if (typeof data === 'number') data = data.toString();

    const oneBN = new Big('1.0');
    const zeroBN = new Big('0.0');
    const tenThousandBN = new Big('1000');
    const dataBN = new Big('' + data);
    const isDataSmallerThan1 = dataBN.lt(oneBN);
    const isDataSmallerThan0 = dataBN.lt(zeroBN);
    const isDataGreaterThan10000 = dataBN.gt(tenThousandBN);
    let displayData = '';
    if (isDataGreaterThan10000) {
      displayData = numberWithCommas(toFixed(data, precision));
    }
    let isDecimal = false;
    const arr = data.split('.');
    if (arr.length > 1 && arr[1].length > precision) {
      isDecimal = true;
    }

    className = content ? className + ' ' + underLineClass : className;
    let tooltipContent: ReactNode = (
      <span>
        {(data ? numberWithCommas(toFixed(data, 6)) : '0') +
          (unit ? ' ' + unit : '')}
      </span>
    );
    if (content) {
      tooltipContent = <div className="px-4 py-2">{content}</div>;
    }
    if (disable) {
      tooltipContent = <span></span>;
    }
    const Unit = unit ? <span>&nbsp;{unit}</span> : <span></span>;
    const generatedStyles = `flex mono content-center ${colored ? color : ''} ${
      className || ''
    }`;
    const DefaultExport = (
      <NumberTooltip content={tooltipContent} placement={placement}>
        <div className={generatedStyles}>
          {label ? <span>{label}</span> : <span></span>}
          {data ? (
            <span>{numberWithCommas(toFixed(data, precision))}</span>
          ) : (
            <span></span>
          )}
          <span>{Unit}</span>
        </div>
      </NumberTooltip>
    );
    if (content) {
      return DefaultExport;
    }

    if (isDataSmallerThan1) {
      // data is in 0.000something but positive
      if (isDataSmallerThan0) {
        // if data is negative
        // if (data.length > 5) {
        // -0.0001 + more digits
        return (
          <NumberTooltip content={tooltipContent} placement={placement}>
            <div className={generatedStyles}>
              {label ? <span>{label}</span> : <span></span>}
              {data ? (
                <span>{numberWithCommas(toFixed(data, precision))}</span>
              ) : (
                <span></span>
              )}
              <span>{Unit}</span>
            </div>
          </NumberTooltip>
        );
      }
    }
    return DefaultExport;
  } catch (e) {
    console.log(e, 'this si the error');
    return <div className="text-[blue]">{data}</div>;
  }
};
