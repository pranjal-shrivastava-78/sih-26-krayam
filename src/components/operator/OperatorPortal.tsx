import React from 'react';
import { useApp } from '../../context/AppContext';
import { OperatorHeader } from './OperatorHeader';
import { OperatorDashboardTab } from './OperatorDashboardTab';
import { OperatorQueueTab } from './OperatorQueueTab';
import { OperatorBookingsTab } from './OperatorBookingsTab';
import { OperatorProcurementTab } from './OperatorProcurementTab';
import { OperatorPaymentsTab } from './OperatorPaymentsTab';
import { OperatorAnalyticsTab } from './OperatorAnalyticsTab';
import { OperatorProduceTab } from './OperatorProduceTab';
import { OperatorAiInsightsTab } from './OperatorAiInsightsTab';
import { OperatorOfflineTab } from './OperatorOfflineTab';
import { KrayamFooter } from '../common/KrayamFooter';

export const OperatorPortal: React.FC = () => {
  const { operatorActiveTab, operator, isOffline } = useApp();

  return (
    <div className="min-h-screen flex flex-col font-['Inter'] antialiased bg-[#F5F8F6] text-[#17231F]">
      {/* Mandi Floor Operator Header */}
      <OperatorHeader />

      {/* Main Viewport Container */}
      <main className="flex-1 w-full max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">
        {operatorActiveTab === 'dashboard' && <OperatorDashboardTab />}
        {operatorActiveTab === 'queue' && <OperatorQueueTab />}
        {operatorActiveTab === 'bookings' && <OperatorBookingsTab />}
        {operatorActiveTab === 'procurement' && <OperatorProcurementTab />}
        {operatorActiveTab === 'produce' && <OperatorProduceTab />}
        {operatorActiveTab === 'payments' && <OperatorPaymentsTab />}
        {operatorActiveTab === 'analytics' && <OperatorAnalyticsTab />}
        {operatorActiveTab === 'aiInsights' && <OperatorAiInsightsTab />}
        {operatorActiveTab === 'offline' && <OperatorOfflineTab />}
      </main>

      {/* Unified KRAYAM Footer */}
      <KrayamFooter className="mt-8" />
    </div>
  );
};
