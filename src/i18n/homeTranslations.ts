import { Language } from '../types';

export interface HomeTranslations {
  // Header
  appTitle: string;
  appSubtitle: string;
  registerLogin: string;
  goToDashboard: string;

  // Hero
  heroBadge: string;
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleLine3: string;
  heroDescription: string;
  digitalTodayLine1: string;
  digitalTodayLine2: string;

  // Hero Benefits (Right floating card)
  benefit1Title: string;
  benefit1Desc: string;
  benefit2Title: string;
  benefit2Desc: string;
  benefit3Title: string;
  benefit3Desc: string;
  benefit4Title: string;
  benefit4Desc: string;

  // Statistics Strip
  stat1Value: string;
  stat1Label: string;
  stat2Value: string;
  stat2Label: string;
  stat3Value: string;
  stat3Label: string;
  stat4Value: string;
  stat4Label: string;
  stat5Value: string;
  stat5Label: string;
  stat6Value: string;
  stat6Label: string;

  // Features Section
  featuresTitle: string;
  featuresSubtitle: string;

  // 8 Feature Cards
  feature1Title: string;
  feature1Desc: string;
  feature2Title: string;
  feature2Desc: string;
  feature3Title: string;
  feature3Desc: string;
  feature4Title: string;
  feature4Desc: string;
  feature5Title: string;
  feature5Desc: string;
  feature6Title: string;
  feature6Desc: string;
  feature7Title: string;
  feature7Desc: string;
  feature8Title: string;
  feature8Desc: string;

  // Produce Image Card
  produceCardTitle: string;
  produceCardSubtitle: string;

  // Footer / Legal Links
  footerAbout: string;
  footerPrivacy: string;
  footerTerms: string;
}

export const homeTranslations: Record<Language, HomeTranslations> = {
  en: {
    appTitle: 'KRAYAM',
    appSubtitle: 'Smarter Procurement. Stronger Agriculture',
    registerLogin: 'Register / Log In',
    goToDashboard: 'Go to Dashboard',

    heroBadge: 'Digital Agriculture  |  Transparent Markets  |  Stronger Farmers',
    heroTitleLine1: 'A Unified Platform for',
    heroTitleLine2: 'Agricultural Produce',
    heroTitleLine3: 'Procurement & Management',
    heroDescription: 'Connecting farmers, procurement centres and markets through digital technology — ensuring fair prices, transparent processes and a stronger agricultural ecosystem.',
    digitalTodayLine1: 'Digital Today,',
    digitalTodayLine2: 'Better Tomorrow',

    benefit1Title: 'Fair Prices',
    benefit1Desc: 'Transparent procurement',
    benefit2Title: 'Less Waiting',
    benefit2Desc: 'Smart queue management',
    benefit3Title: 'Quality Assurance',
    benefit3Desc: 'Accurate weighing & grading',
    benefit4Title: 'Direct Payments',
    benefit4Desc: 'Safe & secure transactions',

    stat1Value: '50,000+',
    stat1Label: 'Farmers Connected',
    stat2Value: '250+',
    stat2Label: 'Procurement Centres',
    stat3Value: '20+',
    stat3Label: 'Crops Supported',
    stat4Value: '1.2M+ Tonnes',
    stat4Label: 'Produce Procured',
    stat5Value: '₹ 1,800+ Cr',
    stat5Label: 'Payments Processed',
    stat6Value: '98%',
    stat6Label: 'Farmer Satisfaction',

    featuresTitle: 'Everything You Need in One Platform',
    featuresSubtitle: 'From booking to payment to produce management — KRAYAM simplifies the entire procurement journey.',

    feature1Title: 'Easy Booking',
    feature1Desc: 'Book your slot at nearby procurement centres',
    feature2Title: 'Live Queue Tracking',
    feature2Desc: 'Know your real-time queue position and waiting time',
    feature3Title: 'Accurate Weighing',
    feature3Desc: 'Transparent weighing and quality verification',
    feature4Title: 'Direct Payments',
    feature4Desc: 'Get paid directly to your bank account',
    feature5Title: 'Produce Management',
    feature5Desc: 'Track storage, dispatch and produce flow',
    feature6Title: 'AI Insights (KAI)',
    feature6Desc: 'Demand prediction, queue forecasting and smart recommendations',
    feature7Title: 'Real-time Updates',
    feature7Desc: 'Get instant notifications at every step',
    feature8Title: 'Multi-Crop Support',
    feature8Desc: 'Supports all major agricultural produce',

    produceCardTitle: 'From Farm to Market',
    produceCardSubtitle: 'A Stronger Tomorrow',
    footerAbout: 'About KRAYAM',
    footerPrivacy: 'Privacy Policy',
    footerTerms: 'Terms of Service',
  },

  hi: {
    appTitle: 'KRAYAM',
    appSubtitle: 'स्मार्ट खरीद। सशक्त कृषि।',
    registerLogin: 'पंजीकरण / लॉग इन',
    goToDashboard: 'डैशबोर्ड पर जाएं',

    heroBadge: 'डिजिटल कृषि  |  पारदर्शी मंडियां  |  सशक्त किसान',
    heroTitleLine1: 'कृषि उपज की खरीद और',
    heroTitleLine2: 'प्रबंधन के लिए',
    heroTitleLine3: 'एक एकीकृत मंच',
    heroDescription: 'डिजिटल तकनीक के माध्यम से किसानों, खरीद केंद्रों और मंडियों को जोड़ना — उचित मूल्य, पारदर्शी प्रक्रिया और एक मजबूत कृषि परिवेश सुनिश्चित करना।',
    digitalTodayLine1: 'आज डिजिटल,',
    digitalTodayLine2: 'कल बेहतर',

    benefit1Title: 'उचित मूल्य',
    benefit1Desc: 'पारदर्शी खरीद प्रक्रिया',
    benefit2Title: 'कम प्रतीक्षा',
    benefit2Desc: 'स्मार्ट कतार प्रबंधन',
    benefit3Title: 'गुणवत्ता आश्वासन',
    benefit3Desc: 'सटीक वजन एवं ग्रेडिंग',
    benefit4Title: 'सीधा भुगतान',
    benefit4Desc: 'सुरक्षित बैंक अंतरण',

    stat1Value: '50,000+',
    stat1Label: 'जुड़े हुए किसान',
    stat2Value: '250+',
    stat2Label: 'खरीद केंद्र',
    stat3Value: '20+',
    stat3Label: 'समर्थित फसलें',
    stat4Value: '12 लाख+ टन',
    stat4Label: 'कुल खरीद उपज',
    stat5Value: '₹ 1,800+ करोड़',
    stat5Label: 'भुगतान संप्रेषित',
    stat6Value: '98%',
    stat6Label: 'किसान संतुष्टि',

    featuresTitle: 'एक ही मंच पर हर समाधान',
    featuresSubtitle: 'बुकिंग से लेकर भुगतान और उपज प्रबंधन तक — KRAYAM संपूर्ण खरीद प्रक्रिया को सुगम बनाता है।',

    feature1Title: 'आसान बुकिंग',
    feature1Desc: 'निकटतम खरीद केंद्र पर अपना स्लॉट बुक करें',
    feature2Title: 'लाइव कतार ट्रैकिंग',
    feature2Desc: 'वास्तविक समय में अपनी कतार स्थिति और प्रतीक्षा समय जानें',
    feature3Title: 'सटीक वजन',
    feature3Desc: 'पारदर्शी वजन और गुणवत्ता सत्यापन',
    feature4Title: 'सीधा भुगतान',
    feature4Desc: 'सीधे अपने बैंक खाते में पारदर्शी भुगतान प्राप्त करें',
    feature5Title: 'उपज प्रबंधन',
    feature5Desc: 'भंडारण, प्रेषण और उपज प्रवाह को ट्रैक करें',
    feature6Title: 'AI अंतर्दृष्टि (KAI)',
    feature6Desc: 'मांग पूर्वानुमान, कतार अनुमान और स्मार्ट सिफारिशें',
    feature7Title: 'रियल-टाइम अपडेट',
    feature7Desc: 'प्रत्येक चरण पर तत्काल सूचनाएं प्राप्त करें',
    feature8Title: 'बहु-फसल समर्थन',
    feature8Desc: 'सभी प्रमुख कृषि उपजों के लिए पूर्ण समर्थन',

    produceCardTitle: 'खेत से बाज़ार तक',
    produceCardSubtitle: 'एक सशक्त कल',
    footerAbout: 'KRAYAM के बारे में',
    footerPrivacy: 'गोपनीयता नीति',
    footerTerms: 'सेवा की शर्तें',
  },

  pa: {
    appTitle: 'KRAYAM',
    appSubtitle: 'ਸਮਾਰਟ ਖਰੀਦ। ਮਜ਼ਬੂਤ ਖੇਤੀਬਾੜੀ।',
    registerLogin: 'ਰਜਿਸਟਰ / ਲੌਗ ਇਨ',
    goToDashboard: 'ਡੈਸ਼ਬੋਰਡ ਤੇ ਜਾਓ',

    heroBadge: 'ਡਿਜੀਟਲ ਖੇਤੀਬਾੜੀ  |  ਪਾਰਦਰਸ਼ੀ ਮੰਡੀਆਂ  |  ਮਜ਼ਬੂਤ ਕਿਸਾਨ',
    heroTitleLine1: 'ਖੇਤੀਬਾੜੀ ਉਪਜ ਦੀ ਖਰੀਦ ਅਤੇ',
    heroTitleLine2: 'ਪ੍ਰਬੰਧਨ ਲਈ ਇੱਕ',
    heroTitleLine3: 'ਸਾਂਝਾ ਮੰਚ',
    heroDescription: 'ਡਿਜੀਟਲ ਤਕਨਾਲੋਜੀ ਰਾਹੀਂ ਕਿਸਾਨਾਂ, ਖਰੀਦ ਕੇਂਦਰਾਂ ਅਤੇ ਮੰਡੀਆਂ ਨੂੰ ਜੋੜਨਾ — ਸਹੀ ਮੁੱਲ, ਪਾਰਦਰਸ਼ੀ ਪ੍ਰਕਿਰਿਆ ਅਤੇ ਇੱਕ ਮਜ਼ਬੂਤ ਖੇਤੀਬਾੜੀ ਵਾਤਾਵਰਣ ਯਕੀਨੀ ਬਣਾਉਣਾ।',
    digitalTodayLine1: 'ਅੱਜ ਡਿਜੀਟਲ,',
    digitalTodayLine2: 'ਕੱਲ੍ਹ ਬਿਹਤਰ',

    benefit1Title: 'ਸਹੀ ਮੁੱਲ',
    benefit1Desc: 'ਪਾਰਦਰਸ਼ੀ ਖਰੀਦ ਪ੍ਰਕਿਰਿਆ',
    benefit2Title: 'ਘੱਟ ਉਡੀਕ',
    benefit2Desc: 'ਸਮਾਰਟ ਕਤਾਰ ਪ੍ਰਬੰਧਨ',
    benefit3Title: 'ਗੁਣਵੱਤਾ ਭਰੋਸਾ',
    benefit3Desc: 'ਸਹੀ ਤੋਲ ਅਤੇ ਗ੍ਰੇਡਿੰਗ',
    benefit4Title: 'ਸਿੱਧੀ ਅਦਾਇਗੀ',
    benefit4Desc: 'ਸੁਰੱਖਿਅਤ ਬੈਂਕ ਲੈਣ-ਦੇਣ',

    stat1Value: '50,000+',
    stat1Label: 'ਜੁੜੇ ਕਿਸਾਨ',
    stat2Value: '250+',
    stat2Label: 'ਖਰੀਦ ਕੇਂਦਰ',
    stat3Value: '20+',
    stat3Label: 'ਸਮਰਥਿਤ ਫ਼ਸਲਾਂ',
    stat4Value: '12 ਲੱਖ+ ਟਨ',
    stat4Label: 'ਕੁੱਲ ਖਰੀਦ ਉਪਜ',
    stat5Value: '₹ 1,800+ ਕਰੋੜ',
    stat5Label: 'ਕੁੱਲ ਭੁਗਤਾਨ',
    stat6Value: '98%',
    stat6Label: 'ਕਿਸਾਨ ਸੰਤੁਸ਼ਟੀ',

    featuresTitle: 'ਇੱਕੋ ਪਲੇਟਫਾਰਮ ਤੇ ਹਰ ਸਹੂਲਤ',
    featuresSubtitle: 'ਬੁਕਿੰਗ ਤੋਂ ਭੁਗਤਾਨ ਅਤੇ ਉਪਜ ਪ੍ਰਬੰਧਨ ਤੱਕ — KRAYAM ਖਰੀਦ ਪ੍ਰਕਿਰਿਆ ਨੂੰ ਸਰਲ ਬਣਾਉਂਦਾ ਹੈ।',

    feature1Title: 'ਸੌਖੀ ਬੁਕਿੰਗ',
    feature1Desc: 'ਨੇੜਲੇ ਖਰੀਦ ਕੇਂਦਰ ਤੇ ਆਪਣਾ ਸਲਾਟ ਬੁੱਕ ਕਰੋ',
    feature2Title: 'ਲਾਈਵ ਕਤਾਰ ਟ੍ਰੈਕਿੰਗ',
    feature2Desc: 'ਰੀਅਲ-ਟਾਈਮ ਵਿੱਚ ਕਤਾਰ ਦੀ ਸਥਿਤੀ ਅਤੇ ਉਡੀਕ ਸਮਾਂ ਜਾਣੋ',
    feature3Title: 'ਸਹੀ ਤੋਲ',
    feature3Desc: 'ਪਾਰਦਰਸ਼ੀ ਤੋਲ ਅਤੇ ਗੁਣਵੱਤਾ ਤਸਦੀਕ',
    feature4Title: 'ਸਿੱਧੀ ਅਦਾਇਗੀ',
    feature4Desc: 'ਸਿੱਧੇ ਆਪਣੇ ਬੈਂਕ ਖਾਤੇ ਵਿੱਚ ਭੁਗਤਾਨ ਪ੍ਰਾਪਤ ਕਰੋ',
    feature5Title: 'ਉਪਜ ਪ੍ਰਬੰਧਨ',
    feature5Desc: 'ਸਟੋਰੇਜ, ਡਿਸਪੈਚ ਅਤੇ ਉਪਜ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ',
    feature6Title: 'AI ਇਨਸਾਈਟਸ (KAI)',
    feature6Desc: 'ਮੰਗ ਦੀ ਭਵਿੱਖਬਾਣੀ, ਕਤਾਰ ਅਨੁਮਾਨ ਅਤੇ ਸਮਾਰਟ ਸਿਫ਼ਾਰਸ਼ਾਂ',
    feature7Title: 'ਰੀਅਲ-ਟਾਈਮ ਅੱਪਡੇਟ',
    feature7Desc: 'ਹਰੇਕ ਪੜਾਅ ਤੇ ਤੁਰੰਤ ਸੂਚਨਾਵਾਂ ਪ੍ਰਾਪਤ ਕਰੋ',
    feature8Title: 'ਬਹੁ-ਫ਼ਸਲ ਸਹਿਯੋਗ',
    feature8Desc: 'ਸਾਰੀਆਂ ਪ੍ਰਮੁੱਖ ਖੇਤੀਬਾੜੀ ਫ਼ਸਲਾਂ ਲਈ ਸਮਰਥਨ',

    produceCardTitle: 'ਖੇਤ ਤੋਂ ਮੰਡੀ ਤੱਕ',
    produceCardSubtitle: 'ਇੱਕ ਮਜ਼ਬੂਤ ਕੱਲ੍ਹ',
    footerAbout: 'KRAYAM ਬਾਰੇ',
    footerPrivacy: 'ਗੋਪਨੀਯਤਾ ਨੀਤੀ',
    footerTerms: 'ਸੇਵਾ ਦੀਆਂ ਸ਼ਰਤਾਂ',
  },

  bn: {
    appTitle: 'KRAYAM',
    appSubtitle: 'স্মার্ট সংগ্রহ। শক্তিশালী কৃষি।',
    registerLogin: 'নিবন্ধন / লগ ইন',
    goToDashboard: 'ড্যাশবোর্ডে যান',

    heroBadge: 'ডিজিটাল কৃষি  |  স্বচ্ছ বাজার  |  শক্তিশালী কৃষক',
    heroTitleLine1: 'কৃষি পণ্য সংগ্রহ এবং',
    heroTitleLine2: 'ব্যবস্থাপনার জন্য একটি',
    heroTitleLine3: 'একত্রিত ডিজিটাল প্ল্যাটফর্ম',
    heroDescription: 'ডিজিটাল প্রযুক্তির মাধ্যমে কৃষক, সংগ্রহ কেন্দ্র এবং বাজারকে সংযুক্ত করা — ন্যায্য মূল্য, স্বচ্ছ প্রক্রিয়া এবং একটি শক্তিশালী কৃষি ব্যবস্থা নিশ্চিত করা।',
    digitalTodayLine1: 'আজ ডিজিটাল,',
    digitalTodayLine2: 'আগামীকাল সুন্দর',

    benefit1Title: 'ন্যায্য মূল্য',
    benefit1Desc: 'স্বচ্ছ সংগ্রহ ব্যবস্থা',
    benefit2Title: 'কম অপেক্ষা',
    benefit2Desc: 'স্মার্ট লাইন ব্যবস্থাপনা',
    benefit3Title: 'গুণমান নিশ্চয়তা',
    benefit3Desc: 'সঠিক ওজন ও গ্রেডিং',
    benefit4Title: 'সরাসরি অর্থ প্রদান',
    benefit4Desc: 'নিরাপদ ব্যাংক লেনদেন',

    stat1Value: '৫০,০০০+',
    stat1Label: 'সংযুক্ত কৃষক',
    stat2Value: '২৫০+',
    stat2Label: 'সংগ্রহ কেন্দ্র',
    stat3Value: '২০+',
    stat3Label: 'সমর্থিত ফসল',
    stat4Value: '১.২M+ টন',
    stat4Label: 'সংগৃহীত পণ্য',
    stat5Value: '₹ ১,৮০০+ কোটি',
    stat5Label: 'প্রক্রিয়াকৃত অর্থ',
    stat6Value: '৯৮%',
    stat6Label: 'কৃষক সন্তুষ্টি',

    featuresTitle: 'এক প্ল্যাটফর্মে আপনার প্রয়োজনীয় সবকিছু',
    featuresSubtitle: 'স্লট বুকিং থেকে অর্থপ্রদান এবং পণ্য ব্যবস্থাপনা — KRAYAM সংগ্রহ প্রক্রিয়াকে সহজ করে তোলে।',

    feature1Title: 'সহজ বুকিং',
    feature1Desc: 'কাছের সংগ্রহ কেন্দ্রে আপনার স্লট বুক করুন',
    feature2Title: 'লাইভ লাইন ট্র্যাকিং',
    feature2Desc: 'রিয়েল-টাইমে আপনার অবস্থান এবং অপেক্ষার সময় জানুন',
    feature3Title: 'সঠিক ওজন',
    feature3Desc: 'স্বচ্ছ ওজন এবং মান যাচাইকরণ',
    feature4Title: 'সরাসরি অর্থ প্রদান',
    feature4Desc: 'সরাসরি আপনার ব্যাংক অ্যাকাউন্টে অর্থ গ্রহণ করুন',
    feature5Title: 'পণ্য ব্যবস্থাপনা',
    feature5Desc: 'মজুদ, প্রেরণ এবং পণ্যের প্রবাহ ট্র্যাক করুন',
    feature6Title: 'AI অন্তর্দৃষ্টি (KAI)',
    feature6Desc: 'চাহিদা পূর্বাভাস, লাইন অনুমান এবং স্মার্ট পরামর্শ',
    feature7Title: 'রিয়েল-টাইম আপডেট',
    feature7Desc: 'প্রতিটি ধাপে তাৎক্ষণিক বিজ্ঞপ্তি পান',
    feature8Title: 'বহু-ফসল সহায়তা',
    feature8Desc: 'সমস্ত প্রধান কৃষি পণ্যের সমর্থন',

    produceCardTitle: 'খামার থেকে বাজারে',
    produceCardSubtitle: 'একটি শক্তিশালী আগামী',
    footerAbout: 'KRAYAM সম্পর্কে',
    footerPrivacy: 'গোপনীয়তা নীতি',
    footerTerms: 'পরিষেবার শর্তাবলী',
  },

  mr: {
    appTitle: 'KRAYAM',
    appSubtitle: 'स्मार्ट खरेदी. सक्षम शेती.',
    registerLogin: 'नोंदणी / लॉगिन',
    goToDashboard: 'डॅशबोर्डवर जा',

    heroBadge: 'डिजिटल शेती  |  पारदर्शक बाजार  |  सक्षम शेतकरी',
    heroTitleLine1: 'कृषी मालाची खरेदी आणि',
    heroTitleLine2: 'व्यवस्थापनासाठी एक',
    heroTitleLine3: 'एकसंध व्यासपीठ',
    heroDescription: 'डिजिटल तंत्रज्ञानाद्वारे शेतकरी, खरेदी केंद्र आणि बाजारपेठांना जोडणे — योग्य दर, पारदर्शक प्रक्रिया आणि सक्षम कृषी परिसंस्था सुनिश्चित करणे.',
    digitalTodayLine1: 'आज डिजिटल,',
    digitalTodayLine2: 'उद्या प्रगतीशील',

    benefit1Title: 'योग्य दर',
    benefit1Desc: 'पारदर्शक खरेदी प्रक्रिया',
    benefit2Title: 'कमी प्रतीक्षा',
    benefit2Desc: 'स्मार्ट रांग व्यवस्थापन',
    benefit3Title: 'गुणवत्ता हमी',
    benefit3Desc: 'अचूक वजन आणि प्रतवारी',
    benefit4Title: 'थेट खात्यात पैसे',
    benefit4Desc: 'सुरक्षित बँक व्यवहार',

    stat1Value: '५०,०००+',
    stat1Label: 'जोडले गेलेले शेतकरी',
    stat2Value: '२५०+',
    stat2Label: 'खरेदी केंद्रे',
    stat3Value: '२०+',
    stat3Label: 'समाविष्ट पिके',
    stat4Value: '१२ लाख+ टन',
    stat4Label: 'एकूण खरेदी',
    stat5Value: '₹ १,८००+ कोटी',
    stat5Label: 'थेट वितरित रक्कम',
    stat6Value: '९८%',
    stat6Label: 'शेतकरी समाधान',

    featuresTitle: 'सर्व सुविधा एकाच व्यासपीठावर',
    featuresSubtitle: 'नोंदणी, वजन ते थेट पेमेंट आणि शेतमाल व्यवस्थापन — KRAYAM संपूर्ण खरेदी प्रक्रिया सुलभ करते.',

    feature1Title: 'सुलभ बुकिंग',
    feature1Desc: 'जवळच्या खरेदी केंद्रावर तुमचा स्लॉट बुक करा',
    feature2Title: 'थेट रांग ट्रॅकिंग',
    feature2Desc: 'रिअल-टाइममध्ये तुमचा रांगेतील क्रमांक आणि प्रतीक्षा वेळ जाणा',
    feature3Title: 'अचूक वजन',
    feature3Desc: 'पारदर्शक वजन आणि गुणवत्ता पडताळणी',
    feature4Title: 'थेट पेमेंट',
    feature4Desc: 'थेट तुमच्या बँक खात्यात सुरक्षित पेमेंट मिळवा',
    feature5Title: 'शेतमाल व्यवस्थापन',
    feature5Desc: 'साठवणूक, पाठवणी आणि माल प्रवाह ट्रॅक करा',
    feature6Title: 'AI विश्लेषण (KAI)',
    feature6Desc: 'मागणी अंदाज, रांग अंदाज आणि स्मार्ट शिफारसी',
    feature7Title: 'झटपट नोटिफिकेशन्स',
    feature7Desc: 'प्रत्येक टप्प्यावर त्वरित अपडेट्स मिळवा',
    feature8Title: 'विविध पिकांचे समर्थन',
    feature8Desc: 'सर्व प्रमुख कृषी उत्पादनांना पूर्ण पाठिंबा',

    produceCardTitle: 'शेतातून थेट बाजारात',
    produceCardSubtitle: 'एक समर्थ उद्या',
    footerAbout: 'KRAYAM बद्दल',
    footerPrivacy: 'गोपनीयता धोरण',
    footerTerms: 'सेवा अटी',
  },

  te: {
    appTitle: 'KRAYAM',
    appSubtitle: 'స్మార్ట్ సేకరణ. బలమైన వ్యవసాయం.',
    registerLogin: 'నమోదు / లాగిన్',
    goToDashboard: 'డ్యాష్‌బోర్డ్‌కి వెళ్లండి',

    heroBadge: 'డిజిటల్ వ్యవసాయం  |  పారదర్శక మార్కెట్లు  |  బలమైన రైతులు',
    heroTitleLine1: 'వ్యవసాయ ఉత్పత్తుల కొనుగోలు మరియు',
    heroTitleLine2: 'నిర్వహణ కోసం ఒకే',
    heroTitleLine3: 'ఏకీకృత వేదిక',
    heroDescription: 'డిజిటల్ సాంకేతికత ద్వారా రైతులు, కొనుగోలు కేంద్రాలు మరియు మార్కెట్లను అనుసంధానించడం — సరసమైన ధరలు, పారదర్శక ప్రక్రియలు మరియు బలమైన వ్యవసాయ వ్యవస్థను నిర్ధారించడం.',
    digitalTodayLine1: 'నేడు డిజిటల్,',
    digitalTodayLine2: 'రేపు ఉజ్వలం',

    benefit1Title: 'సరసమైన ధరలు',
    benefit1Desc: 'పారదర్శక సేకరణ',
    benefit2Title: 'తక్కువ వేచి ఉండే సమయం',
    benefit2Desc: 'స్మార్ట్ క్యూ నిర్వహణ',
    benefit3Title: 'నాణ్యత హామీ',
    benefit3Desc: 'ఖచ్చితమైన తూకం & గ్రేడింగ్',
    benefit4Title: 'నేరుగా చెల్లింపులు',
    benefit4Desc: 'సురక్షితమైన లావాదేవీలు',

    stat1Value: '50,000+',
    stat1Label: 'కనెక్ట్ అయిన రైతులు',
    stat2Value: '250+',
    stat2Label: 'కొనుగోలు కేంద్రాలు',
    stat3Value: '20+',
    stat3Label: 'మద్దతు ఉన్న పంటలు',
    stat4Value: '1.2M+ టన్నులు',
    stat4Label: 'సేకరించిన పంట',
    stat5Value: '₹ 1,800+ కోట్లు',
    stat5Label: 'చెల్లించిన మొత్తం',
    stat6Value: '98%',
    stat6Label: 'రైతుల సంతృప్తి',

    featuresTitle: 'ఒకే వేదికపై మీకు కావలసినవన్నీ',
    featuresSubtitle: 'స్లాట్ బుకింగ్ నుండి చెల్లింపులు మరియు నిల్వ నిర్వహణ వరకు — KRAYAM ప్రక్రియను సులభతరం చేస్తుంది.',

    feature1Title: 'సులభమైన బుకింగ్',
    feature1Desc: 'సమీపంలోని కొనుగోలు కేంద్రాలలో మీ స్లాట్‌ను బుక్ చేసుకోండి',
    feature2Title: 'లైవ్ క్యూ ట్రాకింగ్',
    feature2Desc: 'రియల్-టైమ్‌లో మీ క్యూ స్థానం మరియు నిరీక్షణ సమయం తెలుసుకోండి',
    feature3Title: 'ఖచ్చితమైన తూకం',
    feature3Desc: 'పారదర్శక తూకం మరియు నాణ్యత ధృవీకరణ',
    feature4Title: 'నేరుగా చెల్లింపులు',
    feature4Desc: 'మీ బ్యాంక్ ఖాతాకు నేరుగా చెల్లింపులు పొందండి',
    feature5Title: 'ఉత్పత్తి నిర్వహణ',
    feature5Desc: 'నిల్వ, రవాణా మరియు ఉత్పత్తుల ప్రవాహాన్ని పర్యవేక్షించండి',
    feature6Title: 'AI సూచనలు (KAI)',
    feature6Desc: 'గిరాకీ అంచనా, క్యూ అంచనా మరియు స్మార్ట్ సిఫార్సులు',
    feature7Title: 'రియల్-టైమ్ అప్‌డేట్స్',
    feature7Desc: 'ప్రతి దశలో తక్షణ నోటిఫికేషన్‌లను పొందండి',
    feature8Title: 'వివిధ పంటల మద్దతు',
    feature8Desc: 'అన్ని ప్రధాన వ్యవసాయ ఉత్పత్తులకు మద్దతు',

    produceCardTitle: 'పొలం నుండి మార్కెట్‌కు',
    produceCardSubtitle: 'బలమైన భవిష్యత్తు',
    footerAbout: 'KRAYAM గురించి',
    footerPrivacy: 'గోప్యతా విధానం',
    footerTerms: 'సేవా నిబంధనలు',
  },

  ta: {
    appTitle: 'KRAYAM',
    appSubtitle: 'திறன்மிகு கொள்முதல். வலிமையான விவசாயம்.',
    registerLogin: 'பதிவு / உள்நுழைக',
    goToDashboard: 'டாஷ்போர்டுக்கு செல்க',

    heroBadge: 'டிஜிட்டல் விவசாயம்  |  வெளிப்படையான சந்தைகள்  |  வலிமையான விவசாயிகள்',
    heroTitleLine1: 'வேளாண் விளைபொருட்கள் கொள்முதல் மற்றும்',
    heroTitleLine2: 'மேலாண்மைக்கான ஒருங்கிணைந்த',
    heroTitleLine3: 'டிஜிட்டல் தளம்',
    heroDescription: 'டிஜிட்டல் தொழில்நுட்பம் மூலம் விவசாயிகள், கொள்முதல் நிலையங்கள் மற்றும் சந்தைகளை இணைத்தல் — நியாயமான விலை, வெளிப்படையான செயல்முறை மற்றும் வலுவான வேளாண் சூழலை உறுதி செய்தல்.',
    digitalTodayLine1: 'இன்று டிஜிட்டல்,',
    digitalTodayLine2: 'நாளை சிறந்தது',

    benefit1Title: 'நியாயமான விலை',
    benefit1Desc: 'வெளிப்படையான கொள்முதல்',
    benefit2Title: 'குறைந்த காத்திருப்பு',
    benefit2Desc: 'திறன்மிகு வரிசை மேலாண்மை',
    benefit3Title: 'தர உத்தரவாதம்',
    benefit3Desc: 'துல்லியமான எடை மற்றும் தரம்',
    benefit4Title: 'நேரடி பணப்பரிவர்த்தனை',
    benefit4Desc: 'பாதுகாப்பான வங்கிப் பரிமாற்றம்',

    stat1Value: '50,000+',
    stat1Label: 'இணைந்த விவசாயிகள்',
    stat2Value: '250+',
    stat2Label: 'கொள்முதல் நிலையங்கள்',
    stat3Value: '20+',
    stat3Label: 'ஆதரிக்கப்படும் பயிர்கள்',
    stat4Value: '1.2M+ டன்கள்',
    stat4Label: 'கொள்முதல் செய்யப்பட்டவை',
    stat5Value: '₹ 1,800+ கோடி',
    stat5Label: 'வழங்கப்பட்ட தொகை',
    stat6Value: '98%',
    stat6Label: 'விவசாயிகள் திருப்தி',

    featuresTitle: 'ஒரே தளத்தில் உங்களின் அனைத்து தேவைகளும்',
    featuresSubtitle: 'முன்பதிவு முதல் பணம் செலுத்துதல் மற்றும் இருப்பு மேலாண்மை வரை — KRAYAM அனைத்தையும் எளிதாக்குகிறது.',

    feature1Title: 'எளிதான முன்பதிவு',
    feature1Desc: 'அருகிலுள்ள கொள்முதல் மையங்களில் உங்கள் நேரத்தை பதிவு செய்யுங்கள்',
    feature2Title: 'நேரடி வரிசை கண்காணிப்பு',
    feature2Desc: 'உங்கள் வரிசை நிலை மற்றும் காத்திருப்பு நேரத்தை உடனுக்குடன் அறியுங்கள்',
    feature3Title: 'துல்லியமான எடை',
    feature3Desc: 'வெளிப்படையான எடை மற்றும் தர சரிபார்ப்பு',
    feature4Title: 'நேரடி பணப்பரிமாற்றம்',
    feature4Desc: 'உங்கள் வங்கிக் கணக்கில் நேரடியாக பணத்தைப் பெறுங்கள்',
    feature5Title: 'விளைபொருள் மேலாண்மை',
    feature5Desc: 'சேமிப்பு, அனுப்புதல் மற்றும் பொருட்கள் சுழற்சியை கண்காணிக்கவும்',
    feature6Title: 'AI நுண்ணறிவு (KAI)',
    feature6Desc: 'தேவை முன்னறிவிப்பு, வரிசை கணிப்பு மற்றும் ஸ்மார்ட் பரிந்துரைகள்',
    feature7Title: 'உடனடி அறிவிப்புகள்',
    feature7Desc: 'ஒவ்வொரு கட்டத்திலும் நிகழ்நேர அறிவிப்புகளைப் பெறுங்கள்',
    feature8Title: 'பல பயிர் ஆதரவு',
    feature8Desc: 'அனைத்து முக்கிய விவசாய விளைபொருட்களுக்கும் ஆதரவு',

    produceCardTitle: 'விளைநிலத்திலிருந்து சந்தைக்கு',
    produceCardSubtitle: 'வலிமையான எதிர்காலம்',
    footerAbout: 'KRAYAM பற்றி',
    footerPrivacy: 'தனியுரிமைக் கொள்கை',
    footerTerms: 'சேவை விதிமுறைகள்',
  },

  gu: {
    appTitle: 'KRAYAM',
    appSubtitle: 'સ્માર્ટ ખરીદી. સશક્ત કૃષિ.',
    registerLogin: 'નોંધણી / લૉગ ઇન',
    goToDashboard: 'ડેશબોર્ડ પર જાઓ',

    heroBadge: 'ડિજિટલ કૃષિ  |  પારદર્શક બજારો  |  સશક્ત ખેડૂતો',
    heroTitleLine1: 'કૃષિ ઉપજની ખરીદી અને',
    heroTitleLine2: 'વ્યવસ્થાપન માટે એક',
    heroTitleLine3: 'એકીકૃત મંચ',
    heroDescription: 'ડિજિટલ ટેક્નોલોજી દ્વારા ખેડૂતો, ખરીદ કેન્દ્રો અને બજારોને જોડવું — વાજબી ભાવ, પારદર્શક પ્રક્રિયા અને મજબૂત કૃષિ પરિવેશ સુનિશ્ચિત કરવું.',
    digitalTodayLine1: 'આજે ડિજિટલ,',
    digitalTodayLine2: 'આવતીકાલે સમૃદ્ધ',

    benefit1Title: 'વાજબી ભાવ',
    benefit1Desc: 'પારદર્શક ખરીદી પ્રક્રિયા',
    benefit2Title: 'ઓછો ઇંતેજાર',
    benefit2Desc: 'સ્માર્ટ કતાર વ્યવસ્થાપન',
    benefit3Title: 'ગુણવત્તા ખાતરી',
    benefit3Desc: 'સચોટ વજન અને ગ્રેડિંગ',
    benefit4Title: 'સીધી ચુકવણી',
    benefit4Desc: 'સુરક્ષિત બેંક ટ્રાન્સફર',

    stat1Value: '50,000+',
    stat1Label: 'જોડાયેલા ખેડૂતો',
    stat2Value: '250+',
    stat2Label: 'ખરીદ કેન્દ્રો',
    stat3Value: '20+',
    stat3Label: 'સપોર્ટેડ પાકો',
    stat4Value: '12 લાખ+ ટન',
    stat4Label: 'કુલ ઉપજ ખરીદી',
    stat5Value: '₹ 1,800+ કરોડ',
    stat5Label: 'ચુકવાયેલી રકમ',
    stat6Value: '98%',
    stat6Label: 'ખેડૂત સંતોષ',

    featuresTitle: 'એક જ પ્લેટફોર્મ પર તમામ સુવિધાઓ',
    featuresSubtitle: 'બુકિંગથી લઈને પેમેન્ટ અને ઉપજ વ્યવસ્થાપન સુધી — KRAYAM સમગ્ર ખરીદી પ્રક્રિયાને સરળ બનાવે છે.',

    feature1Title: 'સરળ બુકિંગ',
    feature1Desc: 'નજીકના ખરીદ કેન્દ્રો પર તમારો સ્લોટ બુક કરો',
    feature2Title: 'લાઈવ લાઈન ટ્રેકિંગ',
    feature2Desc: 'રીઅલ-ટાઇમમાં તમારી કતાર સ્થિતિ અને પ્રતીક્ષા સમય જાણો',
    feature3Title: 'સચોટ વજન',
    feature3Desc: 'પારદર્શક વજન અને ગુણવત્તા ચકાસણી',
    feature4Title: 'સીધી ચુકવણી',
    feature4Desc: 'સીધા તમારા બેંક ખાતામાં સુરક્ષિત નાણાં મેળવો',
    feature5Title: 'ઉપજ વ્યવસ્થાપન',
    feature5Desc: 'સંગ્રહ, ડિસ્પેચ અને ઉપજના પ્રવાહને ટ્રૅક કરો',
    feature6Title: 'AI ઇનસાઇટ્સ (KAI)',
    feature6Desc: 'માંગ આગાહી, કતાર અનુમાન અને સ્માર્ટ ભલામણો',
    feature7Title: 'રીઅલ-ટાઇમ અપડેટ્સ',
    feature7Desc: 'દરેક પગલા પર તાત્કાલિક સૂચનાઓ મેળવો',
    feature8Title: 'બહુ-પાક સપોર્ટ',
    feature8Desc: 'તમામ મુખ્ય કૃષિ ઉત્પાદનો માટે સંપૂર્ણ સમર્થન',

    produceCardTitle: 'ખેતરથી બજાર સુધી',
    produceCardSubtitle: 'એક સશક્ત આવતીકાલ',
    footerAbout: 'KRAYAM વિશે',
    footerPrivacy: 'ગોપનીયતા નીતિ',
    footerTerms: 'સેવાની શરતો',
  },

  ur: {
    appTitle: 'KRAYAM',
    appSubtitle: 'اسمارٹ خریداری۔ مضبوط زراعت۔',
    registerLogin: 'رجسٹر / لاگ ان',
    goToDashboard: 'ڈیش بورڈ پر جائیں',

    heroBadge: 'ڈیجیٹل زراعت  |  شفاف مارکیٹس  |  مضبوط کسان',
    heroTitleLine1: 'زرعی پیداوار کی خریداری اور',
    heroTitleLine2: 'انتظام کے لیے ایک',
    heroTitleLine3: 'متحد پلیٹ فارم',
    heroDescription: 'ڈیجیٹل ٹیکنالوجی کے ذریعے کسانوں، خریداری مراکز اور منڈیوں کو جوڑنا — مناسب قیمتوں، شفاف عمل اور مضبوط زرعی نظام کو یقینی بنانا۔',
    digitalTodayLine1: 'آج ڈیجیٹل،',
    digitalTodayLine2: 'کل بہتر',

    benefit1Title: 'مناسب قیمتیں',
    benefit1Desc: 'شفاف خریداری کا عمل',
    benefit2Title: 'کم انتظار',
    benefit2Desc: 'اسمارٹ قطار انتظام',
    benefit3Title: 'معیار کی ضمانت',
    benefit3Desc: 'درست وزن اور درجہ بندی',
    benefit4Title: 'براہ راست ادائیگی',
    benefit4Desc: 'محفوظ بینک ٹرانزیکشن',

    stat1Value: '50,000+',
    stat1Label: 'منسلک کسان',
    stat2Value: '250+',
    stat2Label: 'خریداری مراکز',
    stat3Value: '20+',
    stat3Label: 'معاون فصلیں',
    stat4Value: '1.2M+ ٹن',
    stat4Label: 'حاصل شدہ پیداوار',
    stat5Value: '₹ 1,800+ کروڑ',
    stat5Label: 'ادا کردہ رقم',
    stat6Value: '98%',
    stat6Label: 'کسانوں کا اطمینان',

    featuresTitle: 'ایک ہی پلیٹ فارم پر تمام ضروریات',
    featuresSubtitle: 'بکنگ سے ادائیگی اور اناج کے انتظام تک — KRAYAM تمام عمل کو آسان بناتا ہے۔',

    feature1Title: 'آسان بکنگ',
    feature1Desc: 'قریبی خریداری مراکز پر اپنا سلاٹ بک کریں',
    feature2Title: 'لائیو قطار ٹریکنگ',
    feature2Desc: 'ریئل ٹائم میں قطار کی پوزیشن اور انتظار کا وقت جانیں',
    feature3Title: 'درست وزن',
    feature3Desc: 'شفاف وزن اور معیار کی تصدیق',
    feature4Title: 'براہ راست ادائیگی',
    feature4Desc: 'براہ راست اپنے بینک اکاؤنٹ میں رقم حاصل کریں',
    feature5Title: 'پیداوار کا انتظام',
    feature5Desc: 'اسٹوریج، ترسیل اور اناج کے بہاؤ کو ٹریک کریں',
    feature6Title: 'AI بصیرت (KAI)',
    feature6Desc: 'طلب کی پیشن گوئی، قطار کا تخمینہ اور اسمارٹ تجاویز',
    feature7Title: 'فوری اطلاعات',
    feature7Desc: 'ہر مرحلے پر فوری نوٹیفکیشن حاصل کریں',
    feature8Title: 'متعدد فصلوں کی معاونت',
    feature8Desc: 'تمام اہم زرعی پیداوار کی معاونت',

    produceCardTitle: 'کھیت سے منڈی تک',
    produceCardSubtitle: 'ایک مضبوط کل',
    footerAbout: 'KRAYAM کے بارے میں',
    footerPrivacy: 'رازداری کی پالیسی',
    footerTerms: 'سروس کی شرائط',
  },

  kn: {
    appTitle: 'KRAYAM',
    appSubtitle: 'ಸ್ಮಾರ್ಟ್ ಖರೀದಿ. ಬಲಿಷ್ಠ ಕೃಷಿ.',
    registerLogin: 'ನೋಂದಣಿ / ಲಾಗಿನ್',
    goToDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ',

    heroBadge: 'ಡಿಜಿಟಲ್ ಕೃಷಿ  |  ಪಾರದರ್ಶಕ ಮಾರುಕಟ್ಟೆಗಳು  |  ಬಲಿಷ್ಠ ರೈತರು',
    heroTitleLine1: 'ಕೃಷಿ ಉತ್ಪನ್ನಗಳ ಖರೀದಿ ಮತ್ತು',
    heroTitleLine2: 'ನಿರ್ವಹಣೆಗಾಗಿ ಒಂದು',
    heroTitleLine3: 'ಏಕೀಕೃತ ವೇದಿಕೆ',
    heroDescription: 'ಡಿಜಿಟಲ್ ತಂತ್ರಜ್ಞಾನದ ಮೂಲಕ ರೈತರು, ಖರೀದಿ ಕೇಂದ್ರಗಳು ಮತ್ತು ಮಾರುಕಟ್ಟೆಗಳನ್ನು ಸಂಪರ್ಕಿಸುವುದು — ನ್ಯಾಯಯುತ ಬೆಲೆ, ಪಾರದರ್ಶಕ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ಬಲಿಷ್ಠ ಕೃಷಿ ವ್ಯವಸ್ಥೆಯನ್ನು ಖಚಿತಪಡಿಸುವುದು.',
    digitalTodayLine1: 'ಇಂದು ಡಿಜಿಟಲ್,',
    digitalTodayLine2: 'ನಾಳೆ ಉಜ್ವಲ',

    benefit1Title: 'ನ್ಯಾಯಯುತ ಬೆಲೆ',
    benefit1Desc: 'ಪಾರದರ್ಶಕ ಖರೀದಿ ಪ್ರಕ್ರಿಯೆ',
    benefit2Title: 'ಕಡಿಮೆ ಕಾಯುವಿಕೆ',
    benefit2Desc: 'ಸ್ಮಾರ್ಟ್ ಕ್ಯೂ ನಿರ್ವಹಣೆ',
    benefit3Title: 'ಗುಣಮಟ್ಟದ ಭರವಸೆ',
    benefit3Desc: 'ನಿಖರ ತೂಕ ಮತ್ತು ವರ್ಗೀಕರಣ',
    benefit4Title: 'ನೇರ ಪಾವತಿ',
    benefit4Desc: 'ಸುರಕ್ಷಿತ ಬ್ಯಾಂಕ್ ವರ್ಗಾವಣೆ',

    stat1Value: '50,000+',
    stat1Label: 'ಸಂಪರ್ಕಿತ ರೈತರು',
    stat2Value: '250+',
    stat2Label: 'ಖರೀದಿ ಕೇಂದ್ರಗಳು',
    stat3Value: '20+',
    stat3Label: 'ಬೆಂಬಲಿತ ಬೆಳೆಗಳು',
    stat4Value: '1.2M+ ಟನ್',
    stat4Label: 'ಖರೀದಿಸಿದ ಉತ್ಪನ್ನ',
    stat5Value: '₹ 1,800+ ಕೋಟಿ',
    stat5Label: 'ಪಾವತಿಸಿದ ಮೊತ್ತ',
    stat6Value: '98%',
    stat6Label: 'ರೈತರ ತೃಪ್ತಿ',

    featuresTitle: 'ಒಂದೇ ವೇದಿಕೆಯಲ್ಲಿ ನಿಮ್ಮೆಲ್ಲಾ ಅಗತ್ಯಗಳು',
    featuresSubtitle: 'ಬುಕಿಂಗ್‌ನಿಂದ ಹಿಡಿದು ಪಾವತಿ ಮತ್ತು ದಾಸ್ತಾನು ನಿರ್ವಹಣೆಯವರೆಗೆ — KRAYAM ಪ್ರಕ್ರಿಯೆಯನ್ನು ಸರಳಗೊಳಿಸುತ್ತದೆ.',

    feature1Title: 'ಸುಲಭ ಬುಕಿಂಗ್',
    feature1Desc: 'ಹತ್ತಿರದ ಖರೀದಿ ಕೇಂದ್ರಗಳಲ್ಲಿ ನಿಮ್ಮ ಸ್ಲಾಟ್ ಕಾಯ್ದಿರಿಸಿ',
    feature2Title: 'ಲೈವ್ ಕ್ಯೂ ಟ್ರ್ಯಾಕಿಂಗ್',
    feature2Desc: 'ನೈಜ ಸಮಯದಲ್ಲಿ ನಿಮ್ಮ ಕ್ಯೂ ಸ್ಥಾನ ಮತ್ತು ಕಾಯುವ ಸಮಯ ತಿಳಿಯಿರಿ',
    feature3Title: 'ನಿಖರ ತೂಕ',
    feature3Desc: 'ಪಾರದರ್ಶಕ ತೂಕ ಮತ್ತು ಗುಣಮಟ್ಟ ಪರಿಶೀಲನೆ',
    feature4Title: 'ನೇರ ಪಾವತಿ',
    feature4Desc: 'ನೇರವಾಗಿ ನಿಮ್ಮ ಬ್ಯಾಂಕ್ ಖಾತೆಗೆ ಹಣ ಪಡೆಯಿರಿ',
    feature5Title: 'ಉತ್ಪನ್ನ ನಿರ್ವಹಣೆ',
    feature5Desc: 'ಸಂಗ್ರಹಣೆ, ರವಾನೆ ಮತ್ತು ಉತ್ಪನ್ನದ ಹರಿವನ್ನು ಟ್ರ್ಯಾಕ್ ಮಾಡಿ',
    feature6Title: 'AI ಒಳನೋಟಗಳು (KAI)',
    feature6Desc: 'ಬೇಡಿಕೆ ಮುನ್ಸೂಚನೆ, ಸರದಿ ಅಂದಾಜು ಮತ್ತು ಸ್ಮಾರ್ಟ್ ಶಿಫಾರಸುಗಳು',
    feature7Title: 'ನೈಜ-ಸಮಯದ ನವೀಕರಣಗಳು',
    feature7Desc: 'ಪ್ರತಿ ಹಂತದಲ್ಲೂ ತ್ವರಿತ ಅಧಿಸೂಚನೆಗಳನ್ನು ಪಡೆಯಿರಿ',
    feature8Title: 'ಬಹು-ಬೆಳೆ ಬೆಂಬಲ',
    feature8Desc: 'ಎಲ್ಲಾ ಪ್ರಮುಖ ಕೃಷಿ ಉತ್ಪನ್ನಗಳಿಗೆ ಸಂಪೂರ್ಣ ಬೆಂಬಲ',

    produceCardTitle: 'ಹೊಲದಿಂದ ಮಾರುಕಟ್ಟೆಗೆ',
    produceCardSubtitle: 'ಬಲಿಷ್ಠ ನಾಳೆ',
    footerAbout: 'KRAYAM ಬಗ್ಗೆ',
    footerPrivacy: 'ಗೌಪ್ಯತಾ ನೀತಿ',
    footerTerms: 'ಸೇವಾ ನಿಯಮಗಳು',
  },

  or: {
    appTitle: 'KRAYAM',
    appSubtitle: 'ସ୍ମାର୍ଟ ସଂଗ୍ରହ। ସଶକ୍ତ କୃଷି।',
    registerLogin: 'ପଞ୍ଜୀକରଣ / ଲଗ୍ ଇନ୍',
    goToDashboard: 'ଡ୍ୟାସବୋର୍ଡକୁ ଯାଆନ୍ତୁ',

    heroBadge: 'ଡିଜିଟାଲ୍ କୃଷି  |  ସ୍ୱଚ୍ଛ ବଜାର  |  ସଶକ୍ତ କୃଷକ',
    heroTitleLine1: 'କୃଷି ଉତ୍ପାଦନ ସଂଗ୍ରହ ଏବଂ',
    heroTitleLine2: 'ପରିଚାଳନା ପାଇଁ ଏକ',
    heroTitleLine3: 'ଏକୀକୃତ ପ୍ଲାଟଫର୍ମ',
    heroDescription: 'ଡିଜିଟାଲ୍ ପ୍ରଯୁକ୍ତିବିଦ୍ୟା ମାଧ୍ୟମରେ କୃଷକ, ସଂଗ୍ରହ କେନ୍ଦ୍ର ଏବଂ ବଜାରକୁ ଯୋଡ଼ିବା — ନ୍ୟାଯ୍ୟ ମୂଲ୍ୟ, ସ୍ୱଚ୍ଛ ପ୍ରକ୍ରିୟା ଏବଂ ଏକ ସଶକ୍ତ କୃଷି ବ୍ୟବସ୍ଥା ନିଶ୍ଚିତ କରିବା।',
    digitalTodayLine1: 'ଆଜି ଡିଜିଟାଲ୍,',
    digitalTodayLine2: 'କାଲି ଉନ୍ନତ',

    benefit1Title: 'ନ୍ୟାଯ୍ୟ ମୂଲ୍ୟ',
    benefit1Desc: 'ସ୍ୱଚ୍ଛ ସଂଗ୍ରହ ପ୍ରକ୍ରିୟା',
    benefit2Title: 'କମ୍ ଅପେକ୍ଷା',
    benefit2Desc: 'ସ୍ମାର୍ଟ ଧାଡ଼ି ପରିଚାଳନା',
    benefit3Title: 'ଗୁଣବତ୍ତା ନିଶ୍ଚିତତା',
    benefit3Desc: 'ସଠିକ୍ ଓଜନ ଏବଂ ଗ୍ରେଡିଂ',
    benefit4Title: 'ସିଧାସଳଖ ପୈଠ',
    benefit4Desc: 'ସୁରକ୍ଷିତ ବ୍ୟାଙ୍କ କାରବାର',

    stat1Value: '୫୦,୦୦୦+',
    stat1Label: 'ସଂଯୁକ୍ତ କୃଷକ',
    stat2Value: '୨୫୦+',
    stat2Label: 'ସଂଗ୍ରହ କେନ୍ଦ୍ର',
    stat3Value: '୨୦+',
    stat3Label: 'ସମର୍ଥିତ ଫସଲ',
    stat4Value: '୧.୨M+ ଟନ୍',
    stat4Label: 'ସଂଗୃହୀତ ଉତ୍ପାଦନ',
    stat5Value: '₹ ୧,୮୦୦+ କୋଟି',
    stat5Label: 'ପ୍ରଦାନ କରାଯାଇଥିବା ଅର୍ଥ',
    stat6Value: '୯୮%',
    stat6Label: 'କୃଷକ ସନ୍ତୋଷ',

    featuresTitle: 'ଗୋଟିଏ ପ୍ଲାଟଫର୍ମରେ ଆପଣଙ୍କର ସମସ୍ତ ଆବଶ୍ୟକତା',
    featuresSubtitle: 'ବୁକିଂ ଠାରୁ ପୈଠ ଏବଂ ଉତ୍ପାଦ ପରିଚାଳନା ପର୍ଯ୍ୟନ୍ତ — KRAYAM ସମସ୍ତ କାର୍ଯ୍ୟକୁ ସରଳ କରିଥାଏ।',

    feature1Title: 'ସହଜ ବୁକିଂ',
    feature1Desc: 'ନିକଟସ୍ଥ ସଂଗ୍ରହ କେନ୍ଦ୍ରରେ ନିଜର ସ୍ଲଟ୍ ବୁକ୍ କରନ୍ତୁ',
    feature2Title: 'ଲାଇଭ୍ ଧାଡ଼ି ଟ୍ରାକିଂ',
    feature2Desc: 'ନିଜର ଧାଡ଼ି ସ୍ଥିତି ଏବଂ ଅପେକ୍ଷା ସମୟ ବିଷୟରେ ଜାଣନ୍ତୁ',
    feature3Title: 'ସଠିକ୍ ଓଜନ',
    feature3Desc: 'ସ୍ୱଚ୍ଛ ଓଜନ ଏବଂ ଗୁଣବତ୍ତା ଯାଞ୍ଚ',
    feature4Title: 'ସିଧାସଳଖ ପୈଠ',
    feature4Desc: 'ସିଧା ନିଜ ବ୍ୟାଙ୍କ ଖାତାରେ ଟଙ୍କା ପାଆନ୍ତୁ',
    feature5Title: 'ଉତ୍ପାଦନ ପରିଚାଳନା',
    feature5Desc: 'ଭଣ୍ଡାରଣ, ପ୍ରେରଣ ଏବଂ ଉତ୍ପାଦ ପ୍ରବାହ ଟ୍ରାକ୍ କରନ୍ତୁ',
    feature6Title: 'AI ଅନ୍ତର୍ଦୃଷ୍ଟି (KAI)',
    feature6Desc: 'ଚାହିଦା ପୂର୍ବାନୁମାନ, ଧାଡ଼ି ଆକଳନ ଏବଂ ସ୍ମାର୍ଟ ପରାମର୍ଶ',
    feature7Title: 'ରିଅଲ-ଟାଇମ୍ ଅପଡେଟ୍',
    feature7Desc: 'ପ୍ରତ୍ୟେକ ପଦକ୍ଷେପରେ ତୁରନ୍ତ ବିଜ୍ଞପ୍ତି ପାଆନ୍ତୁ',
    feature8Title: 'ବହୁ-ଫସଲ ସମର୍ଥନ',
    feature8Desc: 'ସମସ୍ତ ପ୍ରମୁଖ କୃଷି ଉତ୍ପାଦନ ପାଇଁ ସମ୍ପୂର୍ଣ୍ଣ ସମର୍ଥନ',

    produceCardTitle: 'ଜମିରୁ ସିଧା ବଜାରକୁ',
    produceCardSubtitle: 'ଏକ ସଶକ୍ତ ଆଗାମୀ କାଲି',
    footerAbout: 'KRAYAM ବିଷୟରେ',
    footerPrivacy: 'ଗୋପନୀୟତା ନୀତି',
    footerTerms: 'ସେବା ସର୍ତ୍ତାବଳୀ',
  },
};

export const getHomeText = (lang: Language): HomeTranslations => {
  return homeTranslations[lang] || homeTranslations.en;
};
