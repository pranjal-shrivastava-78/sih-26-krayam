import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { AnnouncementBanner } from './components/layout/AnnouncementBanner';
import { GovernmentHeader } from './components/layout/GovernmentHeader';
import { Breadcrumb } from './components/layout/Breadcrumb';
import { Sidebar } from './components/layout/Sidebar';
import { GovernmentFooter } from './components/layout/GovernmentFooter';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { DashboardView } from './components/dashboard/DashboardView';
import { CreateBookingFlow } from './components/booking/CreateBookingFlow';
import { QueueTrackerView } from './components/tracking/QueueTrackerView';
import { CentresView } from './components/centres/CentresView';
import { ProcurementPaymentView } from './components/procurement/ProcurementPaymentView';
import { HistoryView } from './components/history/HistoryView';
import { NotificationsView } from './components/notifications/NotificationsView';
import { ProfileView } from './components/account/ProfileView';
import { HelpSupportModal } from './components/modals/HelpSupportModal';
import { SettingsModal } from './components/modals/SettingsModal';
import { AuthModal } from './components/account/AuthModal';

const MainAppContent: React.FC = () => {
  const { activeView } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-['Inter'] antialiased bg-[#F5F8F6] text-[#17231F]">
      {/* Official Government Announcement Strip */}
      <AnnouncementBanner />

      {/* Main Government Header (Section 5) */}
      <GovernmentHeader onOpenSidebar={() => setIsSidebarOpen(true)} />

      {/* Main Layout Area: Left Sidebar (288px) + Right Viewport */}
      <div className="flex flex-1 relative">
        {/* Government Dark Green Sidebar (Section 6 & 7) */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Content Column (Offset by 288px / w-72 on large screens) */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-72 transition-all">
          {/* Breadcrumb Strip immediately below header (Section 8) */}
          <Breadcrumb />

          {/* Main Viewport Container */}
          <main className="flex-1 w-full pb-20 lg:pb-8">
            {activeView === 'dashboard' && <DashboardView />}
            {activeView === 'tracking' && <QueueTrackerView />}
            {activeView === 'booking' && <CreateBookingFlow />}
            {activeView === 'centres' && <CentresView />}
            {activeView === 'procurement' && <ProcurementPaymentView />}
            {activeView === 'history' && <HistoryView />}
            {activeView === 'notifications' && <NotificationsView />}
            {activeView === 'profile' && <ProfileView />}
          </main>

          {/* Official Government Footer (Section 38) */}
          <GovernmentFooter />
        </div>
      </div>

      {/* Mobile Bottom Navigation Dock (Section 27: Home | Book | Queue | History | More) */}
      <MobileBottomNav onOpenMore={() => setIsSidebarOpen(true)} />

      {/* Global Government Modals */}
      <HelpSupportModal />
      <SettingsModal />
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}

export default App;
