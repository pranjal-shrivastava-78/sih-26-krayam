import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  ActiveView,
  FarmerProfile, 
  Booking, 
  ProcurementCentre, 
  CropInfo, 
  ProcurementRecord, 
  PaymentRecord, 
  AppNotification, 
  SlotTimeWindow
} from '../types';
import { 
  INITIAL_CROPS, 
  INITIAL_CENTRES, 
  INITIAL_FARMER_PROFILE, 
  INITIAL_BOOKINGS, 
  INITIAL_PROCUREMENTS, 
  INITIAL_PAYMENTS, 
  INITIAL_NOTIFICATIONS 
} from '../data/mockData';
import { translations, TranslationStrings } from '../i18n/translations';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationStrings) => string;
  
  // Auth & Profile
  farmer: FarmerProfile | null;
  isLoggedIn: boolean;
  login: (farmerIdOrMobile: string) => boolean;
  register: (profileData: {
    fullName: string;
    mobileNumber: string;
    village: string;
    tehsil: string;
    district: string;
    state: string;
    pincode: string;
    landHoldingAcres?: number;
    coordinates?: { lat: number; lng: number };
  }) => FarmerProfile;
  logout: () => void;
  updateProfile: (data: Partial<FarmerProfile>) => void;
  updateFarmerLocation: (location: FarmerProfile['location']) => void;

  // Crops & Centres
  crops: CropInfo[];
  centres: ProcurementCentre[];
  selectedCentre: ProcurementCentre | null;
  setSelectedCentre: (c: ProcurementCentre | null) => void;

  // Bookings & Queue Tracking
  bookings: Booking[];
  activeBooking: Booking | null;
  createBooking: (data: {
    cropId: string;
    quantityQuintals: number;
    expectedDate: string;
    centreId: string;
    slot: SlotTimeWindow;
  }) => Booking;
  cancelBooking: (bookingId: string) => void;
  rescheduleBooking: (bookingId: string, newDate: string, newSlot: SlotTimeWindow) => void;
  advanceQueue: () => void; // Interactive queue simulation tool

  // Procurement & Payment
  procurements: ProcurementRecord[];
  payments: PaymentRecord[];

  // Notifications
  notifications: AppNotification[];
  unreadCount: number;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  
  // Active Navigation View
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;

  // Global Modals
  isHelpModalOpen: boolean;
  setIsHelpModalOpen: (open: boolean) => void;
  isSettingsModalOpen: boolean;
  setIsSettingsModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved state or default
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('kisan_lang') as Language) || 'en';
  });

  const [farmer, setFarmer] = useState<FarmerProfile | null>(() => {
    const saved = localStorage.getItem('kisan_farmer');
    return saved ? JSON.parse(saved) : INITIAL_FARMER_PROFILE;
  });

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('kisan_auth') !== 'false';
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('kisan_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [procurements, setProcurements] = useState<ProcurementRecord[]>(() => {
    const saved = localStorage.getItem('kisan_procurements');
    return saved ? JSON.parse(saved) : INITIAL_PROCUREMENTS;
  });

  const [payments] = useState<PaymentRecord[]>(() => {
    const saved = localStorage.getItem('kisan_payments');
    return saved ? JSON.parse(saved) : INITIAL_PAYMENTS;
  });

  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    const saved = localStorage.getItem('kisan_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  const [centres] = useState<ProcurementCentre[]>(INITIAL_CENTRES);
  const [crops] = useState<CropInfo[]>(INITIAL_CROPS);
  const [selectedCentre, setSelectedCentre] = useState<ProcurementCentre | null>(null);
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('kisan_lang', language);
  }, [language]);

  useEffect(() => {
    if (farmer) {
      localStorage.setItem('kisan_farmer', JSON.stringify(farmer));
    }
  }, [farmer]);

  useEffect(() => {
    localStorage.setItem('kisan_auth', String(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('kisan_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('kisan_procurements', JSON.stringify(procurements));
  }, [procurements]);

  useEffect(() => {
    localStorage.setItem('kisan_notifications', JSON.stringify(notifications));
  }, [notifications]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: keyof TranslationStrings): string => {
    return translations[language]?.[key] || translations.en[key] || String(key);
  };

  const login = (farmerIdOrMobile: string): boolean => {
    // Allows logging in with existing farmer ID or mobile, or restores default
    if (farmer && (farmer.farmerId.toLowerCase() === farmerIdOrMobile.trim().toLowerCase() || farmer.mobileNumber.includes(farmerIdOrMobile.trim()))) {
      setIsLoggedIn(true);
      return true;
    }
    // If entered arbitrary valid looking input
    if (farmerIdOrMobile.trim().length > 3) {
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const register = (data: {
    fullName: string;
    mobileNumber: string;
    village: string;
    tehsil: string;
    district: string;
    state: string;
    pincode: string;
    landHoldingAcres?: number;
    coordinates?: { lat: number; lng: number };
  }): FarmerProfile => {
    const randomIdNum = Math.floor(1000 + Math.random() * 9000);
    const newFarmer: FarmerProfile = {
      farmerId: `FID-2026-${randomIdNum}`,
      fullName: data.fullName,
      mobileNumber: data.mobileNumber,
      location: {
        village: data.village,
        tehsil: data.tehsil,
        district: data.district,
        state: data.state,
        pincode: data.pincode,
        coordinates: data.coordinates || { lat: 30.8358, lng: 76.1917 }
      },
      landHoldingAcres: data.landHoldingAcres || 5,
      registeredDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    setFarmer(newFarmer);
    setIsLoggedIn(true);

    // Add welcome notification
    const welcomeNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'ANNOUNCEMENT',
      title: `Welcome, ${data.fullName}!`,
      message: `Your Farmer ID is ${newFarmer.farmerId}. You are now registered to book grain procurement slots at any district mandi.`,
      timestamp: 'Just now',
      read: false
    };
    setNotifications(prev => [welcomeNotif, ...prev]);

    return newFarmer;
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  const updateProfile = (data: Partial<FarmerProfile>) => {
    setFarmer(prev => (prev ? { ...prev, ...data } : null));
  };

  const updateFarmerLocation = (location: FarmerProfile['location']) => {
    setFarmer(prev => (prev ? { ...prev, location } : null));
  };

  // Active booking is the latest active booking
  const activeBooking = bookings.find(b => 
    b.status === 'CONFIRMED' || b.status === 'IN_QUEUE' || b.status === 'TURN_APPROACHING' || b.status === 'RESCHEDULED'
  ) || null;

  const createBooking = (data: {
    cropId: string;
    quantityQuintals: number;
    expectedDate: string;
    centreId: string;
    slot: SlotTimeWindow;
  }): Booking => {
    const crop = crops.find(c => c.id === data.cropId) || crops[0];
    const centre = centres.find(c => c.id === data.centreId) || centres[0];
    const randomBookingNum = Math.floor(1000 + Math.random() * 9000);
    const bookingId = `BK-2026-${randomBookingNum}`;

    const newBooking: Booking = {
      id: bookingId,
      farmerId: farmer?.farmerId || 'FID-2026-TEMP',
      farmerName: farmer?.fullName || 'Farmer',
      farmerMobile: farmer?.mobileNumber || '+91 9876543210',
      cropId: data.cropId,
      cropName: crop.name,
      quantityQuintals: data.quantityQuintals,
      expectedDate: data.expectedDate,
      centreId: data.centreId,
      centreName: centre.name,
      centreLocation: `${centre.location.address} (${centre.distanceKm} km)`,
      slot: data.slot,
      status: 'CONFIRMED',
      createdAt: new Date().toISOString().slice(0, 16).replace('T', ' '),
      queuePosition: centre.currentQueue.activeVehicles + 1,
      farmersAhead: centre.currentQueue.activeVehicles,
      estimatedWaitMinutes: centre.currentQueue.estimatedWaitMins,
      isRescheduled: false,
      rescheduleCount: 0
    };

    setBookings(prev => [newBooking, ...prev]);

    // Create corresponding procurement record in Scheduled status
    const newProcurement: ProcurementRecord = {
      id: `PRC-2026-${randomBookingNum}`,
      bookingId: bookingId,
      farmerId: newBooking.farmerId,
      cropName: crop.name.split(' ')[0],
      date: data.expectedDate,
      centreName: centre.name,
      bookedQuantity: data.quantityQuintals,
      acceptedQuantity: data.quantityQuintals,
      deductionReason: 'Scheduled - pending weighbridge inspection',
      qualityGrade: 'Standard',
      procurementStatus: 'Scheduled',
      paymentStatus: 'Pending',
      paymentAmount: data.quantityQuintals * crop.mspPerQuintal
    };
    setProcurements(prev => [newProcurement, ...prev]);

    // Send booking notification
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'BOOKING',
      title: `Booking Confirmed: ${bookingId}`,
      message: `Booked ${data.quantityQuintals} Qtl ${crop.name} for ${data.expectedDate} (${data.slot}) at ${centre.name}.`,
      timestamp: 'Just now',
      read: false,
      referenceId: bookingId
    };
    setNotifications(prev => [newNotif, ...prev]);

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          status: 'CANCELLED',
          queuePosition: undefined,
          farmersAhead: undefined,
          estimatedWaitMinutes: undefined
        };
      }
      return b;
    }));

    const cancelNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'BOOKING',
      title: `Booking Cancelled: ${bookingId}`,
      message: `Your procurement slot for booking ${bookingId} has been cancelled successfully.`,
      timestamp: 'Just now',
      read: false,
      referenceId: bookingId
    };
    setNotifications(prev => [cancelNotif, ...prev]);
  };

  const rescheduleBooking = (bookingId: string, newDate: string, newSlot: SlotTimeWindow) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return {
          ...b,
          expectedDate: newDate,
          slot: newSlot,
          status: 'RESCHEDULED',
          isRescheduled: true,
          rescheduleCount: (b.rescheduleCount || 0) + 1,
          queuePosition: 4,
          farmersAhead: 3,
          estimatedWaitMinutes: 30
        };
      }
      return b;
    }));

    const rescheduleNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'BOOKING',
      title: `Booking Rescheduled: ${bookingId}`,
      message: `Your booking ${bookingId} has been rescheduled to ${newDate}, slot: ${newSlot}.`,
      timestamp: 'Just now',
      read: false,
      referenceId: bookingId
    };
    setNotifications(prev => [rescheduleNotif, ...prev]);
  };

  // Queue simulation: advances the queue position for active booking
  const advanceQueue = () => {
    if (!activeBooking || !activeBooking.queuePosition) return;
    const currentPos = activeBooking.queuePosition;
    if (currentPos <= 1) {
      // Completed / Processing
      setBookings(prev => prev.map(b => {
        if (b.id === activeBooking.id) {
          return {
            ...b,
            status: 'PROCESSING',
            queuePosition: 1,
            farmersAhead: 0,
            estimatedWaitMinutes: 5
          };
        }
        return b;
      }));

      const alertNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        type: 'QUEUE',
        title: 'Now Serving: Your Vehicle at Weighing Bay',
        message: 'Your vehicle has entered the weighbridge. Quality inspection is in progress.',
        timestamp: 'Just now',
        read: false,
        referenceId: activeBooking.id,
        priority: 'urgent'
      };
      setNotifications(prev => [alertNotif, ...prev]);
      return;
    }

    const nextPos = currentPos - 1;
    const nextWait = Math.max(5, (nextPos - 1) * 10);
    const isApproaching = nextPos <= 2;

    setBookings(prev => prev.map(b => {
      if (b.id === activeBooking.id) {
        return {
          ...b,
          queuePosition: nextPos,
          farmersAhead: nextPos - 1,
          estimatedWaitMinutes: nextWait,
          status: isApproaching ? 'TURN_APPROACHING' : 'IN_QUEUE'
        };
      }
      return b;
    }));

    // Generate Queue Notification
    const queueNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'QUEUE',
      title: isApproaching 
        ? '⚠️ TURN APPROACHING: You are next in line!' 
        : `Queue Update: Position #${nextPos}`,
      message: isApproaching
        ? `Only ${nextPos - 1} vehicle ahead of you at ${activeBooking.centreName}. Please proceed to the main gate with your Farmer ID.`
        : `Your position has advanced to #${nextPos}. Estimated wait time: ${nextWait} minutes.`,
      timestamp: 'Just now',
      read: false,
      referenceId: activeBooking.id,
      priority: isApproaching ? 'urgent' : 'normal'
    };
    setNotifications(prev => [queueNotif, ...prev]);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        farmer,
        isLoggedIn,
        login,
        register,
        logout,
        updateProfile,
        updateFarmerLocation,
        crops,
        centres,
        selectedCentre,
        setSelectedCentre,
        bookings,
        activeBooking,
        createBooking,
        cancelBooking,
        rescheduleBooking,
        advanceQueue,
        procurements,
        payments,
        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        activeView,
        setActiveView,
        isHelpModalOpen,
        setIsHelpModalOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
