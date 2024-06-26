import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

import { Navbar } from '@components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="lime">
            <Navbar />
            <main>{children}</main>
            <Toaster
              position="bottom-right"
              toastOptions={{
                error: {
                  className: '!bg-red-50 border border-red-300 !text-red-700',
                },
                success: {
                  className: '!bg-green-50 border border-green-300 !text-green-700',
                },
              }}
            />
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
