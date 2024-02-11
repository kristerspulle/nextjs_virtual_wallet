import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Provider } from './components/Provider';

const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Virtual Wallet',
  description: 'Virtual Wallet for everyday needs.',
};

export default function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {

  return (
    <html lang="en">
      <Provider>
        <body className={quicksand.className}>
          <Sidebar/>
          {children}
        </body>
      </Provider>
    </html>
  );
}
