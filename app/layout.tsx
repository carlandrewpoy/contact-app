// 'use client'

import './globals.css'
import { Inter } from 'next/font/google'
// import { useState } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Contact App',
  description: 'Contact app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // const [theme, setTheme] = useState<boolean>(false)
  return (
    // <html data-theme={`${ theme ? 'light' : 'dark'}`} lang="en">
    <html lang="en">
      <body className={`${inter.className} p-4`}>
        {/* <button onClick={() => setTheme(!theme)}  className='btn btn-outline'>Theme</button> */}
        {children}
      </body>
    </html>
  )
}
