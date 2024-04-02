import TabSwitch from '@Views/Common/TabSwitch';
import { depositTabType, poolsType } from '@Views/LpRewards/types';
import styled from '@emotion/styled';
import { useState } from 'react';
import { DepositTab } from './DepositTab';
import { Container } from './Styles';
import { VestTab } from './VestTab';
import { WithdrawTab } from './WithdrawTab';

export const ActionCard: React.FC<{ activePool: poolsType }> = ({
  activePool,
}) => {
  const [depositTabType, setDepositTabType] =
    useState<depositTabType>('deposit');

  return (
    <Container className="min-w-[500px]">
      <Tabs
        activeTab={depositTabType}
        setDepositTabType={setDepositTabType}
        activePool={activePool}
      />
    </Container>
  );
};

export const Tabs: React.FC<{
  activeTab: depositTabType;
  setDepositTabType: (newTab: depositTabType) => void;
  activePool: poolsType;
}> = ({ activeTab, setDepositTabType, activePool }) => {
  const activeTabNumber =
    activeTab === 'deposit' ? 0 : activeTab === 'withdraw' ? 1 : 2;
  return (
    <div className="w-full">
      <div className="flex items-center gap-7 mb-6">
        <TabButton
          onClick={() => setDepositTabType('deposit')}
          isActive={activeTab === 'deposit'}
        >
          Deposit
        </TabButton>
        <TabButton
          onClick={() => setDepositTabType('withdraw')}
          isActive={activeTab === 'withdraw'}
        >
          Withdraw
        </TabButton>
        <TabButton
          onClick={() => setDepositTabType('vest')}
          isActive={activeTab === 'vest'}
        >
          Vest
        </TabButton>
      </div>
      <TabSwitch
        value={activeTabNumber}
        // className="w-full"
        childComponents={[
          <DepositTab activePool={activePool} />,
          <WithdrawTab activePool={activePool} />,
          <VestTab activePool={activePool} />,
        ]}
      />
    </div>
  );
};

const TabButton = styled.button<{ isActive: boolean }>`
  color: ${({ isActive }) => (isActive ? '#EFF0F0' : '#d9d9d999')};
  font-size: 16px;
  line-height: 16px;
  font-weight: 500;
`;
