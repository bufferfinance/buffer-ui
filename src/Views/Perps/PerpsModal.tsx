import { ModalBase } from '@/Modals/BaseModal';
import { useDepositModalState } from './state';
import { CloseOutlined } from '@mui/icons-material';
import { PerpsConfig } from '@ConfigContract';
import BufferInput from '@Views/Common/BufferInput';
import { useState } from 'react';
import { useAccount, useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';
import { WalletIcon } from 'lucide-react';
import { multiply, toFixed } from '@Utils/NumString/stringArithmatics';
import { numView } from '@Utils/numView';
import { BlueBtn } from '@Views/Common/V2-Button';
import { useWriteCall } from '@Hooks/useWriteCall';
import { useGlobal } from '@Contexts/Global';
import { cn } from '@Utils/cn';

export const Deposit = () => {
  const isOpen = useDepositModalState((state) => state.state.isOpen);
  const account = useAccount();
  const closeModal = useDepositModalState((state) => state.close);
  const [value, setValue] = useState('');
  const { state } = useGlobal();
  const { writeCall } = useWriteCall(
    '0x1870dc7a474e045026f9ef053d5bb20a250cc084',
    erc20Abi
  );
  const { data, queryKey } = useReadContract(
    {
      address: PerpsConfig.tokens.USDC,
      abi: erc20Abi,
      functionName: 'balanceOf',
      args: [account.address!],
      chainId: PerpsConfig.chainId,
    }

    // query:
  );
  function depositUSDC() {
    const wcvalue = multiply(value, 6);
    console.log('wcvalue', wcvalue);
    writeCall(
      () => {
        console.log('success');
      },
      'transfer',
      [PerpsConfig.fundReciever, wcvalue]
    );
  }
  return (
    <ModalBase
      open={isOpen}
      onClose={closeModal}
      className="max-w-[600px] !w-[500px] sm:max-w-full sm:!p-5 !bg-[#232334]"
    >
      <div className="flex justify-between items-center">
        <h3 className="font-[500] text-f20 sm:text-f14">
          Deposit funds from "{PerpsConfig.chainName}"
        </h3>
        <button
          className="p-3 sm:p-2 text-1 rounded-full bg-2"
          test-id="close-button"
          onClick={closeModal}
        >
          <CloseOutlined className="!scale-125 sm:!scale-100" />
        </button>
      </div>
      <div className="flex items-center justify-between text-f16 mt-4 mb-1">
        Enter USDC
        <div className="flex items-center text-f12">
          <WalletIcon className="scale-75" /> {numView(data)} USDC
        </div>
      </div>
      <div className="flex items-center w-full relative">
        <BufferInput
          value={value}
          numericValidations={{
            min: { val: '1', error: "can't deposit less than 1" },
            max: {
              val: numView(data),
              error: `can't deposit more than ${numView(data)}`,
            },
          }}
          onChange={setValue}
          placeholder="Enter USDC amount to deposit to perps"
          //   unit={'USDC'}
          className=" w-[1000px]"
        />
        <button
          className="absolute right-3 bg-[#141823] rounded-[6px] py-2 px-[6px] text-f12"
          onClick={() => setValue(numView(data))}
        >
          Max
        </button>
      </div>
      <div>
        <BlueBtn
          onClick={state.txnLoading ? console.log : depositUSDC}
          className={cn(
            'mt-5',
            state.txnLoading && '!bg-grey !cursor-not-allowed'
          )}
          //   disabled={}
        >
          Deposit
        </BlueBtn>
      </div>
    </ModalBase>
  );
};
