import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@propelauth/react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "Blu AI",
  description: "Blu AI audits your code for environmental impact and provides suggestions for improvement.",
  keywords: "Environment, Code, Carbon, Water, Impact, Suggestions, Improvement, Blu AI",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">


      <body className={inter.className}>{children}</body>

      
    </html>
  )
}
