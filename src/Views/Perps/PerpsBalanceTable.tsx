import { usePerpsBalance } from './Hooks/usePerpsData';

const PerpsBalanceTable = () => {
  const data = usePerpsBalance();
  console.log('balancedata:', data);
  return <div>Balance Table</div>;
};

export { PerpsBalanceTable };
