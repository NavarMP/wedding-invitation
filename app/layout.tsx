import type { Metadata } from 'next';
import {
  Cormorant_Garamond,
  Jost,
  DM_Mono,
  Amiri,
  Cairo,
  Noto_Serif_Malayalam,
  Manjari,
} from 'next/font/google';
import './globals.css';

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

const amiri = Amiri({
  variable: '--font-amiri',
  subsets: ['arabic', 'latin'],
  weight: ['400', '700'],
  display: 'swap',
});

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['arabic', 'latin'],
  weight: ['300', '400', '500', '600'],
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

export const metadata: Metadata = {
  title: 'Muhammed Adhil Nizami Baqawi weds Swaliha Febin Sanaa-iyya | 24 May 2026',
  description:
    'You are warmly invited to the Nikah ceremony of Muhammed Adhil Nizami Baqawi and Swaliha Febin Sanaa-iyya on Sunday, 24 May 2026 at 11:00 AM. Barakallah!',
  openGraph: {
    title: 'Muhammed Adhil Nizami Baqawi weds Swaliha Febin Sanaa-iyya | 24 May 2026',
    description:
      'You are warmly invited to the Nikah ceremony of Muhammed Adhil Nizami Baqawi and Swaliha Febin Sanaa-iyya on Sunday, 24 May 2026 at 11:00 AM.',
    images: [{ url: '/assets/flyer.jpg', width: 800, height: 1000, alt: 'Wedding Invitation Flyer' }],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammed Adhil Nizami Baqawi weds Swaliha Febin Sanaa-iyya',
    description: 'Nikah Ceremony — Sunday, 24 May 2026 at 11:00 AM',
    images: ['/assets/flyer.jpg'],
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
        ${amiri.variable}
        ${cairo.variable}
        ${notoSerifMalayalam.variable}
        ${manjari.variable}
      `}
      suppressHydrationWarning
    >
      <head>
        <link rel="preload" href="/assets/nasheed.mp3" as="audio" />
        <meta name="theme-color" content="#C5943A" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body>{children}</body>
    </html>
  );
}
