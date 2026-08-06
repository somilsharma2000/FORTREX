import type { Metadata } from 'next';
import { Inter, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-cormorant', display: 'swap' });

export const metadata: Metadata = {
  title: 'FORTREX — Elite Trading Tournaments',
  description: 'Join the most prestigious trading community. Compete in elite tournaments, earn Forts, win funded accounts. Your fortress of opportunity.',
  keywords: ['forex', 'trading', 'tournament', 'prop firm', 'funded account', 'trading competition'],
  openGraph: {
    title: 'FORTREX — Elite Trading Tournaments',
    description: 'Join the most prestigious trading community. Compete, earn, win.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
