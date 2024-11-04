import { zeroAddress } from "viem";

export const isNullAdds = (a: string) => {
  return a == zeroAddress
};
