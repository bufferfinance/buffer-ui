import { Config, UseAccountReturnType } from 'wagmi';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

const defaultModalState = { isOpen: false, data: null };
type ModalState = {
  isOpen: boolean;
  data: any;
};
type ModalStore = {
  state: ModalState;
  open: (d: any) => void;
  close: () => void;
};
const useDepositModalState = create<ModalStore>((set) => {
  return {
    state: defaultModalState,

    open: (data: any) =>
      set((st) => ({
        state: {
          isOpen: true,
          data,
        },
      })),
    close: () => set((s) => ({ state: defaultModalState })),
  };
});
type Address = `0x${string}`;

type UserAgentState = { [user: Address]: `0x${string}` };
type UserAgentStore = {
  state: UserAgentState;
  addAgent: (user: Address, pk: Address) => void;
  removeAgent: (user: Address) => void;
};
const defaultUserAgentState = {};
const useUserAgentStore = create<UserAgentStore>()(
  persist(
    (set) => {
      return {
        state: defaultUserAgentState,
        addAgent: (user: Address, pk: Address) =>
          set((st) => {
            console.log('perps-adding agent');
            return {
              state: {
                ...st.state,
                [user]: pk,
              },
            };
          }),
        removeAgent: (user: Address) =>
          set((st) => {
            const { [user]: _, ...rest } = st.state;
            return { state: rest };
          }),
      };
    },
    {
      name: 'zustand-session-store', // unique name for the storage key
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
/*
state:{[user]:privateKey}

*/
export { useDepositModalState, useUserAgentStore };
export function isAgenetExists(
  userAccount: UseAccountReturnType<Config>,
  s: UserAgentState
) {
  // console.log('perps-userAccount?.address', userAccount?.address, s);
  if (userAccount?.address && userAccount.address in s) {
    return true;
  }
  return false;
}
