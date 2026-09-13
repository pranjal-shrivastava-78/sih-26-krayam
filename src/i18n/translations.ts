import { Language } from '../types';

export interface TranslationStrings {
  // Navigation & Common
  appTitle: string;
  appSubtitle: string;
  navDashboard: string;
  navBooking: string;
  navTracking: string;
  navCentres: string;
  navProcurement: string;
  navHistory: string;
  navNotifications: string;
  navProfile: string;
  language: string;
  back: string;
  next: string;
  confirm: string;
  cancel: string;
  close: string;
  viewDetails: string;
  loading: string;
  status: string;
  date: string;
  action: string;
  helpSupport: string;
  settings: string;

  // Account & Profile
  login: string;
  register: string;
  logout: string;
  farmerProfile: string;
  farmerId: string;
  fullName: string;
  mobileNumber: string;
  village: string;
  tehsil: string;
  district: string;
  state: string;
  pincode: string;
  locationDetails: string;
  useCurrentLocation: string;
  gpsCoordinates: string;
  profileUpdated: string;
  registeredOn: string;
  verifiedFarmer: string;

  // Booking
  procurementBooking: string;
  createBooking: string;
  selectCrop: string;
  enterQuantity: string;
  quantityInQuintals: string;
  expectedDate: string;
  provideLocation: string;
  recommendedCentre: string;
  alternativeCentres: string;
  compareCentres: string;
  selectCentre: string;
  selectSlot: string;
  confirmBooking: string;
  cancelBooking: string;
  rescheduleBooking: string;
  bookingSuccess: string;
  bookingCancelled: string;
  bookingRescheduled: string;
  cancelBookingConfirm: string;
  rescheduleNotice: string;
  noActiveBooking: string;
  comparisonTitle: string;
  comparisonDistance: string;
  comparisonHours: string;
  comparisonQueue: string;
  comparisonCrops: string;
  comparisonSlots: string;

  // Queue Tracking
  queueTrackingTitle: string;
  currentBooking: string;
  bookingStatus: string;
  bookingId: string;
  liveQueuePosition: string;
  farmersAhead: string;
  estimatedWaitTime: string;
  queueProgress: string;
  turnApproachingAlert: string;
  turnApproachingMsg: string;
  minutesAbbr: string;
  people: string;
  positionNumber: string;
  inProgress: string;

  // Centre Information
  centreDirectory: string;
  centreDetails: string;
  centreLocation: string;
  distance: string;
  acceptedCrops: string;
  operatingHours: string;
  currentQueueLoad: string;
  mapNavigation: string;
  getDirections: string;
  openMap: string;
  searchCentre: string;
  filterCrop: string;
  allCrops: string;
  inCharge: string;
  contact: string;

  // Procurement & Payment
  procurementPaymentTitle: string;
  procurementStatus: string;
  bookedQuantity: string;
  acceptedQuantity: string;
  paymentAmount: string;
  paymentStatus: string;
  paymentHistory: string;
  qualityGrade: string;
  mspRate: string;
  transactionRef: string;
  creditedTo: string;

  // Notifications
  notificationsTitle: string;
  markAllRead: string;
  noNotifications: string;
  tabAll: string;
  tabBooking: string;
  tabQueue: string;
  tabProcurement: string;
  tabPayment: string;
  tabAnnouncements: string;

  // History
  historyTitle: string;
  bookingHistory: string;
  procurementHistory: string;
  paymentHistoryTab: string;
  noHistory: string;
}

export const translations: Record<Language, TranslationStrings> = {
  en: {
    appTitle: 'KRAYAM Portal',
    appSubtitle: 'Government Grain Procurement & Queue System',
    navDashboard: 'Dashboard',
    navBooking: 'Book Slot',
    navTracking: 'Queue Track',
    navCentres: 'Centres',
    navProcurement: 'Procurement',
    navHistory: 'History',
    navNotifications: 'Alerts',
    navProfile: 'Profile',
    language: 'Language',
    back: 'Back',
    next: 'Next',
    confirm: 'Confirm',
    cancel: 'Cancel',
    close: 'Close',
    viewDetails: 'View Details',
    loading: 'Loading...',
    status: 'Status',
    date: 'Date',
    action: 'Action',
    helpSupport: 'Help & Support',
    settings: 'Settings',

    login: 'Farmer Login',
    register: 'Farmer Registration',
    logout: 'Logout',
    farmerProfile: 'Farmer Profile',
    farmerId: 'Farmer ID',
    fullName: 'Full Name',
    mobileNumber: 'Mobile Number',
    village: 'Village',
    tehsil: 'Tehsil / Mandal',
    district: 'District',
    state: 'State',
    pincode: 'PIN Code',
    locationDetails: 'Village / Location Details',
    useCurrentLocation: 'Use GPS Location',
    gpsCoordinates: 'Coordinates',
    profileUpdated: 'Profile updated successfully',
    registeredOn: 'Registered Date',
    verifiedFarmer: 'Government Verified Farmer',

    procurementBooking: 'Procurement Booking',
    createBooking: 'New Booking',
    selectCrop: 'Select Crop',
    enterQuantity: 'Enter Quantity',
    quantityInQuintals: 'Quantity (in Quintals)',
    expectedDate: 'Expected Procurement Date',
    provideLocation: 'Select / Confirm Location',
    recommendedCentre: 'Recommended Centre (Fastest & Closest)',
    alternativeCentres: 'Alternative Nearby Centres',
    compareCentres: 'Compare Centres Side-by-Side',
    selectCentre: 'Select Centre',
    selectSlot: 'Select Time Slot',
    confirmBooking: 'Confirm Booking',
    cancelBooking: 'Cancel Booking',
    rescheduleBooking: 'Reschedule Booking',
    bookingSuccess: 'Booking confirmed successfully!',
    bookingCancelled: 'Booking has been cancelled.',
    bookingRescheduled: 'Booking rescheduled successfully.',
    cancelBookingConfirm: 'Are you sure you want to cancel this booking?',
    rescheduleNotice: 'Rescheduling is permitted up to 24 hours prior to the booked slot.',
    noActiveBooking: 'No active booking found. Book a procurement slot to track.',
    comparisonTitle: 'Centre Comparison Matrix',
    comparisonDistance: 'Distance from you',
    comparisonHours: 'Operating Hours',
    comparisonQueue: 'Current Queue / Load',
    comparisonCrops: 'Accepted Crops',
    comparisonSlots: 'Slot Availability',

    queueTrackingTitle: 'Live Booking & Queue Tracking',
    currentBooking: 'Current Active Booking',
    bookingStatus: 'Booking Status',
    bookingId: 'Booking ID',
    liveQueuePosition: 'Live Queue Position',
    farmersAhead: 'Farmers Ahead of You',
    estimatedWaitTime: 'Estimated Waiting Time',
    queueProgress: 'Queue Progress Status',
    turnApproachingAlert: 'TURN APPROACHING ALERT',
    turnApproachingMsg: 'Your turn is approaching! Please keep your vehicle and documents ready at the weighing station.',
    minutesAbbr: 'mins',
    people: 'farmers',
    positionNumber: 'Position #',
    inProgress: 'In Progress',

    centreDirectory: 'Procurement Centre Directory',
    centreDetails: 'Centre Details',
    centreLocation: 'Location',
    distance: 'Distance',
    acceptedCrops: 'Accepted Crops',
    operatingHours: 'Operating Hours',
    currentQueueLoad: 'Current Queue / Load',
    mapNavigation: 'Map & Navigation',
    getDirections: 'Get Directions',
    openMap: 'View on Map',
    searchCentre: 'Search centres by name or village...',
    filterCrop: 'Filter by Crop',
    allCrops: 'All Crops',
    inCharge: 'Officer In-Charge',
    contact: 'Contact Number',

    procurementPaymentTitle: 'Procurement & Payment Status',
    procurementStatus: 'Procurement Status',
    bookedQuantity: 'Booked Quantity',
    acceptedQuantity: 'Accepted Quantity',
    paymentAmount: 'Payment Amount',
    paymentStatus: 'Payment Status',
    paymentHistory: 'Payment History',
    qualityGrade: 'Quality Grade',
    mspRate: 'MSP Rate / Qtl',
    transactionRef: 'Bank Ref / UTR',
    creditedTo: 'Credited Account',

    notificationsTitle: 'Notifications & Alerts',
    markAllRead: 'Mark all as read',
    noNotifications: 'No notifications at this time',
    tabAll: 'All',
    tabBooking: 'Bookings',
    tabQueue: 'Queue',
    tabProcurement: 'Procurement',
    tabPayment: 'Payments',
    tabAnnouncements: 'Announcements',

    historyTitle: 'Activity History',
    bookingHistory: 'Booking History',
    procurementHistory: 'Procurement History',
    paymentHistoryTab: 'Payment History',
    noHistory: 'No history records found',
  },
  hi: {
    appTitle: 'क्रयम (KRAYAM) पोर्टल',
    appSubtitle: 'सरकारी अनाज खरीद एवं कतार प्रबंधन प्रणाली',
    navDashboard: 'मुख्य पृष्ठ',
    navBooking: 'स्लॉट बुक करें',
    navTracking: 'कतार स्थिति',
    navCentres: 'खरीद केंद्र',
    navProcurement: 'खरीद व भुगतान',
    navHistory: 'इतिहास',
    navNotifications: 'सूचनाएं',
    navProfile: 'प्रोफ़ाइल',
    language: 'भाषा',
    back: 'पीछे',
    next: 'आगे',
    confirm: 'पुष्टि करें',
    cancel: 'रद्द करें',
    close: 'बंद करें',
    viewDetails: 'विवरण देखें',
    loading: 'लोड हो रहा है...',
    status: 'स्थिति',
    date: 'तारीख',
    action: 'कार्रवाई',
    helpSupport: 'सहायता',
    settings: 'सेटिंग्स',

    login: 'किसान लॉगिन',
    register: 'किसान पंजीकरण',
    logout: 'लॉगआउट',
    farmerProfile: 'किसान प्रोफ़ाइल',
    farmerId: 'किसान आईडी',
    fullName: 'पूरा नाम',
    mobileNumber: 'मोबाइल नंबर',
    village: 'गांव',
    tehsil: 'तहसील / ब्लॉक',
    district: 'जिला',
    state: 'राज्य',
    pincode: 'पिन कोड',
    locationDetails: 'गांव / स्थान विवरण',
    useCurrentLocation: 'जीपीएस स्थान का उपयोग करें',
    gpsCoordinates: 'निर्देशांक',
    profileUpdated: 'प्रोफ़ाइल सफलतापूर्वक अपडेट हो गई',
    registeredOn: 'पंजीकरण तिथि',
    verifiedFarmer: 'सरकारी सत्यापित किसान',

    procurementBooking: 'उपज खरीद बुकिंग',
    createBooking: 'नई बुकिंग करें',
    selectCrop: 'फसल चुनें',
    enterQuantity: 'मात्रा दर्ज करें',
    quantityInQuintals: 'मात्रा (क्विंटल में)',
    expectedDate: 'अपेक्षित खरीद तिथि',
    provideLocation: 'स्थान की पुष्टि करें',
    recommendedCentre: 'सुझाया गया केंद्र (निकटतम एवं तेज)',
    alternativeCentres: 'अन्य नजदीकी खरीद केंद्र',
    compareCentres: 'केंद्रों की तुलना करें',
    selectCentre: 'केंद्र चुनें',
    selectSlot: 'समय स्लॉट चुनें',
    confirmBooking: 'बुकिंग की पुष्टि करें',
    cancelBooking: 'बुकिंग रद्द करें',
    rescheduleBooking: 'समय बदलें (पुनर्निर्धारण)',
    bookingSuccess: 'बुकिंग सफलतापूर्वक संपन्न हुई!',
    bookingCancelled: 'बुकिंग रद्द कर दी गई है।',
    bookingRescheduled: 'बुकिंग सफलतापूर्वक पुनर्निर्धारित हुई।',
    cancelBookingConfirm: 'क्या आप वाकई इस बुकिंग को रद्द करना चाहते हैं?',
    rescheduleNotice: 'बुकिंग समय से 24 घंटे पहले तक पुनर्निर्धारण की अनुमति है।',
    noActiveBooking: 'कोई सक्रिय बुकिंग नहीं मिली। कतार देखने के लिए स्लॉट बुक करें।',
    comparisonTitle: 'केंद्र तुलना तालिका',
    comparisonDistance: 'आपसे दूरी',
    comparisonHours: 'कार्य समय',
    comparisonQueue: 'वर्तमान कतार / भीड़',
    comparisonCrops: 'स्वीकृत फसलें',
    comparisonSlots: 'स्लॉट उपलब्धता',

    queueTrackingTitle: 'लाइव बुकिंग एवं कतार ट्रैकिंग',
    currentBooking: 'वर्तमान सक्रिय बुकिंग',
    bookingStatus: 'बुकिंग स्थिति',
    bookingId: 'बुकिंग आईडी',
    liveQueuePosition: 'लाइव कतार क्रम संख्या',
    farmersAhead: 'आपसे आगे किसान',
    estimatedWaitTime: 'अनुमानित प्रतीक्षा समय',
    queueProgress: 'कतार प्रगति स्थिति',
    turnApproachingAlert: 'आपकी बारी आने वाली है!',
    turnApproachingMsg: 'आपकी बारी जल्द आ रही है! कृपया अपने वाहन और दस्तावेजों के साथ तौल कांटे पर तैयार रहें।',
    minutesAbbr: 'मिनट',
    people: 'किसान',
    positionNumber: 'स्थान #',
    inProgress: 'प्रगति पर',

    centreDirectory: 'खरीद केंद्र निर्देशिका',
    centreDetails: 'केंद्र विवरण',
    centreLocation: 'स्थान',
    distance: 'दूरी',
    acceptedCrops: 'स्वीकृत फसलें',
    operatingHours: 'कार्य समय',
    currentQueueLoad: 'वर्तमान भीड़ / कतार',
    mapNavigation: 'मानचित्र एवं नेविगेशन',
    getDirections: 'रास्ता देखें (नेविगेशन)',
    openMap: 'नक्शे पर देखें',
    searchCentre: 'नाम या गांव से केंद्र खोजें...',
    filterCrop: 'फसल द्वारा फ़िल्टर',
    allCrops: 'सभी फसलें',
    inCharge: 'प्रभारी अधिकारी',
    contact: 'संपर्क नंबर',

    procurementPaymentTitle: 'खरीद एवं भुगतान स्थिति',
    procurementStatus: 'खरीद स्थिति',
    bookedQuantity: 'बुक की गई मात्रा',
    acceptedQuantity: 'स्वीकृत मात्रा',
    paymentAmount: 'भुगतान राशि',
    paymentStatus: 'भुगतान स्थिति',
    paymentHistory: 'भुगतान इतिहास',
    qualityGrade: 'गुणवत्ता ग्रेड',
    mspRate: 'एमएसपी दर / क्विंटल',
    transactionRef: 'बैंक संदर्भ / यूटीआर',
    creditedTo: 'जमा खाता',

    notificationsTitle: 'सूचनाएं एवं अलर्ट',
    markAllRead: 'सभी को पढ़ा हुआ चिह्नित करें',
    noNotifications: 'इस समय कोई नई सूचना नहीं है',
    tabAll: 'सभी',
    tabBooking: 'बुकिंग',
    tabQueue: 'कतार',
    tabProcurement: 'खरीद',
    tabPayment: 'भुगतान',
    tabAnnouncements: 'घोषणाएं',

    historyTitle: 'गतिविधि इतिहास',
    bookingHistory: 'बुकिंग इतिहास',
    procurementHistory: 'खरीद इतिहास',
    paymentHistoryTab: 'भुगतान इतिहास',
    noHistory: 'कोई इतिहास रिकॉर्ड नहीं मिला',
  },
  pa: {
    appTitle: 'ਕਰਯਮ (KRAYAM) ਪੋਰਟਲ',
    appSubtitle: 'ਸਰਕਾਰੀ ਖਰੀਦ ਅਤੇ ਕਤਾਰ ਪ੍ਰਬੰਧਨ ਪ੍ਰਣਾਲੀ',
    navDashboard: 'ਮੁੱਖ ਪੰਨਾ',
    navBooking: 'ਸਲਾਟ ਬੁੱਕ ਕਰੋ',
    navTracking: 'ਕਤਾਰ ਟਰੈਕ',
    navCentres: 'ਖਰੀਦ ਕੇਂਦਰ',
    navProcurement: 'ਖਰੀਦ ਤੇ ਭੁਗਤਾਨ',
    navHistory: 'ਇਤਿਹਾਸ',
    navNotifications: 'ਸੂਚਨਾਵਾਂ',
    navProfile: 'ਪ੍ਰੋਫਾਈਲ',
    language: 'ਭਾਸ਼ਾ',
    back: 'ਪਿੱਛੇ',
    next: 'ਅੱਗੇ',
    confirm: 'ਪੁਸ਼ਟੀ ਕਰੋ',
    cancel: 'ਰੱਦ ਕਰੋ',
    close: 'ਬੰਦ ਕਰੋ',
    viewDetails: 'ਵੇਰਵੇ ਦੇਖੋ',
    loading: 'ਲੋਡ ਹੋ ਰਿਹਾ ਹੈ...',
    status: 'ਸਥਿਤੀ',
    date: 'ਮਿਤੀ',
    action: 'ਕਾਰਵਾਈ',
    helpSupport: 'ਸਹਾਇਤਾ',
    settings: 'ਸੈਟਿੰਗਾਂ',

    login: 'ਕਿਸਾਨ ਲੌਗਇਨ',
    register: 'ਕਿਸਾਨ ਰਜਿਸਟ੍ਰੇਸ਼ਨ',
    logout: 'ਲਾੱਗ ਆਉਟ',
    farmerProfile: 'ਕਿਸਾਨ ਪ੍ਰੋਫਾਈਲ',
    farmerId: 'ਕਿਸਾਨ ਆਈ.ਡੀ',
    fullName: 'ਪੂਰਾ ਨਾਮ',
    mobileNumber: 'ਮੋਬਾਈਲ ਨੰਬਰ',
    village: 'ਪਿੰਡ',
    tehsil: 'ਤਹਿਸੀਲ / ਬਲਾਕ',
    district: 'ਜ਼ਿਲ੍ਹਾ',
    state: 'ਰਾਜ',
    pincode: 'ਪਿੰਨ ਕੋਡ',
    locationDetails: 'ਪਿੰਡ / ਸਥਾਨ ਦੇ ਵੇਰਵੇ',
    useCurrentLocation: 'ਮੌਜੂਦਾ ਜੀਪੀਐਸ ਵਰਤੋ',
    gpsCoordinates: 'ਕੋਆਰਡੀਨੇਟਸ',
    profileUpdated: 'ਪ੍ਰੋਫਾਈਲ ਸਫਲਤਾਪੂਰਵਕ ਅੱਪਡੇਟ ਕੀਤੀ ਗਈ',
    registeredOn: 'ਰਜਿਸਟ੍ਰੇਸ਼ਨ ਮਿਤੀ',
    verifiedFarmer: 'ਸਰਕਾਰੀ ਪ੍ਰਮਾਣਿਤ ਕਿਸਾਨ',

    procurementBooking: 'ਖਰੀਦ ਬੁਕਿੰਗ',
    createBooking: 'ਨਵੀਂ ਬੁਕਿੰਗ',
    selectCrop: 'ਫ਼ਸਲ ਚੁਣੋ',
    enterQuantity: 'ਮਾਤਰਾ ਦਰਜ ਕਰੋ',
    quantityInQuintals: 'ਮਾਤਰਾ (ਕੁਇੰਟਲਾਂ ਵਿੱਚ)',
    expectedDate: 'ਸੰਭਾਵਿਤ ਖਰੀਦ ਮਿਤੀ',
    provideLocation: 'ਸਥਾਨ ਚੁਣੋ/ਪੁਸ਼ਟੀ ਕਰੋ',
    recommendedCentre: 'ਸੁਝਾਇਆ ਗਿਆ ਕੇਂਦਰ (ਨੇੜਲਾ ਅਤੇ ਤੇਜ਼)',
    alternativeCentres: 'ਹੋਰ ਨੇੜਲੇ ਖਰੀਦ ਕੇਂਦਰ',
    compareCentres: 'ਕੇਂਦਰਾਂ ਦੀ ਤੁਲਨਾ ਕਰੋ',
    selectCentre: 'ਕੇਂਦਰ ਚੁਣੋ',
    selectSlot: 'ਸਮਾਂ ਸਲਾਟ ਚੁਣੋ',
    confirmBooking: 'ਬੁਕਿੰਗ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ',
    cancelBooking: 'ਬੁਕਿੰਗ ਰੱਦ ਕਰੋ',
    rescheduleBooking: 'ਸਮਾਂ ਬਦਲੋ',
    bookingSuccess: 'ਬੁਕਿੰਗ ਸਫਲਤਾਪੂਰਵਕ ਹੋ ਗਈ!',
    bookingCancelled: 'ਬੁਕਿੰਗ ਰੱਦ ਕਰ ਦਿੱਤੀ ਗਈ ਹੈ।',
    bookingRescheduled: 'ਬੁਕਿੰਗ ਨਵੇਂ ਸਮੇਂ ਤੇ ਤੈਅ ਕੀਤੀ ਗਈ।',
    cancelBookingConfirm: 'ਕੀ ਤੁਸੀਂ ਵਾਕਈ ਇਹ ਬੁਕਿੰਗ ਰੱਦ ਕਰਨਾ ਚਾਹੁੰਦੇ ਹੋ?',
    rescheduleNotice: 'ਬੁਕਿੰਗ ਤੋਂ 24 ਘੰਟੇ ਪਹਿਲਾਂ ਸਮਾਂ ਬਦਲਿਆ ਜਾ ਸਕਦਾ ਹੈ।',
    noActiveBooking: 'ਕੋਈ ਸਰਗਰਮ ਬੁਕਿੰਗ ਨਹੀਂ ਮਿਲੀ। ਟਰੈਕ ਕਰਨ ਲਈ ਸਲਾਟ ਬੁੱਕ ਕਰੋ।',
    comparisonTitle: 'ਕੇਂਦਰ ਤੁਲਨਾ',
    comparisonDistance: 'ਦੂਰੀ',
    comparisonHours: 'ਕੰਮ ਦੇ ਘੰਟੇ',
    comparisonQueue: 'ਮੌਜੂਦਾ ਕਤਾਰ / ਭੀੜ',
    comparisonCrops: 'ਮਨਜ਼ੂਰ ਫ਼ਸਲਾਂ',
    comparisonSlots: 'ਉਪਲਬਧ ਸਲਾਟ',

    queueTrackingTitle: 'ਲਾਈਵ ਬੁਕਿੰਗ ਅਤੇ ਕਤਾਰ ਟਰੈਕਿੰਗ',
    currentBooking: 'ਮੌਜੂਦਾ ਬੁਕਿੰਗ',
    bookingStatus: 'ਬੁਕਿੰਗ ਸਥਿਤੀ',
    bookingId: 'ਬੁਕਿੰਗ ਆਈ.ਡੀ',
    liveQueuePosition: 'ਲਾਈਵ ਕਤਾਰ ਨੰਬਰ',
    farmersAhead: 'ਤੁਹਾਡੇ ਤੋਂ ਅੱਗੇ ਕਿਸਾਨ',
    estimatedWaitTime: 'ਅੰਦਾਜ਼ਨ ਉਡੀਕ ਸਮਾਂ',
    queueProgress: 'ਕਤਾਰ ਦੀ ਪ੍ਰਗਤੀ',
    turnApproachingAlert: 'ਤੁਹਾਡੀ ਵਾਰੀ ਆਉਣ ਵਾਲੀ ਹੈ!',
    turnApproachingMsg: 'ਤੁਹਾਡੀ ਵਾਰੀ ਨੇੜੇ ਹੈ! ਕਿਰਪਾ ਕਰਕੇ ਕੰਡੇ ਤੇ ਆਪਣੀ ਟਰਾਲੀ ਅਤੇ ਕਾਗਜ਼ਾਤ ਤਿਆਰ ਰੱਖੋ।',
    minutesAbbr: 'ਮਿੰਟ',
    people: 'ਕਿਸਾਨ',
    positionNumber: 'ਨੰਬਰ #',
    inProgress: 'ਚੱਲ ਰਿਹਾ ਹੈ',

    centreDirectory: 'ਖਰੀਦ ਕੇਂਦਰ ਡਾਇਰੈਕਟਰੀ',
    centreDetails: 'ਕੇਂਦਰ ਦੇ ਵੇਰਵੇ',
    centreLocation: 'ਸਥਾਨ',
    distance: 'ਦੂਰੀ',
    acceptedCrops: 'ਮਨਜ਼ੂਰ ਫਸਲਾਂ',
    operatingHours: 'ਕੰਮ ਦਾ ਸਮਾਂ',
    currentQueueLoad: 'ਮੌਜੂਦਾ ਭੀੜ',
    mapNavigation: 'ਨਕਸ਼ਾ ਅਤੇ ਦਿਸ਼ਾ-ਨਿਰਦੇਸ਼',
    getDirections: 'ਰਸਤਾ ਦੇਖੋ',
    openMap: 'ਨਕਸ਼ੇ ਤੇ ਵੇਖੋ',
    searchCentre: 'ਕੇਂਦਰ ਦੀ ਖੋਜ ਕਰੋ...',
    filterCrop: 'ਫ਼ਸਲ ਮੁਤਾਬਕ ਫਿਲਟਰ',
    allCrops: 'ਸਾਰੀਆਂ ਫਸਲਾਂ',
    inCharge: 'ਇੰਚਾਰਜ ਅਧਿਕਾਰੀ',
    contact: 'ਸੰਪਰਕ ਨੰਬਰ',

    procurementPaymentTitle: 'ਖਰੀਦ ਅਤੇ ਭੁਗਤਾਨ ਸਥਿਤੀ',
    procurementStatus: 'ਖਰੀਦ ਸਥਿਤੀ',
    bookedQuantity: 'ਬੁੱਕ ਕੀਤੀ ਮਾਤਰਾ',
    acceptedQuantity: 'ਪ੍ਰਵਾਨਿਤ ਮਾਤਰਾ',
    paymentAmount: 'ਭੁਗਤਾਨ ਰਕਮ',
    paymentStatus: 'ਭੁਗਤਾਨ ਸਥਿਤੀ',
    paymentHistory: 'ਭੁਗਤਾਨ ਇਤਿਹਾਸ',
    qualityGrade: 'ਗੁਣਵੱਤਾ ਗ੍ਰੇਡ',
    mspRate: 'ਐਮ.ਐਸ.ਪੀ ਦਰ / ਕੁਇੰਟਲ',
    transactionRef: 'ਬੈਂਕ ਰੈਫਰੈਂਸ / ਯੂ.ਟੀ.ਆਰ',
    creditedTo: 'ਜਮ੍ਹਾ ਖਾਤਾ',

    notificationsTitle: 'ਸੂਚਨਾਵਾਂ ਅਤੇ ਚੇਤਾਵਨੀਆਂ',
    markAllRead: 'ਸਭ ਪੜ੍ਹੇ ਗਏ ਮਾਰਕ ਕਰੋ',
    noNotifications: 'ਕੋਈ ਨਵੀਂ ਸੂਚਨਾ ਨਹੀਂ ਹੈ',
    tabAll: 'ਸਭ',
    tabBooking: 'ਬੁਕਿੰਗ',
    tabQueue: 'ਕਤਾਰ',
    tabProcurement: 'ਖਰੀਦ',
    tabPayment: 'ਭੁਗਤਾਨ',
    tabAnnouncements: 'ਐਲਾਨ',

    historyTitle: 'ਸਰਗਰਮੀ ਇਤਿਹਾਸ',
    bookingHistory: 'ਬੁਕਿੰਗ ਇਤਿਹਾਸ',
    procurementHistory: 'ਖਰੀਦ ਇਤਿਹਾਸ',
    paymentHistoryTab: 'ਭੁਗਤਾਨ ਇਤਿਹਾਸ',
    noHistory: 'ਕੋਈ ਰਿਕਾਰਡ ਨਹੀਂ ਮਿਲਿਆ',
  },
  mr: {
    appTitle: 'क्रयम (KRAYAM) पोर्टल',
    appSubtitle: 'शासकीय धान्य खरेदी व रांग व्यवस्थापन प्रणाली',
    navDashboard: 'मुख्य पृष्ठ',
    navBooking: 'स्लॉट बुकिंग',
    navTracking: 'रांग ट्रॅकिंग',
    navCentres: 'खरेदी केंद्र',
    navProcurement: 'खरेदी व पेमेंट',
    navHistory: 'इतिहास',
    navNotifications: 'सूचना',
    navProfile: 'प्रोफाइल',
    language: 'भाषा',
    back: 'मागे',
    next: 'पुढे',
    confirm: 'निश्चित करा',
    cancel: 'रद्द करा',
    close: 'बंद करा',
    viewDetails: 'तपशील पहा',
    loading: 'लोड होत आहे...',
    status: 'स्थिती',
    date: 'तारीख',
    action: 'कृती',
    helpSupport: 'मदत',
    settings: 'सेटिंग्ज',

    login: 'शेतकरी लॉगिन',
    register: 'शेतकरी नोंदणी',
    logout: 'लॉगआउट',
    farmerProfile: 'शेतकरी प्रोफाइल',
    farmerId: 'शेतकरी आयडी',
    fullName: 'पूर्ण नाव',
    mobileNumber: 'मोबाईल नंबर',
    village: 'गाव',
    tehsil: 'तालुका',
    district: 'जिल्हा',
    state: 'राज्य',
    pincode: 'पिन कोड',
    locationDetails: 'गाव / ठिकाण तपशील',
    useCurrentLocation: 'जीपीएस स्थान वापरा',
    gpsCoordinates: 'निर्देशांक',
    profileUpdated: 'प्रोफाइल यशस्वीरित्या अद्यतनित झाली',
    registeredOn: 'नोंदणी तारीख',
    verifiedFarmer: 'शासकीय प्रमाणित शेतकरी',

    procurementBooking: 'धान्य खरेदी नोंदणी',
    createBooking: 'नवीन बुकिंग',
    selectCrop: 'पीक निवडा',
    enterQuantity: 'प्रमाण प्रविष्ट करा',
    quantityInQuintals: 'प्रमाण (क्विंटलमध्ये)',
    expectedDate: 'अपेक्षित खरेदी तारीख',
    provideLocation: 'स्थान निश्चित करा',
    recommendedCentre: 'शिफारस केलेले केंद्र (जवळचे आणि वेगवान)',
    alternativeCentres: 'इतर जवळची खरेदी केंद्रे',
    compareCentres: 'केंद्रांची तुलना करा',
    selectCentre: 'केंद्र निवडा',
    selectSlot: 'वेळ स्लॉट निवडा',
    confirmBooking: 'बुकिंग निश्चित करा',
    cancelBooking: 'बुकिंग रद्द करा',
    rescheduleBooking: 'वेळ बदला',
    bookingSuccess: 'बुकिंग यशस्वीरीत्या पूर्ण झाली!',
    bookingCancelled: 'बुकिंग रद्द करण्यात आली आहे.',
    bookingRescheduled: 'बुकिंग पुन्हा शेड्यूल केली गेली.',
    cancelBookingConfirm: 'तुम्हाला ही बुकिंग नक्की रद्द करायची आहे का?',
    rescheduleNotice: 'बुकिंगच्या २४ तास आधीपर्यंत वेळ बदलण्याची परवानगी आहे.',
    noActiveBooking: 'सक्रिय बुकिंग सापडली नाही. ट्रॅक करण्यासाठी स्लॉट बुक करा.',
    comparisonTitle: 'केंद्र तुलना तक्ता',
    comparisonDistance: 'आपल्यापासून अंतर',
    comparisonHours: 'कामाची वेळ',
    comparisonQueue: 'सध्याची रांग / गर्दी',
    comparisonCrops: 'स्वीकृत पिके',
    comparisonSlots: 'स्लॉट उपलब्धता',

    queueTrackingTitle: 'थेट बुकिंग व रांग ट्रॅकिंग',
    currentBooking: 'सध्याची सक्रिय बुकिंग',
    bookingStatus: 'बुकिंग स्थिती',
    bookingId: 'बुकिंग आयडी',
    liveQueuePosition: 'थेट रांगेतील क्रमांक',
    farmersAhead: 'आपल्यापुढील शेतकरी',
    estimatedWaitTime: 'अपेक्षित प्रतीक्षा वेळ',
    queueProgress: 'रांग प्रगती स्थिती',
    turnApproachingAlert: 'तुमची पाळी येत आहे!',
    turnApproachingMsg: 'तुमची पाळी लवकरच येत आहे! कृपया वाहने व कागदपत्रांसह वजन काट्याजवळ तयार राहा.',
    minutesAbbr: 'मिनिटे',
    people: 'शेतकरी',
    positionNumber: 'स्थान #',
    inProgress: 'प्रगतीपथावर',

    centreDirectory: 'खरेदी केंद्र निर्देशिका',
    centreDetails: 'केंद्र तपशील',
    centreLocation: 'स्थान',
    distance: 'अंतर',
    acceptedCrops: 'स्वीकृत पिके',
    operatingHours: 'कामाची वेळ',
    currentQueueLoad: 'सध्याची गर्दी',
    mapNavigation: 'नकाशा व दिशा-मार्ग',
    getDirections: 'मार्ग पहा',
    openMap: 'नकाशावर पहा',
    searchCentre: 'नावाने किंवा गावाने केंद्र शोधा...',
    filterCrop: 'पिकानुसार निवडा',
    allCrops: 'सर्व पिके',
    inCharge: 'प्रभारी अधिकारी',
    contact: 'संपर्क क्रमांक',

    procurementPaymentTitle: 'खरेदी व देयक स्थिती',
    procurementStatus: 'खरेदी स्थिती',
    bookedQuantity: 'नोंदवलेले प्रमाण',
    acceptedQuantity: 'स्वीकृत प्रमाण',
    paymentAmount: 'पेमेंट रक्कम',
    paymentStatus: 'पेमेंट स्थिती',
    paymentHistory: 'पेमेंट इतिहास',
    qualityGrade: 'गुणवत्ता प्रत',
    mspRate: 'हमीभाव दर / क्विंटल',
    transactionRef: 'बँक संदर्भ / यूटीआर',
    creditedTo: 'जमा खाते',

    notificationsTitle: 'सूचना व अलर्ट्स',
    markAllRead: 'सर्व वाचलेले म्हणून चिन्हांकित करा',
    noNotifications: 'सध्या कोणतीही नवीन सूचना नाही',
    tabAll: 'सर्व',
    tabBooking: 'बुकिंग',
    tabQueue: 'रांग',
    tabProcurement: 'खरेदी',
    tabPayment: 'पेमेंट',
    tabAnnouncements: 'घोषणा',

    historyTitle: 'नोंद इतिहास',
    bookingHistory: 'बुकिंग इतिहास',
    procurementHistory: 'खरेदी इतिहास',
    paymentHistoryTab: 'पेमेंट इतिहास',
    noHistory: 'कोणतीही नोंद सापडली नाही',
  }
};
