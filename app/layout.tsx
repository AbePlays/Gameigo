import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import { Navbar } from '@components/Navbar';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme>
          <Navbar />
          <main className="p-4">{children}</main>
        </Theme>
      </body>
    </html>
  );
}
