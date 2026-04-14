import type { Metadata } from 'next';
import localFont from 'next/font/local';
import {
  Cormorant_Garamond,
  Jost,
  DM_Mono,
  Noto_Serif_Malayalam,
  Manjari,
} from 'next/font/google';
import { Anek_Malayalam } from 'next/font/google';
import './globals.css';

function getMetadataBase() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.VERCEL_PROJECT_PRODUCTION_URL ||
    process.env.VERCEL_URL ||
    'http://localhost:3000';

  const normalizedSiteUrl = siteUrl.startsWith('http') ? siteUrl : `https://${siteUrl}`;
  return new URL(normalizedSiteUrl);
}

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const jost = Jost({
  variable: '--font-jost',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

const dmMono = DM_Mono({
  variable: '--font-dm-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

const notoSerifMalayalam = Noto_Serif_Malayalam({
  variable: '--font-noto-malayalam',
  subsets: ['malayalam'],
  weight: ['400', '700'],
  display: 'swap',
});

const manjari = Manjari({
  variable: '--font-manjari',
  subsets: ['malayalam', 'latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const annekMalayalam = Anek_Malayalam({
  variable: '--font-annek-malayalam',
  subsets: ['malayalam', 'latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

const dearScript = localFont({
  src: '../public/fonts/Dear Script (Demo_Font).otf',
  variable: '--font-dear-script',
  weight: '400',
  display: 'swap',
});

const castaThin = localFont({
  src: '../public/fonts/Casta-Thin.otf',
  variable: '--font-casta-thin',
  weight: '100',
  display: 'swap',
});

const vexaThin = localFont({
  src: '../public/fonts/VEXA thin.ttf',
  variable: '--font-vexa-thin',
  weight: '100',
  display: 'swap',
});

const vexaLight = localFont({
  src: '../public/fonts/VEXA light.ttf',
  variable: '--font-vexa-light',
  weight: '300',
  display: 'swap',
});

const vexaRegular = localFont({
  src: '../public/fonts/VEXA .ttf',
  variable: '--font-vexa-regular',
  weight: '400',
  display: 'swap',
});

const taBasheer = localFont({
  src: '../public/fonts/TA-Basheer.otf',
  variable: '--font-ta-basheer',
  weight: '400',
  display: 'swap',
});

const redHatDisplay = localFont({
  src: '../public/fonts/RedHatDisplay-Variable.ttf',
  variable: '--font-red-hat-display',
  weight: '100 900',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  title: 'Muhammed Adhil Nizami Baqawi weds Swaliha Febin Sanaa-iyya | 24 May 2026',
  description:
    'You are warmly invited to the wedding ceremony of Muhammed Adhil Nizami Baqawi and Swaliha Febin Sanaa-iyya on Sunday, 24 May 2026 at 11:00 AM. Barakallah!',
  openGraph: {
    title: 'Muhammed Adhil Nizami Baqawi weds Swaliha Febin Sanaa-iyya | 24 May 2026',
    description:
      'You are warmly invited to the wedding ceremony of Muhammed Adhil Nizami Baqawi and Swaliha Febin Sanaa-iyya on Sunday, 24 May 2026 at 11:00 AM.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammed Adhil Nizami Baqawi weds Swaliha Febin Sanaa-iyya',
    description: 'wedding ceremony - Sunday, 24 May 2026 at 11:00 AM',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      data-theme="light"
      data-lang="en"
      className={`
        ${cormorant.variable}
        ${jost.variable}
        ${dmMono.variable}
        ${notoSerifMalayalam.variable}
        ${manjari.variable}
        ${annekMalayalam.variable}
        ${dearScript.variable}
        ${castaThin.variable}
        ${vexaThin.variable}
        ${vexaLight.variable}
        ${vexaRegular.variable}
        ${taBasheer.variable}
        ${redHatDisplay.variable}
      `}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/assets/nasheed.mp3" as="audio" />
        <meta name="theme-color" content="#FAF6F0" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  );
}
