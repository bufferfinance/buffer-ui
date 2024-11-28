import { useActiveChain } from '@Hooks/useActiveChain';
import { usePriceRetriable } from '@Hooks/usePrice';
import { Sidebar } from '@Views/Common/SidebarAB';
import { useMedia } from 'react-use';
import { TopStats } from './TopStats';
import { PerpsBuyingWindow } from './PerpsBuyingWindow';
import { PerpsTables } from './PerpsTables';
import { PerpsTV } from './PerpsTV';
import { PerpsTopStats } from './PerpsTopStats';
import * as PerpsModal from './PerpsModal';
const Perps = () => {
  const isNotMobile = useMedia('(min-width:1200px)');
  usePriceRetriable();
  const { activeChain } = useActiveChain();

  return (
    <>
      <PerpsModal.Deposit />
      <Sidebar />
      <div className={`flex h-full justify-between w-[100%] bg-[#1C1C28] `}>
        <div className="w-full flex flex-col ">
          <PerpsTopStats />
          <PerpsTV />
          <PerpsTables />
        </div>
        <PerpsBuyingWindow />
      </div>
    </>
  );
};

export default Perps;
