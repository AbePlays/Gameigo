import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';

import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Theme>{children}</Theme>
        {/* <Theme>{children}</Theme> */}
      </body>
    </html>
  );
}
