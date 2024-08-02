import { add, divide, gt, multiply } from '@Utils/NumString/stringArithmatics';
import { useMemo } from 'react';
import { Chain } from 'viem';
import { poolsType } from '../types';
import { useBlpRate } from './useBlpRate';
import { useTokensPerInterval } from './useTokensPerInterval';
import useARBPrice from './useARBPrice';
import { useReadContract } from 'wagmi';
import { getLpConfig } from '../config';
import NftLockPoolABI from '../abis/NftLockPool.json';

export const BASIS_POINTS_DIVISOR = '10000';
export const SECONDS_PER_YEAR = '31536000';
const usd_decimals = 6;

export const useUSDCapr = (activeChain: Chain, activePool: poolsType) => {
  const { data: tokensPerInterval, error: tokensPerIntervalError } =
    useTokensPerInterval(activeChain);
  const { data: blpData, error: blpError } = useBlpRate(
    activeChain,
    activePool
  );
  const contracts = getLpConfig(activeChain.id);

  const arbPrice = useARBPrice();
  const wrappedBlpSupplyWithMultiplier = useReadContract({
    address: contracts.nftLockPool,
    abi: NftLockPoolABI,
    functionName: '_wrappedBlpSupplyWithMultiplier',
    args: [],
  });
  function getBLPsupplyAndPrice() {
    if (!blpData && !blpError) return null;
    if (!blpData) return undefined;

    const blpSupply = blpData.blpAmount;
    const blpPrice = divide(blpData.price ?? '0', 8) as string;
    return { blpSupply, blpPrice };
  }

  const getMultiplierByLockDuration = (
    lockDuration: number,
    isUnlocked: boolean
  ) => {
    if (!tokensPerInterval && !tokensPerIntervalError) {
      return null;
    }
    if (tokensPerInterval === undefined) {
      return undefined;
    }

    const maxLockDuration = Number(
      tokensPerInterval.lockMultiplierSettings[0].maxLockDuration
    );
    const maxLockMultiplier = Number(
      tokensPerInterval.lockMultiplierSettings[0].maxLockMultiplier
    );

    if (isUnlocked) {
      return 0;
    }

    if (maxLockDuration === 0 || lockDuration === 0) {
      return 0;
    }
    if (lockDuration >= maxLockDuration) {
      return maxLockMultiplier;
    }

    return (maxLockMultiplier * lockDuration) / maxLockDuration;
  };

  const getLockAPR = (lockPeriod: number, isUnlocked: boolean) => {
    const multiplier = getMultiplierByLockDuration(
      Number(lockPeriod),
      isUnlocked
    );
    if (!wrappedBlpSupplyWithMultiplier?.data) return null;
    if (!tokensPerInterval && !tokensPerIntervalError) {
      return null;
    }
    if (tokensPerInterval === undefined) {
      return undefined;
    }

    if (multiplier === null) {
      return null;
    }
    if (multiplier === undefined) {
      return undefined;
    }
    if (!arbPrice) return null;

    const blpData = getBLPsupplyAndPrice();

    if (blpData === null) return null;
    if (blpData === undefined) return undefined;
    const { blpSupply, blpPrice } = blpData;
    const wrappedData = wrappedBlpSupplyWithMultiplier?.data.toString();
    const tokensPerIntervalAmount = tokensPerInterval.lockPerInterval[0].amount;
    const factor = add(multiplier.toString(), '10000');
    let numerotor = multiply(
      multiply(factor, tokensPerIntervalAmount),
      (365 * 864).toString()
    );
    numerotor = multiply(numerotor, (arbPrice * 1e3).toString()) as string;
    const blpPricee3 = multiply(blpPrice, '1000');
    const denominator = multiply(
      multiply('10000000000', wrappedData),
      blpPricee3
    );
    const apr = divide(numerotor, denominator) as string;
    return divide(apr, 2);
  };

  const usdcApr = useMemo(() => {
    if (tokensPerIntervalError || blpError) return undefined;
    if (!tokensPerInterval || !blpData) return undefined;
    const blpSupply = blpData.blpAmount;
    const blpPrice = divide(blpData.price ?? '0', 8) as string;
    const feeBlpTrackerAnnualRewardsUsd = divide(
      multiply(tokensPerInterval.usdcPerInterval[0].amount, SECONDS_PER_YEAR),
      usd_decimals
    ) as string;
    const blpAprForRewardToken = gt(blpSupply, '0')
      ? (divide(
          multiply(feeBlpTrackerAnnualRewardsUsd, BASIS_POINTS_DIVISOR),
          divide(multiply(blpSupply, blpPrice), usd_decimals) as string
        ) as string)
      : '0';
    return divide(blpAprForRewardToken, 2);
  }, [
    tokensPerInterval,
    tokensPerIntervalError,
    activePool,
    activeChain,
    blpData,
    blpError,
  ]);

  return { getLockAPR, usdcApr, getMultiplierByLockDuration };
};

/**
    //  *  Returns expected multiplier for a "lockDuration" duration lock (result is *1e4)
    //  */
//     function getMultiplierByLockDuration(uint256 lockDuration) public view returns (uint256) {
//         // In case of emergency unlock
//         if (isUnlocked()) {
//             return 0;
//         }

//         if (_maxLockDuration == 0 || lockDuration == 0) {
//             return 0;
//         }

//         // Capped to maxLockDuration
//         if (lockDuration >= _maxLockDuration) {
//             return _maxLockMultiplier;
//         }

//         return _maxLockMultiplier.mul(lockDuration).div(_maxLockDuration);
//     }

// Return the APR for a certain lock duration
// function getAPR(uint256 lockDuration) external view returns (uint256) {
//     uint256 multiplier = getMultiplierByLockDuration(lockDuration);
//     uint256 factor = multiplier.add(1e4);
//     return factor.mul(tokensPerInterval()).mul(365 days).div(_wrappedBlpSupplyWithMultiplier);
// }
