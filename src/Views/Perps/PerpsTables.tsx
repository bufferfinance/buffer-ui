import { AccordionTable } from '@Views/TradePage/Views/AccordionTable';
import { PerpsBalanceTable } from './PerpsBalanceTable';
import { PerpsPositionTable } from './PerpsPositionTable';

export const PerpsTables = () => {
  return (
    <AccordionTable
      tablesList={{ Position: PerpsPositionTable, Balance: PerpsBalanceTable }}
    />
  );
};
