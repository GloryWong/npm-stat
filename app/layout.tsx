import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Divider, Spinner } from '@nextui-org/react'
import dynamic from 'next/dynamic'
import Footer from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NPM Status',
  description: 'NPM package status',
}

// Dynamically import Providers with no SSR
const Providers = dynamic(() => import('./providers').then(mod => mod.Providers), { ssr: false, loading: () => <Spinner /> })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} h-screen w-screen flex flex-col`}>
        <div className="flex-grow min-h-0 flex justify-center items-center">
          <Providers>
            {children}
          </Providers>
        </div>
        <Divider />
        <Footer />
      </body>
    </html>
  )
}
