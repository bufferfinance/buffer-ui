import BufferInput from '@Views/Common/BufferInput';
import { PoolDropdown } from '@Views/TradePage/Views/BuyTrade/TradeSizeSelector/PoolDropdown';
import { TradeSizeInput } from '@Views/TradePage/Views/BuyTrade/TradeSizeSelector/TradeSizeInput';
import LeverageSlider from './LeverageSlider';
import { ReactNode } from 'react';
import { TableAligner } from '@Views/V2-Leaderboard/Components/TableAligner';
import TPSLInput from './TPSLInputs';
import BufferCheckbox from '@Views/Common/BufferCheckbox';
import { BufferButton, GreenBtn } from '@Views/Common/V2-Button';
import UpIcon from '@SVG/Elements/UpIcon';
import DownIcon from '@SVG/Elements/DownIcon';
const Label: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="mt-[8px] text-f11 ">{children}</div>;
};
export const PerpsBuyingWindow = () => {
  const viewButtons = ['Isolated', '3x', 'One-Way'];
  return (
    <div className="h-full p-[10px]">
      <div className="w-[302px] justify-between gap-[8px] flex ">
        {viewButtons.map((s) => (
          <button className="px-[8px] py-[2px]  w-full rounded-md bg-grey text-f13 ">
            {s}
          </button>
        ))}
      </div>
      <TableAligner
        className="mt-2"
        // valueStyle={valueClasses}
        keyStyle="!text-f12 !text-slate-500 !text-left !px-0 !py-[1px]"
        valueStyle="!text-f12 !text-white !text-right !px-0 !py-[1px]"
        keysName={['Available to trade', 'current Position']}
        values={['222', '333']}
      ></TableAligner>{' '}
      <Label>Enter the size:</Label>
      <div className="flex ">
        <TradeSizeInput
          maxTradeSize="222"
          registeredOneCT={true}
          tokenName={'USDC'}
          balance="2222"
          platformFee="2222"
          minTradeSize="1"
          onSubmit={() => {}}
        />
        <PoolDropdown />
      </div>
      <BufferCheckbox checked={true} onCheckChange={() => {}}>
        Reduce Only
      </BufferCheckbox>
      <BufferCheckbox checked={true} onCheckChange={() => {}}>
        Take Profit / Stop Loss
      </BufferCheckbox>
      <Label>Adjust the leverage:</Label>
      <LeverageSlider />
      <TPSLInput className="my-[5px]" />
      <div className="flex gap-[5px] mt-[4px] ">
        <BufferButton
          className="group relative mb-3 text-1 bg-green"
          onClick={console.log}
        >
          <UpIcon className="mr-[6px] scale-150" />
          Buy
        </BufferButton>
        <BufferButton
          className="group relative mb-3 text-1 bg-red"
          onClick={console.log}
        >
          <DownIcon className="mr-[6px] scale-150" />
          Sell
        </BufferButton>
      </div>
      <TableAligner
        className="mt-2"
        // valueStyle={valueClasses}
        keyStyle="!text-f12 !text-slate-500 !text-left !px-0 !py-[1px]"
        valueStyle="!text-f12 !text-white !text-right !px-0 !py-[1px]"
        keysName={[
          'Liquidation Price',
          'Order Value',
          'Margin Required',
          'Slippage',
          'fees',
        ]}
        values={['222', '333', '333', '333', '333']}
      ></TableAligner>{' '}
      <div className="flex flex-col gap-2 mt-3">
        <button className="w-full py-2  h-12 rounded-lg border border-[#26B893] bg-transparent text-[#26B893] hover:bg-[#26B893]/10 transition-colors duration-200 ease-in-out font-semibold text-base focus:outline-none focus:ring-2 focus:ring-[#26B893] focus:ring-opacity-50">
          Deposit
        </button>{' '}
        <button className="w-full py-2  h-12 rounded-lg border border-[#26B893] bg-transparent text-[#26B893] hover:bg-[#26B893]/10 transition-colors duration-200 ease-in-out font-semibold text-base focus:outline-none focus:ring-2 focus:ring-[#26B893] focus:ring-opacity-50">
          Withdraw
        </button>
      </div>{' '}
      <div className="flex flex-col gap-2 mt-3">
        Account Equity
        <TableAligner
          className=""
          // valueStyle={valueClasses}
          keyStyle="!text-f12 !text-slate-500 !text-left !px-0 !py-[1px]"
          valueStyle="!text-f12 !text-white !text-right !px-0 !py-[1px]"
          keysName={['Liquidation Price', 'Order Value', 'Margin Required']}
          values={['222', '333', '333']}
        ></TableAligner>{' '}
      </div>{' '}
      <div className="flex flex-col gap-2 mt-3">
        Perps Overview
        <TableAligner
          className="mt-2"
          // valueStyle={valueClasses}
          keyStyle="!text-f12 !text-slate-500 !text-left !px-0 !py-[1px]"
          valueStyle="!text-f12 !text-white !text-right !px-0 !py-[1px]"
          keysName={[
            'Liquidation Price',
            'Order Value',
            'Margin Required',
            'Slippage',
            'fees',
          ]}
          values={['222', '333', '333', '333', '333']}
        ></TableAligner>{' '}
      </div>{' '}
    </div>
  );
};
