import type { Metadata } from 'next';
import { Quicksand } from 'next/font/google';
import './globals.css';
import Sidebar from './components/Sidebar/Sidebar';
import { Provider } from './components/Provider';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/libs/services/authOptions';

const quicksand = Quicksand({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Virtual Wallet',
  description: 'Virtual Wallet for everyday needs.',
};

export default async function RootLayout({children}: Readonly<{children: React.ReactNode;}>) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <Provider>
        <body className={quicksand.className}>
          {session ? <Sidebar/> : ''}
          {children}
        </body>
      </Provider>
    </html>
  );
}
