import { useGlobal } from '@Contexts/Global';
import { useToast } from '@Contexts/Toast';
import { useActiveChain } from '@Hooks/useActiveChain';
import { useWriteCall } from '@Hooks/useWriteCall';
import { ConnectionRequired } from '@Views/Common/Navbar/AccountDropdown';
import { BlueBtn } from '@Views/Common/V2-Button';
import Drawer from '@Views/Common/V2-Drawer';
import { usePoolDisplayNames } from '@Views/DashboardV2/hooks/usePoolDisplayNames';
import { usePoolByAsset } from '@Views/TradePage/Hooks/usePoolByAsset';
import { Skeleton } from '@mui/material';
import { ethers } from 'ethers';
import { useEffect, useMemo, useState } from 'react';
import FaucetABI from './Faucet.json';
import Background from './style';
import TESTHClaimingSetps from './TESTHClaimingSteps';

const IbfrFaucet: React.FC = () => {
  useEffect(() => {
    document.title = 'Buffer | Faucet';
  }, []);
  const { activeChain } = useActiveChain();

  const { poolDisplayNameMapping } = usePoolDisplayNames();
  const tokenChains = useMemo(() => {
    return Object.keys(poolDisplayNameMapping)
      .splice(0, 1)
      .filter((token) => !token.includes('-POL') && token !== 'BFR');
  }, [poolDisplayNameMapping]);

  const content = activeChain && [
    {
      top: `Claim Test USDC tokens`,
      middle: 'Fee: 0.001 TESTH ',
      bottom: (
        <ConnectionRequired>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {tokenChains.map((token: string) => (
              <ClaimButton token={token} key={token} />
            ))}
          </div>{' '}
        </ConnectionRequired>
      ),
    },
  ];

  return (
    <main className="content-drawer">
      <Background>
        <div className="wrapper">
          {activeChain && content ? (
            content.map((s, i) => (
              <div className="faucet-card bg-1" key={i}>
                <div className="card-head">{s.top}</div>
                {s.middle && <div className="card-middle">{s.middle}</div>}
                <TESTHClaimingSetps />
                <div className="card-action">{s.bottom}</div>
              </div>
            ))
          ) : (
            <Skeleton className="custom-loader lc sr" variant="rectangular" />
          )}
        </div>
      </Background>
      <Drawer open={false}>
        <></>
      </Drawer>
    </main>
  );
};

const ClaimButton = ({ token }: { token: string }) => {
  const { state } = useGlobal();
  const [btnLoading, setBtnLoading] = useState(0);
  const pools = usePoolByAsset();
  const faucetContract = pools[token]?.faucet;

  const { writeCall } = useWriteCall(faucetContract, FaucetABI);
  const toastify = useToast();

  const claim = () => {
    if (state.txnLoading > 1) {
      return toastify({
        type: 'error',
        msg: 'Please Confirm your pending txns.',
      });
    }
    function cb(res: any) {
      setBtnLoading(0);
    }
    const overRides = {
      value: ethers.utils.parseEther('0.001').toString(),
    };
    const methodName = 'claim';
    setBtnLoading(1);
    return writeCall(cb, methodName, [], overRides);
  };

  return (
    <BlueBtn
      isLoading={state.txnLoading === 1 && btnLoading === 1}
      isDisabled={state.txnLoading === 1}
      className="btn nowrap"
      onClick={claim}
    >
      Claim 500 {token}
    </BlueBtn>
  );
};

const faucetClaimingSteps = {
  421614: {
    name: 'AETH',
    symbol: 'AETH',
    faucet: [
      {
        step: 'Claim GoerliETH from sepolia faucet',
        url: 'https://www.alchemy.com/faucets/arbitrum-sepolia',
      },
    ],
    img: '/Chains/ARBITRIUM.png',
    decimals: 18,
    category: 'Crypto',
  },
  80001: {
    name: 'MATIC',
    symbol: 'MATIC',
    faucet: [
      {
        step: 'Claim testnet MATIC',
        url: 'https://mumbaifaucet.com/',
      },
    ],
  },
  998: {
    name: 'TESTH',
    symbol: 'TESTH',
    faucet: [
      {
        step: 'Claim USDC by sending 0.01 TESTH',
        url: 'https://mumbaifaucet.com/',
      },
    ],
  },
};

export default IbfrFaucet;
