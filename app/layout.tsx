import { Theme } from '@radix-ui/themes'
import '@radix-ui/themes/styles.css'
import { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import { Rethink_Sans } from 'next/font/google'
import { Toaster } from 'react-hot-toast'

import { Navbar } from '@components/Navbar'
import './globals.css'

const rethink = Rethink_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-rethink',
})

export const metadata: Metadata = {
  icons: {
    icon: ['/favicons/favicon.ico'],
    apple: ['/favicons/apple-touch-icon.png'],
    shortcut: ['/favicons/apple-touch-icon.png'],
  },
  manifest: '/favicons/site.webmanifest',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className={rethink.className} lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class">
          <Theme accentColor="lime">
            <Navbar />
            <main>{children}</main>
            <Toaster
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
  )
}
