import { encode } from '@msgpack/msgpack';
import { splitSignature } from 'ethers/lib/utils';
import {
  hashMessage,
  hashTypedData,
  keccak256,
  PrivateKeyAccount,
  recoverTypedDataAddress,
} from 'viem';
import { AgentApproveAction, PerpsAction } from '../Perps.types';
import { useSignTypedData, UseSignTypedDataReturnType } from 'wagmi';
import { Signature } from 'ethers';

const phantomDomain = {
  name: 'Exchange',
  version: '1',
  chainId: 1337n,
  verifyingContract:
    '0x0000000000000000000000000000000000000000' as `0x${string}`,
};

const masterAccountDomain = {
  name: 'HyperliquidSignTransaction',
  version: '1',
  chainId: 421614n, //REVIEW - Is it biginit or string?
  verifyingContract:
    '0x0000000000000000000000000000000000000000' as `0x${string}`,
};
/*



*/
const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
] as const;
const agentTypes = {
  Agent: [
    { name: 'source', type: 'string' },
    { name: 'connectionId', type: 'bytes32' },
  ],
  EIP712Domain: [
    { name: 'name', type: 'string' },
    { name: 'version', type: 'string' },
    { name: 'chainId', type: 'uint256' },
    { name: 'verifyingContract', type: 'address' },
  ],
} as const;
async function getRSVfromPerpsAction(
  action: PerpsAction,
  nonce: number,
  signer: PrivateKeyAccount
): Promise<{ r: string; s: string; v: number }> {
  const msgPackBytes = encode(action);
  const additionalBytesLength = 9;
  const hash = new Uint8Array(msgPackBytes.length + additionalBytesLength);
  hash.set(msgPackBytes);
  const view = new DataView(hash.buffer);
  view.setBigUint64(msgPackBytes.length, BigInt(nonce), false);
  view.setUint8(msgPackBytes.length + 8, 0);
  const connectionId = keccak256(hash);
  const data = {
    domain: phantomDomain,
    types: agentTypes,
    primaryType: 'Agent',
    message: { source: 'b', connectionId },
  } as const;
  // const hashedMessage = hashTypedData(data);
  console.log('perps:signer', signer.address);
  const signature = await signer.signTypedData(data);
  const signerAddress = await recoverTypedDataAddress({
    ...data,
    signature,
  });
  console.log('perps:signerAddress', signerAddress);
  return rsvize(signature);
}
const rsvize = (sign: `0x${string}`): { r: string; s: string; v: number } => {
  const signature = splitSignature(sign);
  return {
    r: signature.r,
    s: signature.s,
    v: signature.v,
  };
};
async function getRSVfromAgentApproveAction(
  action: AgentApproveAction,
  signer: UseSignTypedDataReturnType<unknown>
): Promise<{ r: string; s: string; v: number }> {
  const msgToSign = {
    domain: masterAccountDomain,
    types: {
      EIP712Domain: EIP712Domain,
      'HyperliquidTransaction:ApproveAgent': [
        { name: 'hyperliquidChain', type: 'string' },
        { name: 'agentAddress', type: 'address' },
        { name: 'agentName', type: 'string' },
        { name: 'nonce', type: 'uint64' },
      ],
    } as const,
    primaryType: 'HyperliquidTransaction:ApproveAgent',
    message: {
      ...action,
      nonce: BigInt(action.nonce),
      hyperliquidChain: 'Testnet',
    },
  } as const;
  console.log('perps:msgToSign', msgToSign);
  const signature = await signer.signTypedDataAsync(msgToSign);
  return rsvize(signature);
}

export { getRSVfromPerpsAction, getRSVfromAgentApproveAction };
