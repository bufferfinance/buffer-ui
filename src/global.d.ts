// src/global.d.ts
interface NestedObject {
  nestedKey: string;
}
var isDevnet: boolean; // Declare a global variable
var api_url: string;
var indexer_url: string;
var nestedObj: NestedObject;
interface Window {
  myCustomGlobal: number; // Add a property to the global `window` object
}

type PerpsAssetCtx = SharedAssetCtx & {
  funding: number;
  openInterest: number;
  oraclePx: number;
};
type SharedAssetCtx = {
  dayNtlVlm: number;
  prevDayPx: number;
  markPx: number;
  midPx?: number;
};

interface WsActiveAssetCtx {
  coin: string;
  ctx: PerpsAssetCtx;
}
type HLWSUpdate = {
  channel: 'activeAssetCtx';
  data: WsActiveAssetCtx;
};
