import { UTF8ArrToStr, getKlineFromPrice } from '@TV/utils';
import axios from 'axios';
import { atom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { Market2Prices } from 'src/Types/Market';
import { multiply } from '@Utils/NumString/stringArithmatics';
import Big from 'big.js';
type WSUPdate = {
  type: 'price_update';
  price_feed: {
    ema_price: {
      conf: string;
      expo: number;
      price: string;
      publish_time: number;
    };
    id: string;
    price: {
      conf: string;
      expo: number;
      price: string;
      publish_time: number;
    };
  };
};
export const silentPriceCache = {};
export const usePrice = () => {
  const setPrice = useSetAtom(priceAtom);
  const [retry, setRetry] = useState(1);
  const loadNewPriceData = useCallback(
    (ws: WebSocket) => {
      ws.onopen = () => {
        ws.send(
          JSON.stringify({
            ids: Object.keys(pythIds),
            type: 'subscribe',
          })
        );
      };

      ws.onmessage = (event) => {
        const wsData = JSON.parse(event.data);
        const lastJsonMessage = wsData;
        if (!lastJsonMessage) return;
        if ((lastJsonMessage as WSUPdate).type == 'price_update') {
          const priceUpdatePacked = [
            {
              price: multiply(
                (lastJsonMessage as WSUPdate).price_feed.price.price,
                new Big('10')
                  .pow((lastJsonMessage as WSUPdate).price_feed.price.expo)
                  .toString()
              ),
              time:
                (lastJsonMessage as WSUPdate).price_feed.price.publish_time *
                1000,
            },
          ];
          const data = {
            [pythIds[(lastJsonMessage as WSUPdate).price_feed.id]]:
              priceUpdatePacked,
          };
          silentPriceCache[
            pythIds[(lastJsonMessage as WSUPdate).price_feed.id]
          ] = priceUpdatePacked;
          setPrice((p) => ({ ...p, ...data }));
        }
      };

      ws.onerror = (error) => {
        setRetry((r) => r + 1);
        console.error('[ws-deb]error:', error);
      };
      ws.onclose = (closeEvent) => {
        setRetry((r) => r + 1);
        console.error('[ws-deb]close:', closeEvent);
      };
    },
    [setPrice]
  );
  useEffect(() => {
    const ws = new WebSocket('wss://hermes.pyth.network/ws');
    loadNewPriceData(ws);
    return () => {
      ws.close();
    };
  }, [retry]);
};

export const wsStateAtom = atom<{ state: string }>({
  state: 'need-connection',
});
export const priceAtom = atom<Partial<Market2Prices>>({});
export const pythIds = {
  ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace: 'ETHUSD',
  e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43: 'BTCUSD',
  '84c2dde9633d93d1bcad84e7dc41c9d56578b7ec52fabedc1f335d673df0a7c1': 'GBPUSD',
  a995d00bb36a63cef7fd2c287dc105fc8f3d93779f062f09551b0af3e81ec30b: 'EURUSD',
  '3fa4252848f9f0a1480be62745a4629d9eb1322aebab8a791e344b3b9c1adcf5': 'ARBUSD',
  '2f95862b045670cd22bee3114c39763a4a08beeb663b145d283c31d7d1101c4f': 'BNBUSD',
  '5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52':
    'MATICUSD',
  '385f64d993f7b77d8182ed5003d97c60aa3361f3cecfe711544d2d59165e9bdf': 'OPUSD',
  '765d2ba906dbc32ca17cc11f5310a89e9ee1f6420508c63861f2f8ba4ee34bb2': 'XAUUSD',
  f2fb02c32b055c805e7238d628e5e9dadef274376114eb1f012337cabe93871e: 'XAGUSD',
};
export const getPrice = async () => {
  const price = await axios.get(
    `https://xc-mainnet.pyth.network/api/latest_price_feeds?` +
      Object.keys(pythIds)
        .map((d) => 'ids[]=0x' + d)
        .join('&')
  );
  const marketPrice = {};
  price.data.forEach((e) => {
    marketPrice[pythIds[e.id]] = [
      {
        price: multiply(
          e.price.price,
          new Big('10').pow(e.price.expo).toString()
        ),
        time: e.price.publish_time * 1000,
      },
    ];
  });
  return marketPrice;
};
