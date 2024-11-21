import { useEffect, useRef } from 'react';

export default function TESTHClaimingSetps() {
  return (
    <div className=" bg-gray-900 text-gray-100 p-4 rounded-lg">
      <div className="max-w-[384px] mx-auto">
        <h1 className="text-f18 font-bold mb-4 text-cyan-400">
          How to claim TESTH?
        </h1>
        <ol className="list-none p-0 space-y-4">
          {[1, 2, 3].map((step) => (
            <li key={step} className="relative pl-7">
              <span className="absolute left-0 flex items-center justify-center w-5 h-5 bg-cyan-600 rounded-full text-xs">
                {step}
              </span>
              <h2 className="text-base font-semibold mb-1 text-cyan-300">
                {step == 1 ? (
                  <>
                    Claim Mock USDC from{' '}
                    <a
                      href="https://app.hyperliquid-testnet.xyz/drip"
                      target="_blank"
                      className="underline"
                    >
                      HL testnet Drip
                    </a>
                  </>
                ) : step == 2 ? (
                  <>
                    Trade these MOCK USDC to buy TESTH from{' '}
                    <a
                      href="https://app.hyperliquid-testnet.xyz/trade"
                      target="_blank"
                      className="underline"
                    >
                      HL Spot Trading
                    </a>{' '}
                  </>
                ) : step == 3 ? (
                  <>
                    Send tehse TESTH to System Contract
                    "0x2222222222222222222222222222222222222222"
                  </>
                ) : (
                  <div>helo</div>
                )}
              </h2>
              {step === 3 ? (
                <>
                  <ul className="list-disc pl-4 mb-2 space-y-1 text-xs">
                    <li>
                      TESTH Holdings is visible under "Balances" section of HL
                      Platform.
                    </li>
                    <li>
                      Click the "send" button visible inside TESTH Holdings row,
                      it'll open a modal like the image shown below.
                    </li>
                    <li>
                      Fill Sysetm Contract as destination & click "Send" again.
                    </li>
                  </ul>
                  <div className="rounded-lg overflow-hidden mb-2">
                    <img
                      src="/SystemContracSend.png"
                      alt="Step 4 illustration"
                      style={{ width: 300, height: 300, objectFit: 'contain' }}
                      className="w-full h-auto"
                    />
                  </div>
                </>
              ) : (
                <p className="text-sm">
                  {step == 1
                    ? 'Mock USDC is a token available for free, which can be used to buy holdings on HL testnet.'
                    : step == 2
                    ? 'TESTH is native GAS token on HL EVM.'
                    : 'd'}
                </p>
              )}
            </li>
          ))}
        </ol>
        <p className=" font-semibold    mt-4">
          You now have free TESTH tokens on HL EVM! Connect to the HL EVM
          testnet via Buffer Platform, and your balance will update
          automatically. <br /> <br /> Click the Claim button below ⬇️ to get
          Fake USDC to start trading on Buffer.
        </p>
      </div>
    </div>
  );
}
//  <ol>
{
  /* <li>
Claim Mock USDC from{' '}
<a
  href="https://app.hyperliquid-testnet.xyz/drip"
  target="_blank"
  className='underline'
>
  HyperLiquid testnet Drip
</a>{' '}
</li>
<li>
Trade them to buy TESTH from
<a
  href="https://app.hyperliquid-testnet.xyz/trade"
  target="_blank"
  className='underline'
>
  HyperLiquid Spot Trading
</a>{' '}
</li>
<li>
Send TESTH from l1 to System Contract
"0x2222222222222222222222222222222222222222"
<div>
  Send button is visible under "Blances" section of
  HyperLiquid Platform.
</div>
<div>There wil be a button "send" - click that.</div>
<img src="/SystemContracSend.png" />
</li>
<div>Thats it, you have TESTH on HyperLuqid EVM.</div>
</ol> */
}
