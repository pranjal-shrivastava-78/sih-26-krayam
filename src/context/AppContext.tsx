import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { 
  Language, 
  ActiveView,
  FarmerProfile, 
  Booking, 
  BookingStatus,
  ProcurementCentre, 
  CropInfo, 
  ProcurementRecord, 
  PaymentRecord, 
  AppNotification, 
  SlotTimeWindow,
  UserRole,
  OperatorProfile,
  OperatorView,
  SyncOperation
} from '../types';
import { translations, TranslationStrings } from '../i18n/translations';
import api, { ApiError, BackendOperator, BackendQueueEntry, BackendQueueSummary, OperatorDashboardData, SyncEventIn } from '../services/api';
import { realtimeService, RealtimeStatus, BackendEvent } from '../services/realtime';
import { offlineDb, OfflineActionRecord } from '../services/db';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof TranslationStrings) => string;
  
  // Auth & Profile
  farmer: FarmerProfile | null;
  isLoggedIn: boolean;
  authStatus: 'initializing' | 'authenticated' | 'unauthenticated';
  isAuthLoading: boolean;
  authError: string | null;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  switchRole: (role: UserRole) => void;
  operator: OperatorProfile | null;
  operatorLogin: (operatorIdOrPhone: string, passwordOrPin?: string, centreId?: string) => Promise<boolean>;
  operatorRegister: (data: {
    name: string;
    phone: string;
    password: string;
    centre_id: string;
    serviceKey?: string;
  }) => Promise<BackendOperator>;
  operatorActiveTab: OperatorView;
  setOperatorActiveTab: (tab: OperatorView) => void;
  login: (farmerIdOrMobile: string, otpCode?: string) => Promise<boolean>;
  sendOtp: (phone: string) => Promise<{ success: boolean; message: string }>;
  verifyOtp: (phone: string, code: string) => Promise<{ token: string | null; isRegistered: boolean }>;
  register: (data: {
    fullName: string;
    mobileNumber: string;
    village: string;
    tehsil: string;
    district: string;
    state: string;
    pincode: string;
    landHoldingAcres?: number;
    coordinates?: { lat: number; lng: number };
  }) => Promise<FarmerProfile>;
  logout: () => void;
  updateProfile: (data: Partial<FarmerProfile>) => void;
  updateFarmerLocation: (location: FarmerProfile['location']) => void;

  // Catalog & Centres
  crops: CropInfo[];
  centres: ProcurementCentre[];
  selectedCentre: ProcurementCentre | null;
  setSelectedCentre: (centre: ProcurementCentre | null) => void;

  // Data Loading & State Management
  isLoadingData: boolean;
  dataError: string | null;
  refreshFarmerData: () => Promise<void>;
  refreshOperatorData: () => Promise<void>;

  // Bookings & Real Backend Queue
  bookings: Booking[];
  activeBooking: Booking | null;
  createBooking: (data: {
    cropId: string;
    quantityQuintals: number;
    expectedDate: string;
    centreId: string;
    slotId?: string | null;
    slot: SlotTimeWindow;
  }) => Promise<Booking>;
  cancelBooking: (bookingId: string) => Promise<void>;
  rescheduleBooking: (
    bookingId: string,
    newDate: string,
    newSlot: SlotTimeWindow,
    newSlotId?: string | null
  ) => Promise<void>;

  // Realtime Updates & Queue Management
  realtimeStatus: RealtimeStatus;
  lastQueueUpdate: string | null;
  queueSummary: BackendQueueSummary | null;
  operatorQueueEntries: BackendQueueEntry[];
  refreshQueue: () => Promise<void>;

  // Procurement & Payment
  procurements: ProcurementRecord[];
  payments: PaymentRecord[];

  // Operator Dashboard & Analytics Telemetry
  operatorDashboardData: OperatorDashboardData | null;
  refreshOperatorDashboard: () => Promise<void>;

  // Operator Actions & Queue Floor
  operatorCheckIn: (bookingId: string) => Promise<void>;
  operatorCallNext: () => Promise<Booking | null>;
  operatorStartProcessing: (bookingIdOrQueueEntryId: string) => Promise<void>;
  operatorCompleteProcessing: (bookingIdOrQueueEntryId: string) => Promise<void>;
  operatorMarkNoShow: (bookingIdOrQueueEntryId: string) => Promise<void>;
  operatorCompleteProcurement: (data: {
    bookingId: string;
    grossWeight: number;
    tareWeight: number;
    netWeight: number;
    moisturePercent: number;
    qualityGrade: 'Grade A' | 'Grade B' | 'Standard';
    deductions?: number;
    deductionReason?: string;
  }) => Promise<ProcurementRecord>;
  operatorConfirmPayment: (paymentId: string) => Promise<void>;
  refreshOperatorPayments: () => Promise<void>;
  operatorCancelBooking: (bookingId: string, reason: string) => void;
  operatorRescheduleBooking: (bookingId: string, newDate: string, newSlot: SlotTimeWindow) => void;

  // Offline Synchronization Mode
  isOffline: boolean;
  setIsOffline: (offline: boolean) => void;
  toggleOfflineMode: () => void;
  syncQueue: SyncOperation[];
  lastSyncTime: string;
  isSyncing: boolean;
  syncOfflineQueue: () => Promise<void>;

  // SMS Gateway / NLP Modal
  isSmsModalOpen: boolean;
  setIsSmsModalOpen: (open: boolean) => void;

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
  isTcModalOpen: boolean;
  setIsTcModalOpen: (open: boolean) => void;
  isPrivacyModalOpen: boolean;
  setIsPrivacyModalOpen: (open: boolean) => void;
  isCookieModalOpen: boolean;
  setIsCookieModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load UI preferences from localStorage (clean non-business state)
  const [language, setLanguageState] = useState<Language>(() => {
    return (localStorage.getItem('kisan_lang') as Language) || 'en';
  });

  const [userRole, setUserRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem('kisan_role') as UserRole) || 'farmer';
  });

  // Auth & Profile state (Authoritative source: FastAPI backend)
  const [authStatus, setAuthStatus] = useState<'initializing' | 'authenticated' | 'unauthenticated'>('initializing');
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [farmer, setFarmer] = useState<FarmerProfile | null>(null);
  const [operator, setOperator] = useState<OperatorProfile | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  // Operational business state (Authoritative source: FastAPI backend)
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [procurements, setProcurements] = useState<ProcurementRecord[]>([]);
  const [payments, setPayments] = useState<PaymentRecord[]>([]);
  const [operatorDashboardData, setOperatorDashboardData] = useState<OperatorDashboardData | null>(null);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [centres, setCentres] = useState<ProcurementCentre[]>([]);
  const [crops, setCrops] = useState<CropInfo[]>([]);
  const [selectedCentre, setSelectedCentre] = useState<ProcurementCentre | null>(null);

  // Realtime & Queue Telemetry state
  const [realtimeStatus, setRealtimeStatus] = useState<RealtimeStatus>('disconnected');
  const [lastQueueUpdate, setLastQueueUpdate] = useState<string | null>(null);
  const [queueSummary, setQueueSummary] = useState<BackendQueueSummary | null>(null);
  const [operatorQueueEntries, setOperatorQueueEntries] = useState<BackendQueueEntry[]>([]);
  const isPollingRef = useRef<boolean>(false);

  // Loading & Error states
  const [isLoadingData, setIsLoadingData] = useState<boolean>(false);
  const [dataError, setDataError] = useState<string | null>(null);

  // Operator UI state
  const [operatorActiveTab, setOperatorActiveTab] = useState<OperatorView>('dashboard');
  const [isOffline, setIsOfflineState] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncQueue, setSyncQueue] = useState<SyncOperation[]>([]);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Live Sync Active');

  // Navigation & Modals
  const [activeView, setActiveView] = useState<ActiveView>('dashboard');
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState<boolean>(false);
  const [isSmsModalOpen, setIsSmsModalOpen] = useState<boolean>(false);
  const [isTcModalOpen, setIsTcModalOpen] = useState<boolean>(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState<boolean>(false);
  const [isCookieModalOpen, setIsCookieModalOpen] = useState<boolean>(false);

  // Persist only UI configuration in localStorage (Rule 11)
  useEffect(() => {
    localStorage.setItem('kisan_lang', language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const setUserRole = (role: UserRole) => {
    setUserRoleState(role);
    localStorage.setItem('kisan_role', role);
  };

  const switchRole = (role: UserRole) => {
    setUserRole(role);
  };

  const t = (key: keyof TranslationStrings): string => {
    return translations[language]?.[key] || translations.en[key] || String(key);
  };

  // Fetch farmer profile, bookings, and notifications from FastAPI backend
  const refreshFarmerData = useCallback(async () => {
    if (!api.getToken()) return;

    setIsLoadingData(true);
    setDataError(null);

    try {
      const profile = await api.auth.getMe();
      if (profile) {
        setFarmer(profile);
      }
    } catch (err: any) {
      console.warn('Backend getMe error:', err.message);
    }

    try {
      const backendBookings = await api.bookings.getMyBookings();
      if (backendBookings) {
        setBookings(backendBookings);
      }
    } catch (err: any) {
      console.warn('Backend getMyBookings error:', err.message);
    }

    try {
      const backendNotifications = await api.notifications.getAll();
      if (backendNotifications) {
        setNotifications(backendNotifications);
      }
    } catch (err: any) {
      console.warn('Backend notifications error:', err.message);
    } finally {
      setIsLoadingData(false);
      setLastQueueUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, []);

  // Fetch operator queue summary for current centre
  const refreshQueue = useCallback(async () => {
    const centreId = operator?.centreId || selectedCentre?.id || centres[0]?.id;
    if (!centreId) return;

    try {
      const summary = await api.queue.getSummary(centreId);
      if (summary) {
        setQueueSummary(summary);
        setOperatorQueueEntries(summary.waiting || []);
        setLastQueueUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

        // Correlate queue entries with bookings in state if any
        if (summary.waiting && summary.waiting.length > 0) {
          setBookings((prev) =>
            prev.map((b) => {
              const matchedEntry = summary.waiting.find(
                (w) => w.booking_id === b.uuid || w.booking_id === b.id
              );
              if (matchedEntry) {
                let derivedStatus: BookingStatus = b.status;
                if (matchedEntry.status === 'called') derivedStatus = 'TURN_APPROACHING';
                else if (matchedEntry.status === 'processing') derivedStatus = 'PROCESSING';
                else if (matchedEntry.status === 'completed') derivedStatus = 'COMPLETED';
                else if (matchedEntry.status === 'no_show') derivedStatus = 'NO_SHOW';
                else if (matchedEntry.status === 'waiting') derivedStatus = 'IN_QUEUE';

                return {
                  ...b,
                  queueEntryId: matchedEntry.id,
                  queuePosition: matchedEntry.position,
                  farmersAhead: Math.max(0, matchedEntry.position - 1),
                  status: derivedStatus,
                };
              }
              return b;
            })
          );
        }
      }
    } catch (err: any) {
      console.warn('[Queue] Failed to fetch queue summary:', err.message);
    }
  }, [operator?.centreId, selectedCentre?.id, centres]);

  // Fetch operator payments from backend
  const refreshOperatorPayments = useCallback(async () => {
    if (!api.getOperatorToken()) return;
    try {
      const paymentData = await api.payments.getAll();
      if (paymentData && paymentData.items) {
        const mappedPayments: PaymentRecord[] = paymentData.items.map((item) => ({
          id: item.payment_id || item.id,
          uuid: item.id,
          transactionId: item.payment_id || item.id,
          procurementId: item.procurement_id,
          bookingId: item.booking_id || '',
          farmerId: item.farmer_id,
          farmerName: item.farmer_name,
          farmerMobile: item.farmer_phone,
          cropName: 'Produce',
          quantity: item.quantity,
          rate: item.rate,
          amount: item.amount,
          date: new Date(item.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
          paymentStatus: item.status,
          anomalyFlags: item.anomaly_flags,
          verifiedBy: item.verified_by,
          verifiedAt: item.verified_at,
          confirmedAt: item.confirmed_at,
        }));
        setPayments(mappedPayments);
      }
    } catch (payErr: any) {
      console.warn('[Operator] Payments refresh notice:', payErr.message);
    }
  }, []);

  // Fetch operator dashboard metrics from backend
  const refreshOperatorDashboard = useCallback(async () => {
    if (!api.getOperatorToken()) return;
    try {
      const data = await api.operator.getDashboard();
      if (data) {
        setOperatorDashboardData(data);
      }
    } catch (err: any) {
      console.warn('[Operator] Dashboard load notice:', err.message);
    }
  }, []);

  // Fetch operator bookings, queue, payments, and dashboard metrics
  const refreshOperatorData = useCallback(async () => {
    if (!api.getOperatorToken()) return;
    setIsLoadingData(true);
    try {
      const opBookings = await api.operator.getBookings();
      if (opBookings) {
        setBookings(opBookings);
      }
      await refreshQueue();
      await refreshOperatorPayments();
      await refreshOperatorDashboard();
      setLastQueueUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err: any) {
      console.warn('[Operator] Refresh error:', err.message);
    } finally {
      setIsLoadingData(false);
    }
  }, [refreshQueue, refreshOperatorPayments, refreshOperatorDashboard]);

  // Realtime SSE lifecycle: Listen to events and connection status
  useEffect(() => {
    const unsubStatus = realtimeService.onStatusChange(setRealtimeStatus);

    const unsubEvents = realtimeService.subscribeAll((_event: BackendEvent) => {
      setLastQueueUpdate(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      if (userRole === 'farmer') {
        refreshFarmerData();
      } else {
        refreshOperatorData();
      }
    });

    return () => {
      unsubStatus();
      unsubEvents();
    };
  }, [userRole, refreshFarmerData, refreshOperatorData]);

  // Connect or disconnect realtime stream based on auth and role
  useEffect(() => {
    if (isLoggedIn) {
      if (userRole === 'farmer' && api.getToken()) {
        realtimeService.connect({ role: 'farmer', token: api.getToken()! });
      } else if (userRole === 'operator' && api.getOperatorToken()) {
        const centreId = operator?.centreId || selectedCentre?.id || centres[0]?.id;
        if (centreId) {
          realtimeService.connect({ role: 'operator', token: api.getOperatorToken()!, centreId });
        }
      }
    } else {
      realtimeService.disconnect();
    }
  }, [isLoggedIn, userRole, operator?.centreId, selectedCentre?.id, centres]);

  // Controlled Polling: Robust fallback when tracking active booking or managing operator queue
  useEffect(() => {
    if (!isLoggedIn) return;

    const interval = setInterval(async () => {
      // Pause polling if browser tab is hidden
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') {
        return;
      }

      // Prevent overlapping concurrent requests
      if (isPollingRef.current) {
        return;
      }

      if (userRole === 'farmer') {
        // Only poll if there's an active non-terminal booking
        const terminalStatuses: BookingStatus[] = ['COMPLETED', 'CANCELLED', 'NO_SHOW'];
        const currentActive = bookings.find((b) =>
          ['CONFIRMED', 'IN_QUEUE', 'TURN_APPROACHING', 'CHECKED_IN', 'PROCESSING', 'RESCHEDULED'].includes(b.status)
        );
        if (!currentActive || terminalStatuses.includes(currentActive.status)) {
          return;
        }

        isPollingRef.current = true;
        try {
          await refreshFarmerData();
        } catch (err: any) {
          console.warn('[ControlledPolling] Farmer poll failed:', err.message);
        } finally {
          isPollingRef.current = false;
        }
      } else if (userRole === 'operator') {
        // Poll when viewing operator queue, dashboard, payments, or procurement
        if (
          operatorActiveTab !== 'queue' &&
          operatorActiveTab !== 'dashboard' &&
          operatorActiveTab !== 'payments' &&
          operatorActiveTab !== 'procurement'
        ) {
          return;
        }

        isPollingRef.current = true;
        try {
          await refreshOperatorData();
        } catch (err: any) {
          console.warn('[ControlledPolling] Operator poll failed:', err.message);
        } finally {
          isPollingRef.current = false;
        }
      }
    }, 10000); // 10s safe interval

    return () => clearInterval(interval);
  }, [isLoggedIn, userRole, bookings, operatorActiveTab, refreshFarmerData, refreshOperatorData]);

  // Load sync queue and metadata from IndexedDB on startup
  useEffect(() => {
    let isMounted = true;
    const initOfflineStorage = async () => {
      try {
        const storedActions = await offlineDb.getAllActions();
        if (isMounted && storedActions.length > 0) {
          const mapped: SyncOperation[] = storedActions.map((a) => ({
            id: a.id,
            actionType: a.actionType as any,
            timestamp: new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            bookingId: a.entityId,
            details: a.details || `${a.actionType} for ${a.entityId}`,
            payload: a.payload,
            status: a.status,
            retryCount: a.retryCount,
            lastError: a.lastError,
          }));
          setSyncQueue(mapped);
        }

        const lastSync = await offlineDb.getMetadata<string>('lastSuccessfulSync');
        if (isMounted && lastSync) {
          setLastSyncTime(new Date(lastSync).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Confirmed)');
        }
      } catch (err) {
        console.warn('[OfflineDB] Initialization error:', err);
      }
    };

    initOfflineStorage();
    return () => {
      isMounted = false;
    };
  }, []);

  // Real network reachability and event listeners
  useEffect(() => {
    let isMounted = true;

    const handleOnline = async () => {
      const isHealthy = await api.checkBackendHealth();
      if (isMounted) {
        if (isHealthy) {
          setIsOfflineState(false);
          // Auto-trigger sync when connectivity returns
          syncOfflineQueue();
        } else {
          setIsOfflineState(true);
        }
      }
    };

    const handleOffline = () => {
      if (isMounted) {
        setIsOfflineState(true);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOfflineState(true);
    }

    return () => {
      isMounted = false;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Load live centres and crops catalog from FastAPI backend on mount (with IndexedDB fallback)
  useEffect(() => {
    let isMounted = true;
    const fetchCatalog = async () => {
      // 1. Hydrate from IndexedDB operational cache first
      try {
        const cachedCentres = await offlineDb.getOperationalData<ProcurementCentre[]>('centres');
        if (isMounted && cachedCentres && cachedCentres.length > 0) {
          setCentres(cachedCentres);
          setSelectedCentre((prev) => prev || cachedCentres[0]);
        }
        const cachedCrops = await offlineDb.getOperationalData<CropInfo[]>('crops');
        if (isMounted && cachedCrops && cachedCrops.length > 0) {
          setCrops(cachedCrops);
        }
      } catch (e) {
        // ignore
      }

      // 2. Fetch fresh from backend and update IndexedDB cache
      try {
        const liveCentres = await api.centres.getAll();
        if (isMounted && liveCentres && liveCentres.length > 0) {
          setCentres(liveCentres);
          setSelectedCentre((prev) => prev || liveCentres[0]);
          await offlineDb.setOperationalData('centres', liveCentres);
        }
      } catch (err: any) {
        console.warn('Backend centres load notice:', err.message);
      }

      try {
        const liveCrops = await api.crops.getAll();
        if (isMounted && liveCrops && liveCrops.length > 0) {
          setCrops(liveCrops);
          await offlineDb.setOperationalData('crops', liveCrops);
        }
      } catch (err: any) {
        console.warn('Backend crops load notice:', err.message);
      }
    };

    fetchCatalog();
    return () => {
      isMounted = false;
    };
  }, []);

  // On mount, check stored session and load authenticated profile from backend
  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const token = api.getToken();
      const opToken = api.getOperatorToken();

      if (token) {
        setIsAuthLoading(true);
        try {
          const profile = await api.auth.getMe();
          if (isMounted) {
            if (profile) {
              setFarmer(profile);
              setIsLoggedIn(true);
              setAuthStatus('authenticated');
              setUserRoleState('farmer');
              await offlineDb.setOperationalData('farmer_profile', profile);
              await refreshFarmerData();
            } else {
              api.auth.logout();
              setIsLoggedIn(false);
              setFarmer(null);
              setAuthStatus('unauthenticated');
            }
          }
        } catch (err: any) {
          if (isMounted) {
            console.warn('Initial session validation notice:', err.message);
            const isOfflineOrNetwork = !navigator.onLine || err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError');
            if (isOfflineOrNetwork) {
              const cachedFarmer = await offlineDb.getOperationalData<FarmerProfile>('farmer_profile');
              if (cachedFarmer) {
                setFarmer(cachedFarmer);
                setIsLoggedIn(true);
                setAuthStatus('authenticated');
                setIsOfflineState(true);
                setIsAuthLoading(false);
                return;
              }
            }
            api.auth.logout();
            setIsLoggedIn(false);
            setFarmer(null);
            setAuthStatus('unauthenticated');
          }
        } finally {
          if (isMounted) {
            setIsAuthLoading(false);
          }
        }
      } else if (opToken) {
        if (isMounted) {
          setIsLoggedIn(true);
          setAuthStatus('authenticated');
          setUserRoleState('operator');
          try {
            const rawOp = localStorage.getItem('krayam_operator_profile');
            if (rawOp) {
              const parsedOp = JSON.parse(rawOp);
              setOperator(parsedOp);
            }
          } catch (e) {
            // ignore
          }
          refreshOperatorData().catch((err) => console.warn('Init operator refresh error:', err));
        }
      } else {
        if (isMounted) {
          setIsLoggedIn(false);
          setFarmer(null);
          setAuthStatus('unauthenticated');
        }
      }
    };

    initAuth();

    return () => {
      isMounted = false;
    };
  }, [refreshFarmerData]);

  // Auth: Send OTP via backend
  const sendOtp = async (phone: string): Promise<{ success: boolean; message: string }> => {
    setAuthError(null);
    setIsAuthLoading(true);
    try {
      return await api.auth.sendOtp(phone);
    } catch (err: any) {
      setAuthError(err.message || 'Failed to send OTP');
      throw err;
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Auth: Verify OTP via backend
  const verifyOtp = async (phone: string, code: string) => {
    setUserRole('farmer');
    setIsAuthLoading(true);
    setAuthError(null);

    try {
      const res = await api.auth.verifyOtp(phone, code);
      if (res.token && res.isRegistered) {
        let profile = res.farmerProfile;
        if (!profile) {
          try {
            const me = await api.auth.getMe();
            if (me) profile = me;
          } catch {}
        }
        if (profile) {
          setFarmer(profile);
          setIsLoggedIn(true);
          setAuthStatus('authenticated');
          await refreshFarmerData();
        }
      }
      return res;
    } catch (err: any) {
      setAuthError(err.message || 'OTP verification failed.');
      throw err;
    } finally {
      setIsAuthLoading(false);
    }
  };

  // Auth: Login via backend
  const login = async (farmerIdOrMobile: string, otpCode?: string): Promise<boolean> => {
    setUserRole('farmer');
    const cleanInput = farmerIdOrMobile.trim();

    if (otpCode && otpCode.trim()) {
      const res = await verifyOtp(cleanInput, otpCode.trim());
      if (res.token && res.isRegistered) {
        return true;
      }
      if (res.token && !res.isRegistered) {
        // Authenticated phone session acquired, but farmer profile not yet registered
        return false;
      }
      throw new ApiError('Invalid OTP code. Please try again.', 'AUTH_ERROR');
    }

    if (api.getToken()) {
      try {
        const me = await api.auth.getMe();
        if (me) {
          setFarmer(me);
          setIsLoggedIn(true);
          setAuthStatus('authenticated');
          await refreshFarmerData();
          return true;
        }
      } catch {}
    }

    throw new ApiError('Please provide OTP for authentication.', 'AUTH_ERROR');
  };

  // Auth: Registration (Direct call to backend /auth/register)
  const register = async (data: {
    fullName: string;
    mobileNumber: string;
    village: string;
    tehsil: string;
    district: string;
    state: string;
    pincode: string;
    landHoldingAcres?: number;
    coordinates?: { lat: number; lng: number };
  }): Promise<FarmerProfile> => {
    setUserRole('farmer');
    setIsAuthLoading(true);
    setAuthError(null);

    try {
      const backendFarmer = await api.auth.register({
        name: data.fullName,
        village: data.village || undefined,
        district: data.district || undefined,
        state: data.state || undefined,
        pincode: data.pincode || undefined,
        latitude: data.coordinates?.lat,
        longitude: data.coordinates?.lng,
      });

      setFarmer(backendFarmer);
      setIsLoggedIn(true);
      setAuthStatus('authenticated');

      const welcomeNotif: AppNotification = {
        id: `notif-${Date.now()}`,
        type: 'ANNOUNCEMENT',
        title: `Welcome, ${backendFarmer.fullName}!`,
        message: `Your Farmer ID is ${backendFarmer.farmerId}. Registered on KRAYAM backend.`,
        timestamp: 'Just now',
        read: false,
      };
      setNotifications(prev => [welcomeNotif, ...prev]);
      return backendFarmer;
    } catch (err: any) {
      setAuthError(err.message || 'Registration failed');
      throw err;
    } finally {
      setIsAuthLoading(false);
    }
  };

  const logout = () => {
    api.auth.logout();
    setIsLoggedIn(false);
    setAuthStatus('unauthenticated');
    setFarmer(null);
    setOperator(null);
    setBookings([]);
    setProcurements([]);
    setPayments([]);
    setNotifications([]);
    setActiveView('dashboard');
  };

  const updateProfile = (data: Partial<FarmerProfile>) => {
    setFarmer(prev => (prev ? { ...prev, ...data } : null));
    if (api.getToken()) {
      api.auth.updateMe({
        name: data.fullName,
        village: data.location?.village,
        district: data.location?.district,
        state: data.location?.state,
        pincode: data.location?.pincode,
        latitude: data.location?.coordinates?.latitude || data.location?.coordinates?.lat,
        longitude: data.location?.coordinates?.longitude || data.location?.coordinates?.lng,
      }).catch(err => console.warn('Backend updateMe notice:', err));
    }
  };

  const updateFarmerLocation = (location: FarmerProfile['location']) => {
    setFarmer(prev => (prev ? { ...prev, location } : null));
    if (api.getToken() && location.coordinates) {
      const lat = location.coordinates.latitude ?? location.coordinates.lat;
      const lng = location.coordinates.longitude ?? location.coordinates.lng;
      if (lat !== undefined && lng !== undefined) {
        api.auth.updateMe({
          latitude: lat,
          longitude: lng,
          village: location.village,
          district: location.district,
          state: location.state,
          pincode: location.pincode,
        }).catch(err => console.warn('Backend updateMe coordinates notice:', err));
      }
    }
  };

  // Active booking is the latest active booking from server records
  const activeBooking = bookings.find(b => 
    b.status === 'CONFIRMED' || b.status === 'IN_QUEUE' || b.status === 'TURN_APPROACHING' || b.status === 'RESCHEDULED' || b.status === 'CHECKED_IN'
  ) || null;

  // Bookings: Create via FastAPI backend
  const createBooking = async (data: {
    cropId: string;
    quantityQuintals: number;
    expectedDate: string;
    centreId: string;
    slotId?: string | null;
    slot: SlotTimeWindow;
  }): Promise<Booking> => {
    const crop = crops.find(c => c.id === data.cropId) || crops.find(c => c.name.toLowerCase() === data.cropId.toLowerCase()) || crops[0];
    const centre = centres.find(c => c.id === data.centreId) || centres[0];

    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.centreId);
    const centreIdToSend = isUuid ? data.centreId : null;

    const isSlotUuid = data.slotId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(data.slotId);
    const slotIdToSend = isSlotUuid ? data.slotId : null;

    const backendBooking = await api.bookings.create({
      crop: crop?.name || 'Grain',
      quantity: data.quantityQuintals,
      unit: crop?.unit || 'quintal',
      expectedDate: data.expectedDate,
      centreId: centreIdToSend,
      slotId: slotIdToSend,
      slotWindow: data.slot,
    });

    const fullBooking: Booking = {
      ...backendBooking,
      farmerId: farmer?.farmerId || backendBooking.farmerId,
      farmerName: farmer?.fullName || 'Farmer',
      farmerMobile: farmer?.mobileNumber || '',
      centreName: centre?.name || backendBooking.centreName || 'Procurement Centre',
      centreLocation: centre?.location?.address || 'Mandi Yard',
      slot: data.slot || backendBooking.slot,
      status: backendBooking.status || 'CONFIRMED',
      queuePosition: undefined,
      farmersAhead: undefined,
      estimatedWaitMinutes: undefined,
    };

    setBookings(prev => [fullBooking, ...prev.filter(b => b.id !== fullBooking.id)]);

    const newNotif: AppNotification = {
      id: `notif-${Date.now()}`,
      type: 'BOOKING',
      title: `Booking Confirmed: ${fullBooking.id}`,
      message: `Booked ${data.quantityQuintals} Qtl ${fullBooking.cropName} for ${data.expectedDate} (${data.slot}) at ${fullBooking.centreName}.`,
      timestamp: 'Just now',
      read: false,
      referenceId: fullBooking.id,
    };
    setNotifications(prev => [newNotif, ...prev]);

    return fullBooking;
  };

  // Bookings: Cancel via FastAPI backend
  const cancelBooking = async (bookingId: string): Promise<void> => {
    const updated = await api.bookings.cancel(bookingId);

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId || (b.uuid && b.uuid === updated.uuid)) {
        return {
          ...b,
          ...updated,
          status: 'CANCELLED',
          queuePosition: undefined,
          farmersAhead: undefined,
          estimatedWaitMinutes: undefined,
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
      referenceId: bookingId,
    };
    setNotifications(prev => [cancelNotif, ...prev]);
  };

  // Bookings: Reschedule via FastAPI backend
  const rescheduleBooking = async (
    bookingId: string,
    newDate: string,
    newSlot: SlotTimeWindow,
    newSlotId?: string | null
  ): Promise<void> => {
    const isSlotUuid = newSlotId && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(newSlotId);
    const existing = bookings.find(b => b.id === bookingId);

    const updated = await api.bookings.reschedule(bookingId, {
      expectedDate: newDate,
      centreId: existing?.centreId,
      slotId: isSlotUuid ? newSlotId : null,
      slotWindow: newSlot,
    });

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId || (b.uuid && b.uuid === updated.uuid)) {
        return {
          ...b,
          ...updated,
          expectedDate: newDate,
          slot: newSlot,
          status: 'RESCHEDULED',
          isRescheduled: true,
          rescheduleCount: (b.rescheduleCount || 0) + 1,
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
      referenceId: bookingId,
    };
    setNotifications(prev => [rescheduleNotif, ...prev]);
  };

  const markNotificationAsRead = async (id: string) => {
    try {
      if (api.getToken()) {
        await api.notifications.markRead(id);
      }
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err: any) {
      console.warn('Backend markRead notice:', err.message);
    }
  };

  const markAllNotificationsAsRead = async () => {
    try {
      if (api.getToken()) {
        await api.notifications.markAllRead();
      }
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err: any) {
      console.warn('Backend markAllRead notice:', err.message);
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  // --- OPERATOR FUNCTIONS (Eliminated fake OP-SAMRALA-01 fallback) ---
  const operatorLogin = async (operatorIdOrPhone: string, passwordOrPin?: string, _centreId?: string): Promise<boolean> => {
    if (!operatorIdOrPhone.trim()) {
      return false;
    }

    const res = await api.auth.operatorLogin(operatorIdOrPhone.trim(), passwordOrPin || '');
    if (res.token && res.operator) {
      setOperator(res.operator);
      setUserRole('operator');
      setIsLoggedIn(true);
      return true;
    }
    return false;
  };

  const operatorRegister = async (data: {
    name: string;
    phone: string;
    password: string;
    centre_id: string;
    serviceKey?: string;
  }): Promise<BackendOperator> => {
    return await api.auth.operatorRegister(data);
  };

  const setIsOffline = (offline: boolean) => {
    setIsOfflineState(offline);
  };

  const toggleOfflineMode = () => {
    setIsOfflineState(prev => !prev);
  };

  const logSyncOp = async (
    actionType: SyncOperation['actionType'],
    bookingId: string,
    details: string,
    payload?: any
  ): Promise<string> => {
    const opId = typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `SYNC-${Date.now()}-${Math.floor(Math.random() * 1000000)}`;

    const entityType: OfflineActionRecord['entityType'] =
      actionType.includes('PAYMENT') ? 'payment'
      : actionType.includes('PROCUREMENT') ? 'procurement'
      : actionType.includes('QUEUE') || actionType.includes('CHECK_IN') || actionType.includes('CALL_NEXT') || actionType.includes('START') || actionType.includes('COMPLETE_PROCESSING') || actionType.includes('NO_SHOW') ? 'queue'
      : 'booking';

    const opRecord: OfflineActionRecord = {
      id: opId,
      actionType: actionType as any,
      entityType,
      entityId: bookingId,
      payload,
      createdAt: new Date().toISOString(),
      retryCount: 0,
      status: isOffline ? 'PENDING' : 'SYNCED',
      details,
    };

    try {
      await offlineDb.enqueueAction(opRecord);
    } catch (dbErr) {
      console.warn('[OfflineDB] Could not persist action:', dbErr);
    }

    const uiOp: SyncOperation = {
      id: opId,
      actionType,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      bookingId,
      details,
      payload,
      status: isOffline ? 'PENDING' : 'SYNCED',
      retryCount: 0,
    };

    setSyncQueue((prev) => [uiOp, ...prev.filter((o) => o.id !== opId)]);
    return opId;
  };

  const syncOfflineQueue = async () => {
    if (isSyncing) return;
    setIsSyncing(true);

    try {
      // 1. Verify reachability
      const isReachable = await api.checkBackendHealth();
      if (!isReachable) {
        setIsOfflineState(true);
        console.warn('[Sync] Backend unreachable during synchronization');
        setIsSyncing(false);
        return;
      }

      setIsOfflineState(false);
      const pendingActions = await offlineDb.getPendingActions();
      if (pendingActions.length === 0) {
        setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Synced)');
        setIsSyncing(false);
        return;
      }

      const centreId = operator?.centreId || selectedCentre?.id || centres[0]?.id;

      // Batch synchronization attempt with backend if operator is logged in and centre is known
      let batchSucceeded = false;
      if (api.getOperatorToken() && centreId) {
        try {
          const syncEvents: SyncEventIn[] = pendingActions.map((a) => ({
            client_event_id: a.id,
            type: a.actionType,
            payload: a.payload || { entity_id: a.entityId },
          }));

          const batchRes = await api.sync.applyEvents(centreId, syncEvents);
          if (batchRes && batchRes.results) {
            batchSucceeded = true;
            for (const res of batchRes.results) {
              const matched = pendingActions.find((a) => a.id === res.client_event_id);
              if (!matched) continue;

              if (res.status === 'accepted' || res.status === 'duplicate') {
                await offlineDb.updateAction(res.client_event_id, {
                  status: 'SYNCED',
                  lastError: undefined,
                });
              } else if (res.status === 'conflicting') {
                await offlineDb.updateAction(res.client_event_id, {
                  status: 'FAILED',
                  lastError: res.error || 'Sync conflict detected on server',
                });
              } else if (res.status === 'rejected') {
                await offlineDb.updateAction(res.client_event_id, {
                  status: 'FAILED',
                  lastError: res.error || 'Operation rejected by server business rules',
                });
              }
            }
          }
        } catch (batchErr: any) {
          console.warn('[Sync] Batch sync attempt note, falling back to idempotent dispatch:', batchErr.message);
        }
      }

      // If batch endpoint wasn't available or for actions requiring direct endpoint execution:
      if (!batchSucceeded) {
        for (const action of pendingActions) {
          try {
            switch (action.actionType) {
              case 'CHECK_IN':
                await api.queue.checkIn(action.entityId);
                break;
              case 'CALL_NEXT':
                await api.queue.callNext();
                break;
              case 'START_PROCESSING':
                await api.queue.startProcessing(action.entityId);
                break;
              case 'COMPLETE_PROCESSING':
                await api.queue.completeProcessing(action.entityId);
                break;
              case 'MARK_NO_SHOW':
                await api.queue.markNoShow(action.entityId);
                break;
              case 'CANCEL_BOOKING':
                await api.bookings.cancel(action.entityId);
                break;
              case 'BOOKING_RESCHEDULE':
              case 'RESCHEDULE':
                if (action.payload?.expectedDate && action.payload?.slotWindow) {
                  await api.bookings.reschedule(action.entityId, {
                    expectedDate: action.payload.expectedDate,
                    slotWindow: action.payload.slotWindow,
                  });
                }
                break;
              case 'COMPLETE_PROCUREMENT':
                if (action.payload) {
                  const bProc = await api.procurements.record({
                    booking_id: action.payload.bookingUuid || action.entityId,
                    accepted_quantity: action.payload.netWeight,
                    unit_price: action.payload.mspRate || 2275,
                    quality_grade: action.payload.qualityGrade,
                    unit: 'quintal',
                    quality_notes: action.payload.qualityNotes,
                  });
                  if (bProc?.id) {
                    await api.procurements.initiatePayment(bProc.id).catch((e) => console.warn('Payment initiate note:', e.message));
                  }
                }
                break;
              case 'CONFIRM_PAYMENT':
                await api.payments.verify(action.entityId, true, operator?.name || 'Mandi Operator');
                break;
              default:
                break;
            }

            await offlineDb.updateAction(action.id, {
              status: 'SYNCED',
              lastError: undefined,
            });
          } catch (actionErr: any) {
            const isValidationError = actionErr.status === 422 || actionErr.status === 409 || actionErr.status === 400;
            const newRetryCount = (action.retryCount || 0) + 1;
            const finalStatus = isValidationError || newRetryCount >= 3 ? 'FAILED' : 'PENDING';

            await offlineDb.updateAction(action.id, {
              status: finalStatus,
              retryCount: newRetryCount,
              lastError: actionErr.message || 'Operation synchronization failed',
            });
          }
        }
      }

      // Record successful sync timestamp
      const nowIso = new Date().toISOString();
      await offlineDb.setMetadata('lastSuccessfulSync', nowIso);
      setLastSyncTime(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + ' (Confirmed)');

      // Refresh memory state from IndexedDB
      const allActions = await offlineDb.getAllActions();
      setSyncQueue(
        allActions.map((a) => ({
          id: a.id,
          actionType: a.actionType as any,
          timestamp: new Date(a.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          bookingId: a.entityId,
          details: a.details || `${a.actionType} for ${a.entityId}`,
          payload: a.payload,
          status: a.status,
          retryCount: a.retryCount,
          lastError: a.lastError,
        }))
      );

      // Refresh authoritative backend data across channels
      if (userRole === 'operator') {
        await refreshOperatorData();
      } else {
        await refreshFarmerData();
      }
    } catch (err: any) {
      console.error('[Sync] Sync loop error:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const operatorCheckIn = async (bookingId: string): Promise<void> => {
    const cleanId = bookingId.trim();
    const matched = bookings.find((b) => b.id === cleanId || b.uuid === cleanId || b.farmerMobile === cleanId);
    const idToSend = matched?.uuid || matched?.id || cleanId;

    if (isOffline) {
      setBookings((prev) =>
        prev.map((b) => (b.id === cleanId || b.uuid === cleanId ? { ...b, status: 'CHECKED_IN' as const } : b))
      );
      await logSyncOp('CHECK_IN', idToSend, `Gate check-in recorded offline for ${idToSend}`);
      return;
    }

    try {
      await api.queue.checkIn(idToSend);
      await logSyncOp('CHECK_IN', idToSend, `Gate check-in recorded for booking ${idToSend}`);
      await refreshOperatorData();
    } catch (err: any) {
      console.warn('Operator check-in error, queuing offline:', err.message);
      setBookings((prev) =>
        prev.map((b) => (b.id === cleanId || b.uuid === cleanId ? { ...b, status: 'CHECKED_IN' as const } : b))
      );
      await logSyncOp('CHECK_IN', idToSend, `Gate check-in buffered offline for ${idToSend}`);
    }
  };

  const operatorCallNext = async (): Promise<Booking | null> => {
    if (isOffline) {
      const nextWaiting = bookings.find((b) => b.status === 'IN_QUEUE' || b.status === 'CHECKED_IN');
      if (nextWaiting) {
        setBookings((prev) =>
          prev.map((b) => (b.id === nextWaiting.id ? { ...b, status: 'TURN_APPROACHING' as const } : b))
        );
        await logSyncOp('CALL_NEXT', nextWaiting.id, `Called next token #${nextWaiting.id} offline`);
        return nextWaiting;
      }
      return null;
    }

    try {
      const entry = await api.queue.callNext();
      if (entry) {
        await logSyncOp('CALL_NEXT', entry.booking_id, `Called next token #${entry.position}`);
        await refreshOperatorData();
        return bookings.find((b) => b.uuid === entry.booking_id || b.id === entry.booking_id) || null;
      }
      return null;
    } catch (err: any) {
      console.error('Operator call-next error:', err);
      throw err;
    }
  };

  const operatorStartProcessing = async (bookingIdOrQueueEntryId: string): Promise<void> => {
    const cleanId = bookingIdOrQueueEntryId.trim();
    const queueEntry = operatorQueueEntries.find((e) => e.id === cleanId || e.booking_id === cleanId);
    const matchedBooking = bookings.find((b) => b.id === cleanId || b.uuid === cleanId);
    const entryId = queueEntry?.id || matchedBooking?.queueEntryId || cleanId;

    if (isOffline) {
      setBookings((prev) =>
        prev.map((b) => (b.id === cleanId || b.uuid === cleanId ? { ...b, status: 'PROCESSING' as const } : b))
      );
      await logSyncOp('START_PROCESSING', cleanId, `Procurement weighing started offline for ${cleanId}`);
      return;
    }

    try {
      await api.queue.startProcessing(entryId);
      await logSyncOp('START_PROCESSING', cleanId, `Procurement weighing started for ${cleanId}`);
      await refreshOperatorData();
    } catch (err: any) {
      console.warn('Operator start processing error, queuing offline:', err.message);
      setBookings((prev) =>
        prev.map((b) => (b.id === cleanId || b.uuid === cleanId ? { ...b, status: 'PROCESSING' as const } : b))
      );
      await logSyncOp('START_PROCESSING', cleanId, `Procurement weighing buffered offline for ${cleanId}`);
    }
  };

  const operatorCompleteProcessing = async (bookingIdOrQueueEntryId: string): Promise<void> => {
    const cleanId = bookingIdOrQueueEntryId.trim();
    const queueEntry = operatorQueueEntries.find((e) => e.id === cleanId || e.booking_id === cleanId);
    const matchedBooking = bookings.find((b) => b.id === cleanId || b.uuid === cleanId);
    const entryId = queueEntry?.id || matchedBooking?.queueEntryId || cleanId;

    if (isOffline) {
      setBookings((prev) =>
        prev.map((b) => (b.id === cleanId || b.uuid === cleanId ? { ...b, status: 'COMPLETED' as const } : b))
      );
      await logSyncOp('COMPLETE_PROCESSING', cleanId, `Queue processing completed offline for ${cleanId}`);
      return;
    }

    try {
      await api.queue.completeProcessing(entryId);
      await logSyncOp('COMPLETE_PROCESSING', cleanId, `Queue processing completed for ${cleanId}`);
      await refreshOperatorData();
    } catch (err: any) {
      console.warn('Operator complete processing error, queuing offline:', err.message);
      setBookings((prev) =>
        prev.map((b) => (b.id === cleanId || b.uuid === cleanId ? { ...b, status: 'COMPLETED' as const } : b))
      );
      await logSyncOp('COMPLETE_PROCESSING', cleanId, `Queue processing buffered offline for ${cleanId}`);
    }
  };

  const operatorMarkNoShow = async (bookingIdOrQueueEntryId: string): Promise<void> => {
    const cleanId = bookingIdOrQueueEntryId.trim();
    const queueEntry = operatorQueueEntries.find((e) => e.id === cleanId || e.booking_id === cleanId);
    const matchedBooking = bookings.find((b) => b.id === cleanId || b.uuid === cleanId);
    const entryId = queueEntry?.id || matchedBooking?.queueEntryId || cleanId;

    if (isOffline) {
      setBookings((prev) =>
        prev.map((b) => (b.id === cleanId || b.uuid === cleanId ? { ...b, status: 'NO_SHOW' as const } : b))
      );
      await logSyncOp('MARK_NO_SHOW', cleanId, `Marked farmer as NO-SHOW offline for slot ${cleanId}`);
      return;
    }

    try {
      await api.queue.markNoShow(entryId);
      await logSyncOp('MARK_NO_SHOW', cleanId, `Marked farmer as NO-SHOW for slot ${cleanId}`);
      await refreshOperatorData();
    } catch (err: any) {
      console.warn('Operator mark no-show error, queuing offline:', err.message);
      setBookings((prev) =>
        prev.map((b) => (b.id === cleanId || b.uuid === cleanId ? { ...b, status: 'NO_SHOW' as const } : b))
      );
      await logSyncOp('MARK_NO_SHOW', cleanId, `Marked farmer as NO-SHOW buffered offline for ${cleanId}`);
    }
  };

  const operatorCompleteProcurement = async (data: {
    bookingId: string;
    grossWeight: number;
    tareWeight: number;
    netWeight: number;
    moisturePercent: number;
    qualityGrade: 'Grade A' | 'Grade B' | 'Standard';
    deductions?: number;
    deductionReason?: string;
  }): Promise<ProcurementRecord> => {
    const booking = bookings.find((b) => b.id === data.bookingId || b.uuid === data.bookingId);
    const matchedCrop = crops.find(
      (c) =>
        c.id.toLowerCase() === booking?.cropId?.toLowerCase() ||
        c.name.toLowerCase() === booking?.cropName?.toLowerCase()
    );
    const msp = matchedCrop?.mspPerQuintal || 2275;
    const grossAmt = Math.round(data.netWeight * msp);
    const netAmt = Math.max(0, Math.round(grossAmt - (data.deductions || 0)));
    const bookingUuid = booking?.uuid || booking?.id || data.bookingId;

    const qualityNotesParts: string[] = [];
    if (data.deductionReason) qualityNotesParts.push(data.deductionReason);
    if (data.deductions) qualityNotesParts.push(`Deductions: ₹${data.deductions}`);
    if (data.moisturePercent) qualityNotesParts.push(`Moisture: ${data.moisturePercent}%`);
    const qualityNotes = qualityNotesParts.join(' | ') || undefined;

    // Rule L: Offline Procurement
    if (isOffline) {
      const offlineRecord: ProcurementRecord = {
        id: `LOCAL-${data.bookingId}`,
        bookingId: data.bookingId,
        farmerId: booking?.farmerId || '',
        farmerName: booking?.farmerName,
        farmerMobile: booking?.farmerMobile,
        cropName: booking?.cropName || 'Grain',
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        centreName: operator?.centreName || 'Procurement Mandi',
        bookedQuantity: booking?.quantityQuintals || 0,
        acceptedQuantity: data.netWeight,
        grossWeight: data.grossWeight,
        tareWeight: data.tareWeight,
        netWeight: data.netWeight,
        mspRate: msp,
        grossAmount: grossAmt,
        deductions: data.deductions || 0,
        deductionReason: data.deductionReason || 'Standard grain verified',
        qualityGrade: data.qualityGrade,
        procurementStatus: 'Accepted',
        paymentStatus: 'initiated',
        paymentAmount: netAmt,
      };

      setProcurements((prev) => [offlineRecord, ...prev.filter((p) => p.bookingId !== data.bookingId)]);
      setBookings((prev) =>
        prev.map((b) => (b.id === data.bookingId || b.uuid === bookingUuid ? { ...b, status: 'COMPLETED' as const } : b))
      );

      await logSyncOp(
        'COMPLETE_PROCUREMENT',
        data.bookingId,
        `Accepted ${data.netWeight} Qtl produce offline (Pending Sync)`,
        {
          bookingUuid,
          ...data,
          mspRate: msp,
          qualityNotes,
        }
      );

      return offlineRecord;
    }

    let backendProc: any = null;
    if (api.getOperatorToken() || api.getToken()) {
      try {
        backendProc = await api.procurements.record({
          booking_id: bookingUuid,
          accepted_quantity: data.netWeight,
          unit_price: msp,
          quality_grade: data.qualityGrade,
          unit: 'quintal',
          quality_notes: qualityNotes,
        });
      } catch (err: any) {
        console.warn('Operator record procurement error, queuing offline:', err.message);
        return operatorCompleteProcurement(data);
      }
    }

    // Automatically initiate DBT payment for this procurement on backend
    let backendPay: any = null;
    const procIdToUse = backendProc?.id;
    if (procIdToUse && (api.getOperatorToken() || api.getToken())) {
      try {
        backendPay = await api.procurements.initiatePayment(procIdToUse);
      } catch (payErr: any) {
        console.warn('Procurement payment auto-initiation notice:', payErr.message);
      }
    }

    // Complete queue entry if currently active in operator queue
    const queueEntry = operatorQueueEntries.find((e) => e.booking_id === bookingUuid || e.booking_id === data.bookingId);
    if (queueEntry?.id && (api.getOperatorToken() || api.getToken())) {
      try {
        await api.queue.completeProcessing(queueEntry.id);
      } catch (qErr: any) {
        console.warn('Queue complete processing notice:', qErr.message);
      }
    }

    const newRecord: ProcurementRecord = {
      id: backendProc?.procurement_id || `PRC-${data.bookingId}`,
      uuid: backendProc?.id,
      bookingId: data.bookingId,
      farmerId: booking?.farmerId || '',
      farmerName: booking?.farmerName,
      farmerMobile: booking?.farmerMobile,
      cropName: booking?.cropName || 'Grain',
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      centreName: operator?.centreName || 'Procurement Mandi',
      bookedQuantity: booking?.quantityQuintals || 0,
      acceptedQuantity: data.netWeight,
      grossWeight: data.grossWeight,
      tareWeight: data.tareWeight,
      netWeight: data.netWeight,
      mspRate: msp,
      grossAmount: grossAmt,
      deductions: data.deductions || 0,
      deductionReason: data.deductionReason || 'Standard grain verified',
      qualityGrade: data.qualityGrade,
      procurementStatus: 'Accepted',
      paymentStatus: (backendPay?.status as any) || 'initiated',
      paymentAmount: backendPay?.amount || netAmt,
      paymentId: backendPay?.payment_id || backendPay?.id,
    };

    setProcurements((prev) => [newRecord, ...prev.filter((p) => p.bookingId !== data.bookingId)]);
    setBookings((prev) =>
      prev.map((b) => (b.id === data.bookingId || b.uuid === bookingUuid ? { ...b, status: 'COMPLETED' as const } : b))
    );

    if (backendPay) {
      const newPaymentRecord: PaymentRecord = {
        id: backendPay.payment_id || backendPay.id,
        uuid: backendPay.id,
        transactionId: backendPay.payment_id || backendPay.id,
        procurementId: newRecord.id,
        bookingId: data.bookingId,
        farmerId: backendPay.farmer_id || booking?.farmerId || '',
        farmerName: booking?.farmerName,
        farmerMobile: booking?.farmerMobile,
        cropName: booking?.cropName || 'Produce',
        quantity: backendPay.quantity || data.netWeight,
        rate: backendPay.rate || msp,
        amount: backendPay.amount || netAmt,
        date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        paymentStatus: backendPay.status || 'initiated',
        anomalyFlags: backendPay.anomaly_flags,
      };
      setPayments((prev) => [newPaymentRecord, ...prev.filter((p) => p.id !== newPaymentRecord.id)]);
    }

    await logSyncOp('COMPLETE_PROCUREMENT', data.bookingId, `Accepted ${data.netWeight} Qtl produce for ${data.bookingId}`, newRecord);
    refreshOperatorData().catch((e) => console.warn('Background refresh error:', e.message));

    return newRecord;
  };

  const operatorConfirmPayment = async (paymentId: string): Promise<void> => {
    const cleanId = paymentId.trim();
    const matchedPayment = payments.find((p) => p.id === cleanId || p.uuid === cleanId || p.transactionId === cleanId);
    const idToSend = matchedPayment?.uuid || matchedPayment?.id || cleanId;

    // Rule K: Offline Payment Rule
    // Never falsely claim payment confirmed while offline. Keep pending in queue.
    if (isOffline) {
      await logSyncOp('CONFIRM_PAYMENT', cleanId, `Payment authorization enqueued offline for ${cleanId}`, {
        paymentId: idToSend,
      });
      return;
    }

    try {
      if (api.getOperatorToken() || api.getToken()) {
        await api.payments.verify(idToSend, true, operator?.name || 'Mandi Operator');
      }
      setPayments((prev) =>
        prev.map((p) => {
          if (p.id === cleanId || p.uuid === cleanId || p.transactionId === cleanId) {
            return { ...p, paymentStatus: 'confirmed' as const, confirmedAt: new Date().toISOString() };
          }
          return p;
        })
      );

      setProcurements((prev) =>
        prev.map((pr) => {
          if (pr.paymentId === cleanId || pr.paymentId === idToSend || pr.id === matchedPayment?.procurementId) {
            return { ...pr, paymentStatus: 'confirmed' as const };
          }
          return pr;
        })
      );

      await logSyncOp('CONFIRM_PAYMENT', cleanId, `Direct Benefit Transfer confirmed for payment ${cleanId}`);
      await refreshOperatorPayments();
    } catch (err: any) {
      console.warn('Operator confirm payment error, enqueuing offline action:', err.message);
      await logSyncOp('CONFIRM_PAYMENT', cleanId, `Payment authorization buffered offline for ${cleanId}`, {
        paymentId: idToSend,
      });
    }
  };

  const operatorCancelBooking = (bookingId: string, reason: string) => {
    if (isOffline) {
      setBookings((prev) => (prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' as const } : b))));
      logSyncOp('CANCEL_BOOKING', bookingId, `Cancelled booking ${bookingId} offline. Reason: ${reason}`);
      return;
    }

    if (api.getOperatorToken() || api.getToken()) {
      api.bookings.cancel(bookingId).catch((err) => console.warn('Backend cancel notice:', err));
    }
    setBookings((prev) => (prev.map((b) => (b.id === bookingId ? { ...b, status: 'CANCELLED' as const } : b))));
    logSyncOp('CANCEL_BOOKING', bookingId, `Cancelled booking ${bookingId}. Reason: ${reason}`);
  };

  const operatorRescheduleBooking = (bookingId: string, newDate: string, newSlot: SlotTimeWindow) => {
    if (isOffline) {
      setBookings((prev) =>
        prev.map((b) => {
          if (b.id === bookingId) {
            return {
              ...b,
              expectedDate: newDate,
              slot: newSlot,
              status: 'RESCHEDULED' as const,
              isRescheduled: true,
              rescheduleCount: (b.rescheduleCount || 0) + 1,
            };
          }
          return b;
        })
      );
      logSyncOp('RESCHEDULE', bookingId, `Rescheduled booking ${bookingId} offline to ${newDate} (${newSlot})`, {
        expectedDate: newDate,
        slotWindow: newSlot,
      });
      return;
    }

    if (api.getOperatorToken() || api.getToken()) {
      api.bookings.reschedule(bookingId, { expectedDate: newDate, slotWindow: newSlot }).catch((err) =>
        console.warn('Backend reschedule notice:', err)
      );
    }
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id === bookingId) {
          return {
            ...b,
            expectedDate: newDate,
            slot: newSlot,
            status: 'RESCHEDULED' as const,
            isRescheduled: true,
            rescheduleCount: (b.rescheduleCount || 0) + 1,
          };
        }
        return b;
      })
    );
    logSyncOp('RESCHEDULE', bookingId, `Rescheduled booking ${bookingId} to ${newDate} (${newSlot})`, {
      expectedDate: newDate,
      slotWindow: newSlot,
    });
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        farmer,
        isLoggedIn,
        authStatus,
        isAuthLoading,
        authError,
        userRole,
        setUserRole,
        switchRole,
        operator,
        operatorLogin,
        operatorRegister,
        operatorActiveTab,
        setOperatorActiveTab,
        login,
        sendOtp,
        verifyOtp,
        register,
        logout,
        updateProfile,
        updateFarmerLocation,
        crops,
        centres,
        selectedCentre,
        setSelectedCentre,
        isLoadingData,
        dataError,
        refreshFarmerData,
        refreshOperatorData,
        bookings,
        activeBooking,
        createBooking,
        cancelBooking,
        rescheduleBooking,
        realtimeStatus,
        lastQueueUpdate,
        queueSummary,
        operatorQueueEntries,
        refreshQueue,
        procurements,
        payments,
        operatorDashboardData,
        refreshOperatorDashboard,
        operatorCheckIn,
        operatorCallNext,
        operatorStartProcessing,
        operatorCompleteProcessing,
        operatorMarkNoShow,
        operatorCompleteProcurement,
        operatorConfirmPayment,
        refreshOperatorPayments,
        operatorCancelBooking,
        operatorRescheduleBooking,
        isOffline,
        setIsOffline,
        toggleOfflineMode,
        syncQueue,
        lastSyncTime,
        isSyncing,
        syncOfflineQueue,
        isSmsModalOpen,
        setIsSmsModalOpen,
        notifications,
        unreadCount,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        activeView,
        setActiveView,
        isHelpModalOpen,
        setIsHelpModalOpen,
        isSettingsModalOpen,
        setIsSettingsModalOpen,
        isTcModalOpen,
        setIsTcModalOpen,
        isPrivacyModalOpen,
        setIsPrivacyModalOpen,
        isCookieModalOpen,
        setIsCookieModalOpen,
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
