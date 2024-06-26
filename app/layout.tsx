import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { ThemeProvider } from 'next-themes';

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
          </Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
