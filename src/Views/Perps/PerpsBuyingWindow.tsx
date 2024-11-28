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
import { usePerpsHoldings } from './Hooks/usePerpsData';
import { handleNAandL } from '@Utils/isLoading';
import { Skeleton } from '@mui/material';
import { toFixed } from '@Utils/NumString/stringArithmatics';
import {
  isAgenetExists,
  useDepositModalState,
  useUserAgentStore,
} from './state';
import { AgentApproveResponse, PerpsAction } from './Perps.types';
import {
  getRSVfromAgentApproveAction,
  getRSVfromPerpsAction,
} from './Utils/Signs';
import { perpsClient } from './Utils/PerpsConfig';
import { useAccount, useSignTypedData } from 'wagmi';
import { NOACCOUNT } from '@/Errors';
import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts';
import React from 'react';
import { useCurrentPrice } from '@Views/TradePage/Hooks/useCurrentPrice';
const Label: React.FC<{ children: ReactNode }> = ({ children }) => {
  return <div className="mt-[8px] text-f11 ">{children}</div>;
};
export const PerpsBuyingWindow = React.memo(() => {
  const viewButtons = ['Isolated', '3x', 'One-Way'];
  const openDepositModal = useDepositModalState((state) => state.open);
  const userAccount = useAccount();
  const userAgent = useUserAgentStore((state) => state.state);
  const addAgentInState = useUserAgentStore((state) => state.addAgent);
  const data = usePerpsHoldings();
  const { currentPrice, precision: marketPrecision } = useCurrentPrice({
    token0: 'BTC',
    token1: 'USD',
  });
  const signerManager = useSignTypedData();
  function getPerpsOrderAction(isBuy: boolean): PerpsAction {
    const cp = toFixed(currentPrice.toString(), 1);
    const getAssetIndex = () => 0;
    const getCurrentPrice = () => '95460.0';
    const getPerpsSize = () => '0.00051';
    return {
      grouping: 'na',
      type: 'order',
      orders: [
        {
          a: getAssetIndex(),
          p: getCurrentPrice(),
          s: getPerpsSize(),
          b: isBuy,
          r: false,
          t: {
            limit: {
              tif: 'FrontendMarket',
            },
          },
        },
      ],
    };
  }
  async function approveAgent() {
    if (!userAccount.address) throw new Error(NOACCOUNT);

    const nonce = 1732777401306;
    const pk = '0xdd';
    const randomAccount = privateKeyToAccount(pk);
    const action = {
      agentAddress: randomAccount.address,
      type: 'approveAgent',
      nonce,
      hyperliquidChain: 'Testnet',
      signatureChainId: '0x66eee',
    } as const;
    console.log('perps-action', action);
    const signature = await getRSVfromAgentApproveAction(
      { ...action, agentName: '' },
      signerManager
    );
    console.log('perps:approve-sign', signature);
    const payload = {
      action,
      nonce,
      signature,
      isFrontend: true,
      vaultAddress: null,
    };
    // const response = await perpsClient.post<AgentApproveResponse>(
    //   '/exchange',
    //   payload
    // );
    // console.log('response');
    // if (response.data.status == 'ok') {
    //   addAgentInState(userAccount.address, pk);
    // }
  }
  async function buyPerps(isBuy: boolean) {
    if (!userAccount.address) return;
    const action = getPerpsOrderAction(isBuy);
    const nonce = 1732777401306;
    const pk = userAgent[userAccount.address];
    const userAgenetAccount = privateKeyToAccount(pk);
    // console.log('perps:userAgenetAccount', action);

    const signature = await getRSVfromPerpsAction(
      action,
      nonce,
      userAgenetAccount
    );
    console.log('perps:signature', signature);

    const payload = {
      action,
      nonce,
      signature,
      isFrontend: true,
      vaultAddress: null,
    };
    const response = await perpsClient.post('/exchange', payload);
    console.log('perps:response', response);
  }
  if (handleNAandL(data)) {
    return <Skeleton />;
  }
  let buttons = (
    <>
      {' '}
      <BufferButton
        className="group relative mb-3 text-1 bg-blue"
        onClick={() => approveAgent()}
      >
        Enable Trading
      </BufferButton>
    </>
  );
  if (isAgenetExists(userAccount, userAgent)) {
    buttons = (
      <>
        {' '}
        <BufferButton
          className="group relative mb-3 text-1 bg-green"
          onClick={() => buyPerps(true)}
        >
          <UpIcon className="mr-[6px] scale-150" />
          Buy
        </BufferButton>
        <BufferButton
          className="group relative mb-3 text-1 bg-red"
          onClick={() => buyPerps(false)}
        >
          <DownIcon className="mr-[6px] scale-150" />
          Sell
        </BufferButton>
      </>
    );
  }
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
        values={[toFixed(data.withdrawable, 2), '0.00 ETH']}
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
      <div className="flex gap-[5px] mt-[4px] ">{buttons}</div>
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
        <button
          className="w-full py-2  h-12 rounded-lg border border-[#26B893] bg-transparent text-[#26B893] hover:bg-[#26B893]/10 transition-colors duration-200 ease-in-out font-semibold text-base focus:outline-none focus:ring-2 focus:ring-[#26B893] focus:ring-opacity-50"
          onClick={openDepositModal}
        >
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
});
