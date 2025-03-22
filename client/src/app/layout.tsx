import type { Metadata } from 'next';

import NextAuthSessionProvider from 'providers/sessionProvider';
import { ThemeProvider } from 'components/theme-provider';
import 'styles/globals.css';

export const metadata: Metadata = {
  title: 'bookworms',
  description: 'a social platform for book lovers',
  manifest: '/manifest.json',
  icons: '/img/worm.png'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
        <NextAuthSessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
