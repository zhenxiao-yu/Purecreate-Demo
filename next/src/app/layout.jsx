import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Purecreate Designer Studio',
  description: '3D clothing customizer with AI-powered logo and texture generation.',
  icons: { icon: '/favicon.png' },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
