import { CropInfo, ProcurementCentre, FarmerProfile, Booking, ProcurementRecord, PaymentRecord, AppNotification } from '../types';

export const INITIAL_CROPS: CropInfo[] = [
  {
    id: 'crop-wheat',
    name: 'Wheat (गेहूं)',
    hindiName: 'गेहूं',
    punjabiName: 'ਕਣਕ',
    marathiName: 'गहू',
    mspPerQuintal: 2275,
    season: 'Rabi',
    unit: 'Quintal',
  },
  {
    id: 'crop-paddy',
    name: 'Paddy / Rice (धान)',
    hindiName: 'धान (चावल)',
    punjabiName: 'ਝੋਨਾ',
    marathiName: 'भात',
    mspPerQuintal: 2300,
    season: 'Kharif',
    unit: 'Quintal',
  },
  {
    id: 'crop-mustard',
    name: 'Mustard / Rapeseed (सरसों)',
    hindiName: 'सरसों',
    punjabiName: 'ਸਰ੍ਹੋਂ',
    marathiName: 'मोहरी',
    mspPerQuintal: 5650,
    season: 'Rabi',
    unit: 'Quintal',
  },
  {
    id: 'crop-gram',
    name: 'Gram / Chana (चना)',
    hindiName: 'चना',
    punjabiName: 'ਛੋਲੇ',
    marathiName: 'हरभरा',
    mspPerQuintal: 5440,
    season: 'Rabi',
    unit: 'Quintal',
  },
  {
    id: 'crop-cotton',
    name: 'Cotton (कपास)',
    hindiName: 'कपास (नरमा)',
    punjabiName: 'ਕਪਾਹ',
    marathiName: 'कापूस',
    mspPerQuintal: 7121,
    season: 'Kharif',
    unit: 'Quintal',
  },
  {
    id: 'crop-soybean',
    name: 'Soybean (सोयाबीन)',
    hindiName: 'सोयाबीन',
    punjabiName: 'ਸੋਇਆਬੀਨ',
    marathiName: 'सोयाबीन',
    mspPerQuintal: 4892,
    season: 'Kharif',
    unit: 'Quintal',
  },
  {
    id: 'crop-maize',
    name: 'Maize (मक्का)',
    hindiName: 'मक्का',
    punjabiName: 'ਮੱਕੀ',
    marathiName: 'मका',
    mspPerQuintal: 2090,
    season: 'Kharif',
    unit: 'Quintal',
  }
];

export const INITIAL_CENTRES: ProcurementCentre[] = [
  {
    id: 'centre-samrala',
    name: 'Samrala Main Grain Mandi & Procurement Hub',
    officerInCharge: 'Sh. Rajesh Kumar (Mandi Secretary)',
    contactNumber: '+91 1628 234190',
    location: {
      address: 'Grain Market Road, Near Railway Crossing, Samrala',
      village: 'Samrala',
      district: 'Ludhiana',
      state: 'Punjab',
      coordinates: { lat: 30.8385, lng: 76.1920 }
    },
    distanceKm: 2.4,
    acceptedCropIds: ['crop-wheat', 'crop-paddy', 'crop-mustard', 'crop-maize'],
    operatingHours: {
      opens: '08:00 AM',
      closes: '06:00 PM',
      lunchBreak: '01:00 PM - 02:00 PM',
      days: 'Monday to Saturday'
    },
    currentQueue: {
      activeVehicles: 8,
      loadLevel: 'Moderate',
      estimatedWaitMins: 25
    },
    availableSlots: 24
  },
  {
    id: 'centre-ludhiana',
    name: 'Ludhiana Central Agro Procurement Terminal',
    officerInCharge: 'Smt. Harpreet Kaur (District Manager, Pungrain)',
    contactNumber: '+91 161 2401890',
    location: {
      address: 'Ferozepur Road, Mandi Board Complex, Ludhiana',
      village: 'Gill',
      district: 'Ludhiana',
      state: 'Punjab',
      coordinates: { lat: 30.9010, lng: 75.8573 }
    },
    distanceKm: 6.8,
    acceptedCropIds: ['crop-wheat', 'crop-paddy', 'crop-gram', 'crop-cotton'],
    operatingHours: {
      opens: '08:00 AM',
      closes: '07:00 PM',
      lunchBreak: '01:00 PM - 02:00 PM',
      days: 'Monday to Saturday'
    },
    currentQueue: {
      activeVehicles: 14,
      loadLevel: 'High',
      estimatedWaitMins: 45
    },
    availableSlots: 12
  },
  {
    id: 'centre-machhiwara',
    name: 'Machhiwara Sub-Yard Procurement Centre',
    officerInCharge: 'Sh. Amarjit Singh (Yard Inspector)',
    contactNumber: '+91 1628 274211',
    location: {
      address: 'Ropar-Machhiwara Bypass Road, Machhiwara',
      village: 'Machhiwara',
      district: 'Ludhiana',
      state: 'Punjab',
      coordinates: { lat: 30.9150, lng: 76.2990 }
    },
    distanceKm: 9.5,
    acceptedCropIds: ['crop-wheat', 'crop-mustard', 'crop-gram'],
    operatingHours: {
      opens: '08:30 AM',
      closes: '05:30 PM',
      lunchBreak: '01:00 PM - 02:00 PM',
      days: 'Monday to Saturday'
    },
    currentQueue: {
      activeVehicles: 3,
      loadLevel: 'Low',
      estimatedWaitMins: 15
    },
    availableSlots: 40
  },
  {
    id: 'centre-payal',
    name: 'Payal Co-operative Marketing Society Mandi',
    officerInCharge: 'Sh. Balwinder Singh (Society Secretary)',
    contactNumber: '+91 1628 276533',
    location: {
      address: 'Society Complex, Near Canal Bridge, Payal',
      village: 'Payal',
      district: 'Ludhiana',
      state: 'Punjab',
      coordinates: { lat: 30.7238, lng: 76.0560 }
    },
    distanceKm: 16.2,
    acceptedCropIds: ['crop-wheat', 'crop-paddy', 'crop-gram', 'crop-soybean'],
    operatingHours: {
      opens: '09:00 AM',
      closes: '05:00 PM',
      lunchBreak: '01:30 PM - 02:30 PM',
      days: 'Monday to Friday'
    },
    currentQueue: {
      activeVehicles: 5,
      loadLevel: 'Low',
      estimatedWaitMins: 20
    },
    availableSlots: 32
  },
  {
    id: 'centre-doraha',
    name: 'Doraha State Warehouse Procurement Depot',
    officerInCharge: 'Sh. Manmohan Sharma (Depot Manager)',
    contactNumber: '+91 1628 259870',
    location: {
      address: 'Near Doraha Toll Plaza, National Highway 44',
      village: 'Doraha',
      district: 'Ludhiana',
      state: 'Punjab',
      coordinates: { lat: 30.8039, lng: 76.0315 }
    },
    distanceKm: 18.0,
    acceptedCropIds: ['crop-wheat', 'crop-paddy', 'crop-maize', 'crop-cotton'],
    operatingHours: {
      opens: '08:00 AM',
      closes: '06:00 PM',
      lunchBreak: '01:00 PM - 02:00 PM',
      days: 'Monday to Saturday'
    },
    currentQueue: {
      activeVehicles: 12,
      loadLevel: 'Moderate',
      estimatedWaitMins: 35
    },
    availableSlots: 18
  }
];

export const INITIAL_FARMER_PROFILE: FarmerProfile = {
  farmerId: 'MP-2024-7842',
  fullName: 'Sardar Gurpreet Singh',
  mobileNumber: '+91 98765 43210',
  location: {
    village: 'Rampur Kalan',
    tehsil: 'Samrala',
    district: 'Ludhiana',
    state: 'Punjab',
    pincode: '141114',
    coordinates: {
      lat: 30.8358,
      lng: 76.1917
    }
  },
  landHoldingAcres: 12.5,
  registeredDate: '12-Feb-2024',
  bankAccountMasked: 'Punjab National Bank (A/C: *******4891)'
};

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-2026-9481',
    farmerId: 'MP-2024-7842',
    farmerName: 'Sardar Gurpreet Singh',
    farmerMobile: '+91 98765 43210',
    cropId: 'crop-wheat',
    cropName: 'Wheat (गेहूं)',
    quantityQuintals: 65,
    expectedDate: '2026-09-08',
    centreId: 'centre-samrala',
    centreName: 'Samrala Main Grain Mandi & Procurement Hub',
    centreLocation: 'Grain Market Road, Samrala, Ludhiana, Punjab',
    slot: 'Morning (08:00 AM - 11:30 AM)',
    status: 'IN_QUEUE',
    createdAt: '2026-09-07 14:20',
    queuePosition: 3,
    farmersAhead: 2,
    estimatedWaitMinutes: 25,
    isRescheduled: false,
    rescheduleCount: 0
  },
  {
    id: 'BK-2026-8104',
    farmerId: 'MP-2024-7842',
    farmerName: 'Sardar Gurpreet Singh',
    farmerMobile: '+91 98765 43210',
    cropId: 'crop-mustard',
    cropName: 'Mustard / Rapeseed (सरसों)',
    quantityQuintals: 30,
    expectedDate: '2026-08-14',
    centreId: 'centre-machhiwara',
    centreName: 'Machhiwara Sub-Yard Procurement Centre',
    centreLocation: 'Ropar-Machhiwara Bypass Road',
    slot: 'Morning (08:00 AM - 11:30 AM)',
    status: 'COMPLETED',
    createdAt: '2026-08-10 10:15',
    isRescheduled: false,
    rescheduleCount: 0
  },
  {
    id: 'BK-2026-7290',
    farmerId: 'MP-2024-7842',
    farmerName: 'Sardar Gurpreet Singh',
    farmerMobile: '+91 98765 43210',
    cropId: 'crop-gram',
    cropName: 'Gram / Chana (चना)',
    quantityQuintals: 40,
    expectedDate: '2026-07-22',
    centreId: 'centre-ludhiana',
    centreName: 'Ludhiana Central Agro Procurement Terminal',
    centreLocation: 'GT Road, Mandi Complex, Ludhiana',
    slot: 'Midday (11:30 AM - 02:30 PM)',
    status: 'CANCELLED',
    createdAt: '2026-07-20 16:45',
    isRescheduled: false,
    rescheduleCount: 0
  }
];

export const INITIAL_PROCUREMENTS: ProcurementRecord[] = [
  {
    id: 'PRC-2026-9481',
    bookingId: 'BK-2026-9481',
    farmerId: 'MP-2024-7842',
    cropName: 'Wheat (गेहूं)',
    date: '08-Sep-2026',
    centreName: 'Samrala Main Grain Mandi & Procurement Hub',
    bookedQuantity: 65,
    acceptedQuantity: 65,
    grossWeight: 78.4,
    tareWeight: 13.4,
    netWeight: 65.0,
    mspRate: 2275,
    grossAmount: 147875,
    deductions: 0,
    deductionReason: 'Produce verified standard moisture (<12%)',
    qualityGrade: 'Standard',
    procurementStatus: 'Scheduled',
    paymentStatus: 'Pending',
    paymentAmount: 147875
  },
  {
    id: 'PRC-2026-5519',
    bookingId: 'BK-2026-8104',
    farmerId: 'MP-2024-7842',
    cropName: 'Mustard (सरसों)',
    date: '14-Aug-2026',
    centreName: 'Machhiwara Sub-Yard Procurement Centre',
    bookedQuantity: 30,
    acceptedQuantity: 29.4,
    grossWeight: 38.6,
    tareWeight: 8.6,
    netWeight: 29.4,
    mspRate: 5650,
    grossAmount: 169500,
    deductions: 3390,
    deductionReason: 'Moisture content 8.8% (0.6 Qtl standard deduction)',
    qualityGrade: 'Grade A',
    procurementStatus: 'Accepted',
    paymentStatus: 'Credited',
    paymentAmount: 166110
  },
  {
    id: 'PRC-2026-3820',
    bookingId: 'BK-2026-4402',
    farmerId: 'MP-2024-7842',
    cropName: 'Wheat (गेहूं)',
    date: '20-Apr-2026',
    centreName: 'Samrala Main Grain Mandi & Procurement Hub',
    bookedQuantity: 110,
    acceptedQuantity: 108.5,
    grossWeight: 128.2,
    tareWeight: 18.2,
    netWeight: 108.5,
    mspRate: 2275,
    grossAmount: 250250,
    deductions: 3412.5,
    deductionReason: 'Foreign matter / chaff 1.5 Qtl dockage',
    qualityGrade: 'Grade A',
    procurementStatus: 'Accepted',
    paymentStatus: 'Credited',
    paymentAmount: 246837.5
  }
];

export const INITIAL_PAYMENTS: PaymentRecord[] = [
  {
    id: 'PAY-2026-10291',
    transactionId: 'TXN-DBT-99812401',
    procurementId: 'PRC-2026-5519',
    bookingId: 'BK-2026-8104',
    farmerId: 'MP-2024-7842',
    cropName: 'Mustard (सरसों)',
    amount: 166110,
    date: '17-Aug-2026',
    paymentStatus: 'Credited',
    bankAccountMasked: 'Punjab National Bank (A/C: *******4891)',
    utrNumber: 'PNB2608170094182'
  },
  {
    id: 'PAY-2026-08194',
    transactionId: 'TXN-DBT-87102933',
    procurementId: 'PRC-2026-3820',
    bookingId: 'BK-2026-4402',
    farmerId: 'MP-2024-7842',
    cropName: 'Wheat (गेहूं)',
    amount: 246837.5,
    date: '23-Apr-2026',
    paymentStatus: 'Credited',
    bankAccountMasked: 'Punjab National Bank (A/C: *******4891)',
    utrNumber: 'PNB2604230182410'
  }
];

export const INITIAL_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    type: 'QUEUE',
    title: 'Token MP-2026-9481 is now #3 in queue',
    message: 'Your vehicle queue position is now #3 at Samrala Main Grain Mandi. 2 farmers ahead. Estimated wait: ~25 mins.',
    timestamp: '09:18 AM',
    read: false,
    referenceId: 'BK-2026-9481',
    priority: 'urgent'
  },
  {
    id: 'notif-2',
    type: 'BOOKING',
    title: 'Please keep your original documents ready',
    message: 'Aadhaar Card, Land record (Fard/Jamabandi), and Mandi gate registration slip must be produced at Gate No. 2.',
    timestamp: '08:40 AM',
    read: false,
    referenceId: 'BK-2026-9481'
  },
  {
    id: 'notif-3',
    type: 'ANNOUNCEMENT',
    title: 'Procurement centre operating hours updated',
    message: 'Samrala Main Mandi will operate weighbridges continuously from 08:00 AM to 06:00 PM for Rabi procurement.',
    timestamp: '07 Sep 2026',
    read: true
  },
  {
    id: 'notif-4',
    type: 'PAYMENT',
    title: 'Direct Benefit Transfer (DBT) Credited: ₹1,66,110.00',
    message: 'Procurement payment for 29.4 Qtl Mustard credited into PNB A/C: *******4891 via PFMS portal.',
    timestamp: '17 Aug 2026',
    read: true,
    referenceId: 'PAY-2026-10291'
  },
  {
    id: 'notif-5',
    type: 'ANNOUNCEMENT',
    title: 'Official MSP Rates 2026-27 Notified by Department',
    message: 'Cabinet Committee on Economic Affairs notified MSP: Wheat ₹2,275/Qtl, Mustard ₹5,650/Qtl, Gram ₹5,440/Qtl.',
    timestamp: '01 Aug 2026',
    read: true
  }
];
