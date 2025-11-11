import type { Metadata } from 'next';
import { HelpButton } from '@/components/HelpButton';
import './globals.css';

export const metadata: Metadata = {
  title: 'SwapRunn - Vehicle Logistics Platform',
  description: 'Connect dealerships with verified drivers for fast, reliable vehicle deliveries and swaps.',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%23E50914" width="100" height="100" rx="20"/><text x="50" y="65" font-size="60" font-weight="bold" fill="white" text-anchor="middle" font-family="Arial">SR</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#E50914" />
      </head>
      <body className="bg-swaprunn-off-white text-swaprunn-black">
        {children}
        <HelpButton />
      </body>
    </html>
  );
}
