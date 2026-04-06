export const WEDDING = {
  groom: 'Muhammed Adhil Nizami Baqawi',
  bride: 'Swaliha Febin Sanaa-iyya',
  date: '2026-05-24',
  time: '11:00',
  dateDisplay: 'Sunday · 24 May 2026 · 11 AM',
  // IST is UTC+5:30
  targetDate: new Date('2026-05-24T11:00:00+05:30'),
  reminderDate: new Date('2026-05-24T10:30:00+05:30'),
  groomVenue: {
    name: 'O C Family',
    lat: 11.316475,
    lng: 75.999092,
    mapUrl: 'https://maps.google.com/?q=11.316475,75.999092',
  },
  brideVenue: {
    name: 'Febi House',
    lat: 11.451658,
    lng: 75.963959,
    mapUrl: 'https://maps.google.com/?q=11.451658,75.963959',
  },
} as const;

export const THEME_COLORS = {
  light: {
    bg: '#FAF6F0',
    surface: '#FFFFFF',
    primary: '#C5943A',
    secondary: '#2D6A4F',
    text: '#1A1209',
    textSecondary: '#6B5B3E',
    border: '#E8D5B0',
  },
  dark: {
    bg: '#0D0A07',
    surface: '#1A1510',
    primary: '#D4A84B',
    secondary: '#3A8C65',
    text: '#F5EDD8',
    textSecondary: '#A89070',
    border: '#2C2318',
  },
} as const;

export type ThemeMode = 'system' | 'light' | 'dark';
export type Language = 'en' | 'ar' | 'ml';
