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
