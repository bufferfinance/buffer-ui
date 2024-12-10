const signObject = {
  domain: {
    name: 'HyperliquidSignTransaction',
    version: '1',
    chainId: 42161,
    verifyingContract: '0x0000000000000000000000000000000000000000',
  },
  message: {
    hyperliquidChain: 'Mainnet',
    signatureChainId: '0xa4b1',
    agentAddress: '0x6ba1e47d892ac71e5801a92f01cc8a68d89fdc5e',
    agentName: 'my_api_wallet valid_until 1733910822267',
    nonce: 1733738001315,
    type: 'approveAgent',
  },
  primaryType: 'HyperliquidTransaction:ApproveAgent',
  types: {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    'HyperliquidTransaction:ApproveAgent': [
      { name: 'hyperliquidChain', type: 'string' },
      { name: 'agentAddress', type: 'address' },
      { name: 'agentName', type: 'string' },
      { name: 'nonce', type: 'uint64' },
    ],
  },
};

const apiResponse = {
  action: {
    agentAddress: '0x6BA1E47D892ac71E5801a92F01CC8A68d89fdc5e',
    agentName: 'my_api_wallet valid_until 1733910822267',
    hyperliquidChain: 'Mainnet',
    nonce: 1733738001315,
    signatureChainId: '0xa4b1',
    type: 'approveAgent',
  },
  isFrontend: true,
  nonce: 1733738001315,
  signature: {
    r: '0x6dfc4a319227d003fcd8fb4693aa651bb91d69b8acf522a745db3ab75fe2ac7e',
    s: '0x601476f0f05062aa6b021e604e47e428d621ab7899616a5624740aeb29d48c0b',
    v: 27,
  },
  vaultAddress: null,
};
