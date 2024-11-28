import { handleNAandL } from '@Utils/isLoading';
import { usePerpsHoldings } from './Hooks/usePerpsData';
import PerpsPositionTableUI from './PerpsPositionTableUI';

const PerpsPositionTable = () => {
  const data = usePerpsHoldings();
  if (handleNAandL(data)) {
    return <div>Loading...</div>;
  }
  console.log('positioonal-data', data);
  return <PerpsPositionTableUI summaryData={data} />;
};

export { PerpsPositionTable };
