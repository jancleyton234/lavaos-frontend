import type { Metadata, Viewport } from 'next';
import { Inter, Geist } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";
import { Sidebar } from '@/components/layout/Sidebar';
import { Topbar } from '@/components/layout/Topbar';
import { GlobalProvider } from '@/context/GlobalContext';
import { AuthWrapper } from '@/components/layout/AuthWrapper';

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'LavaOS | Enterprise ERP',
  description: 'Sistema completo de gestão para Lavanderias Profissionais.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <GlobalProvider>
          <AuthWrapper sidebar={<Sidebar />} topbar={<Topbar />}>
            {children}
          </AuthWrapper>
        </GlobalProvider>
      </body>
    </html>
  );
}
