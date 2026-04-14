import { Language } from './constants';

export interface Translations {
  bismillah: string;
  bismillahFull: string;
  enter: string;
  groom: string;
  bride: string;
  weds: string;
  countdown: string;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  eventArrived: string;
  location: string;
  groomVenue: string;
  brideVenue: string;
  openInMaps: string;
  addToCalendar: string;
  googleCalendar: string;
  appleCalendar: string;
  outlook: string;
  setReminder: string;
  reminderSet: string;
  reminderDenied: string;
  reminderUnsupported: string;
  reminderSetBrowser: string;
  reminderSetCalendar: string;
  reminderThirtyMinutes: string;
  reminderOneHour: string;
  reminderOneDay: string;
  download: string;
  flyer: string;
  reel: string;
  madeWith: string;
  sendLove: string;
  play: string;
  pause: string;
  theme: string;
  language: string;
  music: string;
  mute: string;
  unmute: string;
  volume: string;
  system: string;
  light: string;
  dark: string;
  dateTime: string;
  saveTheDate: string;
  weddingOf: string;
  weddingCeremony: string;
  openPreview: string;
  closePreview: string;
  fullscreen: string;
}

const en: Translations = {
  bismillah: 'بِسْمِ اللَّهِ',
  bismillahFull: 'بسم اللَّه الرحمن الرحيم',
  enter: 'Enter',
  groom: 'Groom',
  bride: 'Bride',
  weds: 'weds',
  countdown: 'Countdown',
  days: 'Days',
  hours: 'Hours',
  minutes: 'Minutes',
  seconds: 'Seconds',
  eventArrived: 'The moment has arrived — Barakallah!',
  location: 'Location',
  groomVenue: "Groom's Venue",
  brideVenue: "Bride's Venue",
  openInMaps: 'Open in Maps',
  addToCalendar: 'Add to Calendar',
  googleCalendar: 'Google Calendar',
  appleCalendar: 'Apple Calendar',
  outlook: 'Outlook / Other',
  setReminder: 'Set Reminder',
  reminderSet: 'Reminder saved.',
  reminderDenied: 'Browser notifications are blocked for this site. Use the downloaded calendar reminder or enable notifications in your browser settings.',
  reminderUnsupported: 'Browser notifications need a secure supported browser. The downloaded calendar reminder works on desktop and mobile.',
  reminderSetBrowser: 'Browser reminder saved for',
  reminderSetCalendar: 'Calendar reminder downloaded for',
  reminderThirtyMinutes: '30 minutes before',
  reminderOneHour: '1 hour before',
  reminderOneDay: '1 day before',
  download: 'Download',
  flyer: 'Wedding Flyer',
  reel: 'Wedding Reel',
  madeWith: 'Made with love',
  sendLove: 'Barakallah!',
  play: 'Play',
  pause: 'Pause',
  theme: 'Theme',
  language: 'Language',
  music: 'Music',
  mute: 'Mute',
  unmute: 'Unmute',
  volume: 'Volume',
  system: 'System',
  light: 'Light',
  dark: 'Dark',
  dateTime: 'Sunday · 24 May 2026 · 11 AM',
  saveTheDate: 'Save the Date',
  weddingOf: 'The Wedding of',
  weddingCeremony: 'Wedding Ceremony',
  openPreview: 'Open larger',
  closePreview: 'Close preview',
  fullscreen: 'Fullscreen',
};

const ar: Translations = {
  bismillah: 'بِسْمِ اللَّهِ',
  bismillahFull: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
  enter: 'دخول',
  groom: 'العريس',
  bride: 'العروس',
  weds: 'يتزوج',
  countdown: 'العد التنازلي',
  days: 'أيام',
  hours: 'ساعات',
  minutes: 'دقائق',
  seconds: 'ثوانٍ',
  eventArrived: 'لقد حانت اللحظة — بارك الله!',
  location: 'الموقع',
  groomVenue: 'مكان العريس',
  brideVenue: 'مكان العروس',
  openInMaps: 'فتح في الخرائط',
  addToCalendar: 'أضف إلى التقويم',
  googleCalendar: 'تقويم جوجل',
  appleCalendar: 'تقويم أبل',
  outlook: 'أوتلوك / أخرى',
  setReminder: 'تعيين تذكير',
  reminderSet: 'تم حفظ التذكير.',
  reminderDenied: 'تم حظر إشعارات المتصفح لهذا الموقع. استخدم ملف تذكير التقويم الذي تم تنزيله أو فعّل الإشعارات من إعدادات المتصفح.',
  reminderUnsupported: 'تحتاج إشعارات المتصفح إلى متصفح آمن ومدعوم. ملف تذكير التقويم الذي تم تنزيله يعمل على الجوال وسطح المكتب.',
  reminderSetBrowser: 'تم حفظ تذكير المتصفح لـ',
  reminderSetCalendar: 'تم تنزيل تذكير التقويم لـ',
  reminderThirtyMinutes: 'قبل 30 دقيقة',
  reminderOneHour: 'قبل ساعة واحدة',
  reminderOneDay: 'قبل يوم واحد',
  download: 'تحميل',
  flyer: 'بطاقة الزفاف',
  reel: 'فيديو الزفاف',
  madeWith: 'صُنع بمحبة',
  sendLove: 'بارك الله!',
  play: 'تشغيل',
  pause: 'إيقاف',
  theme: 'المظهر',
  language: 'اللغة',
  music: 'الموسيقى',
  mute: 'كتم',
  unmute: 'إلغاء الكتم',
  volume: 'مستوى الصوت',
  system: 'النظام',
  light: 'فاتح',
  dark: 'داكن',
  dateTime: 'الأحد · 24 مايو 2026 · 11 صباحًا',
  saveTheDate: 'احفظ التاريخ',
  weddingOf: 'حفل زفاف',
  weddingCeremony: 'حفل زفاف',
  openPreview: 'فتح بحجم أكبر',
  closePreview: 'إغلاق المعاينة',
  fullscreen: 'ملء الشاشة',
};

const ml: Translations = {
  bismillah: 'بِسْمِ اللَّهِ',
  bismillahFull: 'ബിസ്മില്ലാഹിർ റഹ്മാനിർ റഹീം',
  enter: 'പ്രവേശിക്കുക',
  groom: 'വരൻ',
  bride: 'വധു',
  weds: 'വിവാഹം',
  countdown: 'കൗണ്ട്ഡൗൺ',
  days: 'ദിവസങ്ങൾ',
  hours: 'മണിക്കൂറുകൾ',
  minutes: 'മിനിറ്റുകൾ',
  seconds: 'സെക്കൻഡുകൾ',
  eventArrived: 'ആ നിമിഷം വന്നിരിക്കുന്നു — ബാറകല്ലാഹ്!',
  location: 'സ്ഥലം',
  groomVenue: 'വരന്റെ വേദി',
  brideVenue: 'വധുവിന്റെ വേദി',
  openInMaps: 'മാപ്പിൽ തുറക്കുക',
  addToCalendar: 'കലണ്ടറിൽ ചേർക്കുക',
  googleCalendar: 'ഗൂഗിൾ കലണ്ടർ',
  appleCalendar: 'ആപ്പിൾ കലണ്ടർ',
  outlook: 'ഔട്ട്‌ലുക്ക് / മറ്റുള്ളവ',
  setReminder: 'റിമൈൻഡർ സജ്ജമാക്കുക',
  reminderSet: 'റിമൈൻഡർ സേവ് ചെയ്തു.',
  reminderDenied: 'ഈ സൈറ്റിനുള്ള ബ്രൗസർ അറിയിപ്പുകൾ തടഞ്ഞിരിക്കുന്നു. ഡൗൺലോഡ് ചെയ്ത കലണ്ടർ റിമൈൻഡർ ഉപയോഗിക്കുകയോ ബ്രൗസർ ക്രമീകരണത്തിൽ അറിയിപ്പുകൾ പ്രവർത്തനക്ഷമമാക്കുകയോ ചെയ്യുക.',
  reminderUnsupported: 'ബ്രൗസർ അറിയിപ്പുകൾക്കായി സുരക്ഷിതവും പിന്തുണയുള്ളതുമായ ബ്രൗസർ ആവശ്യമാണ്. ഡൗൺലോഡ് ചെയ്യുന്ന കലണ്ടർ റിമൈൻഡർ മൊബൈലിലും ഡെസ്‌ക്‌ടോപ്പിലും പ്രവർത്തിക്കും.',
  reminderSetBrowser: 'ബ്രൗസർ റിമൈൻഡർ സേവ് ചെയ്തത്',
  reminderSetCalendar: 'കലണ്ടർ റിമൈൻഡർ ഡൗൺലോഡ് ചെയ്തത്',
  reminderThirtyMinutes: '30 മിനിറ്റ് മുമ്പ്',
  reminderOneHour: '1 മണിക്കൂർ മുമ്പ്',
  reminderOneDay: '1 ദിവസം മുമ്പ്',
  download: 'ഡൗൺലോഡ്',
  flyer: 'വിവാഹ ഫ്ലയർ',
  reel: 'വിവാഹ റീൽ',
  madeWith: 'സ്നേഹത്തോടെ നിർമ്മിച്ചത്',
  sendLove: 'ബാറകല്ലാഹ്!',
  play: 'പ്ലേ',
  pause: 'താൽക്കാലികമായി നിർത്തുക',
  theme: 'തീം',
  language: 'ഭാഷ',
  music: 'സംഗീതം',
  mute: 'മ്യൂട്ട്',
  unmute: 'അൺമ്യൂട്ട്',
  volume: 'ശബ്ദനില',
  system: 'സിസ്റ്റം',
  light: 'ലൈറ്റ്',
  dark: 'ഡാർക്ക്',
  dateTime: 'ഞായർ · 2026 മെയ് 24 · രാവിലെ 11',
  saveTheDate: 'തീയതി സൂക്ഷിക്കുക',
  weddingOf: 'വിവാഹം',
  weddingCeremony: 'വിവാഹ ചടങ്ങ്',
  openPreview: 'വലുതാക്കി തുറക്കുക',
  closePreview: 'പ്രിവ്യൂ അടയ്ക്കുക',
  fullscreen: 'പൂർണ്ണസ്ക്രീൻ',
};

const translations: Record<Language, Translations> = { en, ar, ml };

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

export function t(lang: Language, key: keyof Translations): string {
  return translations[lang][key];
}
