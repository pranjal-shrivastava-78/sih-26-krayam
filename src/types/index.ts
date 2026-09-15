export type Language = 
  | 'en'  // English
  | 'hi'  // हिन्दी (Hindi) - ~43.6%
  | 'bn'  // বাংলা (Bengali) - ~8.0%
  | 'mr'  // मराठी (Marathi) - ~6.9%
  | 'te'  // తెలుగు (Telugu) - ~6.7%
  | 'ta'  // தமிழ் (Tamil) - ~5.7%
  | 'gu'  // ગુજરાતી (Gujarati) - ~4.6%
  | 'ur'  // اردو (Urdu) - ~4.2%
  | 'kn'  // ಕನ್ನಡ (Kannada) - ~3.6%
  | 'or'  // ଓଡ଼ିଆ (Odia) - ~3.1%
  | 'pa'; // ਪੰਜਾਬੀ (Punjabi) - ~2.7%

export type ActiveView = 
  | 'dashboard' 
  | 'tracking' 
  | 'booking' 
  | 'centres' 
  | 'procurement' 
  | 'history' 
  | 'notifications' 
  | 'profile'
  | 'auth';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface VillageLocation {
  village: string;
  tehsil: string; // Mandal / Tehsil
  district: string;
  state: string;
  pincode: string;
  coordinates?: LocationCoordinates;
}

export interface FarmerProfile {
  farmerId: string;
  fullName: string;
  mobileNumber: string;
  location: VillageLocation;
  landHoldingAcres?: number;
  registeredDate: string;
  bankAccountMasked?: string;
}

export interface CropInfo {
  id: string;
  name: string;
  hindiName: string;
  punjabiName: string;
  marathiName: string;
  mspPerQuintal: number; // Minimum Support Price in INR
  season: 'Kharif' | 'Rabi' | 'Zaid';
  unit: string;
}

export type QueueLoadLevel = 'Low' | 'Moderate' | 'High';

export interface ProcurementCentre {
  id: string;
  name: string;
  officerInCharge: string;
  contactNumber: string;
  location: {
    address: string;
    village: string;
    district: string;
    state: string;
    coordinates: LocationCoordinates;
  };
  distanceKm: number;
  acceptedCropIds: string[];
  operatingHours: {
    opens: string;
    closes: string;
    lunchBreak: string;
    days: string;
  };
  currentQueue: {
    activeVehicles: number;
    loadLevel: QueueLoadLevel;
    estimatedWaitMins: number;
  };
  availableSlots?: number;
}

export type SlotTimeWindow = 'Morning (08:00 AM - 11:30 AM)' | 'Midday (11:30 AM - 02:30 PM)' | 'Afternoon (02:30 PM - 05:30 PM)';

export interface TimeSlot {
  id: string;
  timeWindow: SlotTimeWindow;
  availableCapacityQuintals: number;
  maxCapacityQuintals: number;
  isAvailable: boolean;
}

export type BookingStatus = 
  | 'CONFIRMED' 
  | 'IN_QUEUE' 
  | 'CHECKED_IN'
  | 'TURN_APPROACHING' 
  | 'PROCESSING' 
  | 'WEIGHING'
  | 'QUALITY_CHECK'
  | 'PAYMENT_PENDING'
  | 'COMPLETED' 
  | 'NO_SHOW'
  | 'CANCELLED' 
  | 'RESCHEDULED';

export interface Booking {
  id: string; // e.g. BK-2026-9481
  farmerId: string;
  farmerName: string;
  farmerMobile: string;
  cropId: string;
  cropName: string;
  quantityQuintals: number;
  expectedDate: string; // YYYY-MM-DD
  centreId: string;
  centreName: string;
  centreLocation: string;
  slot: SlotTimeWindow;
  status: BookingStatus;
  createdAt: string;
  queuePosition?: number;
  farmersAhead?: number;
  estimatedWaitMinutes?: number;
  isRescheduled?: boolean;
  rescheduleCount?: number;
}

export type ProcurementStatus = 'Scheduled' | 'Weighed' | 'Quality Graded' | 'Accepted' | 'Rejected';

export type PaymentStatus = 'Pending' | 'Processing' | 'Credited' | 'Failed';

export interface ProcurementRecord {
  id: string;
  bookingId: string;
  farmerId: string;
  cropName: string;
  date: string;
  centreName: string;
  bookedQuantity: number;
  acceptedQuantity: number;
  grossWeight?: number;
  tareWeight?: number;
  netWeight?: number;
  mspRate?: number;
  grossAmount?: number;
  deductions?: number;
  deductionReason?: string;
  qualityGrade: 'Grade A' | 'Grade B' | 'Standard';
  procurementStatus: ProcurementStatus;
  paymentStatus: PaymentStatus;
  paymentAmount: number;
}

export interface PaymentRecord {
  id: string;
  transactionId: string;
  procurementId: string;
  bookingId: string;
  farmerId: string;
  cropName: string;
  amount: number;
  date: string;
  paymentStatus: PaymentStatus;
  bankAccountMasked: string;
  utrNumber?: string;
}

export type NotificationType = 
  | 'BOOKING' 
  | 'QUEUE' 
  | 'PROCUREMENT' 
  | 'PAYMENT' 
  | 'ANNOUNCEMENT';

export interface AppNotification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  referenceId?: string;
  priority?: 'normal' | 'urgent';
}

export type UserRole = 'farmer' | 'operator';

export type OperatorView = 
  | 'dashboard' 
  | 'bookings' 
  | 'queue' 
  | 'procurement' 
  | 'payments' 
  | 'analytics' 
  | 'offline';

export interface OperatorProfile {
  operatorId: string;
  name: string;
  designation: string;
  centreId: string;
  centreName: string;
  mobile: string;
  shift: string;
}

export interface SyncOperation {
  id: string;
  actionType: 
    | 'CHECK_IN' 
    | 'CALL_NEXT' 
    | 'START_PROCESSING' 
    | 'COMPLETE_PROCUREMENT' 
    | 'CONFIRM_PAYMENT' 
    | 'MARK_NO_SHOW' 
    | 'CANCEL_BOOKING' 
    | 'RESCHEDULE';
  timestamp: string;
  bookingId: string;
  details: string;
  payload?: any;
  status: 'PENDING' | 'SYNCED' | 'FAILED';
}

export interface AiCenterInsight {
  predictedWaitMins: number;
  expectedArrivalsToday: number;
  expectedCenterLoadPct: number;
  highLoadWarnings: string[];
  suggestedLoadDistribution: string;
  slotRecommendations: { slot: string; recommendation: string; loadLevel: string }[];
  anomalies: { id: string; type: string; message: string; severity: 'low' | 'medium' | 'high' }[];
}
