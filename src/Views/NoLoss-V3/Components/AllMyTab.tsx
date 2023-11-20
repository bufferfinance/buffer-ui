import { useAtom } from 'jotai';
import { activeMyAllTabAtom } from '../atoms';
import { Star } from './SVGs/Star';
import { Trophy } from './SVGs/Trophy';
const tabs: {
  title: 'all' | 'my';
  icon: JSX.Element;
}[] = [
  {
    title: 'all',
    icon: <Trophy />,
  },

  {
    title: 'my',
    icon: <Star />,
  },
];
export const AllMyTab: React.FC = () => {
  const [activeTab, setActiveTab] = useAtom(activeMyAllTabAtom);
  return (
    <div className="flex items-center gap-2 bg-[#282B39] rounded-[3px] w-fit p-2">
      {tabs.map((tab) => {
        const tabClasses =
          activeTab.toLowerCase() === tab.title ? 'bg-[#141823]' : '';
        return (
          <button
            className={`flex items-center text-f14 gap-2 capitalize px-2 ${tabClasses}`}
            onClick={() => setActiveTab(tab.title)}
            key={tab.title}
          >
            <div>{tab.title}</div>
            {tab.icon}
          </button>
        );
      })}
    </div>
  );
};
