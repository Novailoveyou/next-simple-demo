import 'server-only'
import type { Metadata } from 'next'
import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/theme-provider'
import SWRProvider from '@/components/swr-provider'
import { ProductsProvider } from '@/app/_store'

const fontSans = FontSans({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Продукты',
  description: 'Это простое демо-приложение для тест-задания',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body className={cn(fontSans.variable, fontSans.className)}>
        <ProductsProvider>
          <SWRProvider>
            <ThemeProvider
              attribute='class'
              defaultTheme='system'
              enableSystem
              disableTransitionOnChange>
              {children}
              <Toaster />
            </ThemeProvider>
          </SWRProvider>
        </ProductsProvider>
      </body>
    </html>
  )
}
