import { useToast } from '@Contexts/Toast';
import { getSingatureCached } from '@Views/TradePage/cache';
import { baseUrl } from '@Views/TradePage/config';
import { WaitToast } from '@Views/TradePage/utils';
import { getConfig } from '@Views/TradePage/utils/getConfig';
import { signTypedData } from '@wagmi/core';
import axios from 'axios';
import { ethers } from 'ethers';
import { atom, useAtom, useSetAtom } from 'jotai';
import { useMemo } from 'react';
import secureLocalStorage from 'react-secure-storage';
import { getChains } from 'src/Config/wagmiClient';
import { getAddress } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import {
  useAccount,
  useNetwork,
  usePublicClient,
  useWalletClient,
} from 'wagmi';
import { isOneCTModalOpenAtom } from './OneCTButton';
import { useUserOneCTData } from './useOneCTWalletV2';

/*
 * Nonce is zero initially.
 * User singes a message with nonce 0 and from the signature, we generate PK.
 * We store the PK in local storage.
 *
 * If user uses the same main account on different hardware, the same PK will be generated,
 * Hence he doesn't have to do register txn again.
 *
 * If user deRegesters the trading account,
 *  Nonce will be incremented by 1.
 *  Account Mapping will be updated to zero address
 * Hence all the hardwares with the same main account will have to register 1CT again with the
 * new PK generated from incremented nonce
 */

export const EIP712Domain = [
  { name: 'name', type: 'string' },
  { name: 'version', type: 'string' },
  { name: 'chainId', type: 'uint256' },
  { name: 'verifyingContract', type: 'address' },
];
export const is1CTEnabled = (
  account: string,
  pk: string | null,
  provider: any,
  deb?: string
) => {
  if (!account || !pk || !provider) return null;
  const oneCTWallet = privateKeyToAccount(`0x${pk}`);
  return oneCTWallet.address.toLowerCase() === account.toLowerCase();
};
export const disableLoadingAtom = atom<boolean>(false);
export const createLoadingAtom = atom<boolean>(false);
export const uesOneCtActiveChain = () => {
  //react-couter cant access in the navbar. Use this hook for accessing activeChain in navbar
  const { chain } = useNetwork();
  const chains = getChains();

  return { activeChain: chain ? chain : chains[0] };
};

const useOneCTWallet = () => {
  const { address } = useAccount();
  const toastify = useToast();
  const res = useUserOneCTData();
  const [disabelLoading, setDisabelLoading] = useAtom(disableLoadingAtom);
  const [createLoading, setCreateLoading] = useAtom(createLoadingAtom);
  const { activeChain } = uesOneCtActiveChain();
  const configData = getConfig(activeChain.id);
  const provider = usePublicClient({ chainId: activeChain.id });
  const setModal = useSetAtom(isOneCTModalOpenAtom);

  const pkLocalStorageIdentifier = useMemo(() => {
    return (
      'signer-account-pk:' +
      address +
      ',nonce' +
      res?.nonce +
      ',activeChain' +
      activeChain.id +
      ':'
    );
  }, [address, res?.nonce]);

  const oneCtPk = useMemo(() => {
    return secureLocalStorage.getItem(pkLocalStorageIdentifier);
  }, [pkLocalStorageIdentifier, createLoading]);

  const registeredOneCT = useMemo(() => {
    if (!res?.one_ct) return false;
    return (
      oneCtPk &&
      res.one_ct.toLowerCase() !== ethers.constants.AddressZero.toLowerCase()
    );
  }, [res, res?.one_ct, res?.nonce, provider, oneCtPk]);

  const { data: signer } = useWalletClient({ chainId: activeChain.id });

  const oneCTWallet = useMemo(() => {
    if (!oneCtPk) return null;
    // console.log(`useOneCTWallet-oneCtPk: `, oneCtPk);
    return privateKeyToAccount(('0x' + oneCtPk) as any);
  }, [oneCtPk, provider, registeredOneCT]);

  const generatePk = async () => {
    if (!res)
      return toastify({
        msg: 'Unable to fetch data. Please try again later',
        type: 'error',
        id: 'unable-to-fetch-data-one_ct',
      });

    try {
      const nonce = res?.nonce.toString();
      if (nonce === undefined) return toastify(WaitToast());
      setCreateLoading(true);
      const domain = {
        name: 'Ether Mail',
        version: '1',
        chainId: activeChain.id,
        verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
      } as const;

      // The named list of all type definitions
      const types = {
        EIP712Domain: [
          { name: 'name', type: 'string' },
          { name: 'version', type: 'string' },
          { name: 'chainId', type: 'uint256' },
          { name: 'verifyingContract', type: 'address' },
        ],
        Registration: [
          { name: 'content', type: 'string' },
          { name: 'nonce', type: 'uint256' },
          { name: 'chainId', type: 'uint256' },
        ],
      } as const;

      const signature = await signTypedData({
        types,
        domain,
        primaryType: 'Registration',
        message: {
          content: 'I want to create a trading account with Buffer Finance',
          nonce,
          chainId: activeChain.id,
        },
      });
      const privateKey = ethers.utils.keccak256(signature).slice(2);
      secureLocalStorage.setItem(pkLocalStorageIdentifier, privateKey);
      setCreateLoading(false);
      if (is1CTEnabled(res.one_ct, privateKey, provider, 'one-ct-deb')) {
        //close the modal after3 seconds
        setTimeout(() => {
          setModal(false);
        }, 1000);
        toastify({
          msg: 'You have already registered your 1CT Account. You can start trading now!',
          type: 'success',
        });
        return privateKey;
      }
    } catch (e) {
      console.log(e, 'error generating signature');
      toastify({ msg: JSON.stringify(e), type: 'error', id: '321321' });
      setCreateLoading(false);
      return '';
    }
  };
  const deleteOneCTPk = () => {
    secureLocalStorage.removeItem(pkLocalStorageIdentifier);
  };
  const disableOneCt = async () => {
    try {
      setDisabelLoading(true);
      if (!res)
        return toastify({
          msg: 'Unable to fetch data. Please try again later',
          type: 'error',
          id: 'unable-to-fetch-data-one_ct',
        });
      if (typeof oneCtPk !== 'string')
        return toastify({
          msg: 'Please create your 1CT Account first',
          type: 'error',
          id: 'oneCtPk',
        });
      const types = {
        EIP712Domain,
        DeregisterAccount: [
          { name: 'user', type: 'address' },
          { name: 'nonce', type: 'uint256' },
        ],
      };
      const domain = {
        name: 'Validator',
        version: '1',
        chainId: activeChain.id,
        verifyingContract: getAddress(configData.signer_manager),
      };

      const signature = await signTypedData({
        message: {
          user: address,
          nonce: res?.nonce,
        },
        primaryType: 'DeregisterAccount',
        types,
        domain,
      });

      if (!signature)
        return toastify({
          msg: 'Error getting signature. Please try again later.',
          type: 'error',
          id: 'signature',
        });

      const api_signature = await getSingatureCached(oneCTWallet);

      if (!api_signature)
        return toastify({
          msg: 'Error getting signature. Please try again later.',
          type: 'error',
          id: 'signature',
        });

      const apiParams = {
        account: address,
        deregistration_signature: signature,
        environment: activeChain.id,
        api_signature,
      };
      const resp = await axios.post(baseUrl + 'deregister/', null, {
        params: apiParams,
      });
      toastify({
        msg: 'Account Deregistered!',
        type: 'success',
        id: '232213',
      });
    } catch (e) {
      console.log(e, 'deregister api error');
      toastify({
        msg: `Error in deregister API. please try again later. ${e}`,
        type: 'error',
        id: 'deregisterapi',
      });
    } finally {
      setDisabelLoading(false);
    }
  };
  return {
    oneCtPk,
    oneCtAddress: res?.one_ct,
    createLoading,
    generatePk,
    disabelLoading,
    registeredOneCT,
    oneCTWallet,
    deleteOneCTPk,
    disableOneCt,
    nonce: res?.nonce,
    state: res?.state,
  };
};

export { useOneCTWallet };
