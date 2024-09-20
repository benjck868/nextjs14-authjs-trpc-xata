import { auth } from '@/auth'
import Navbar from '@/components/Navbar'
import UserMenu from '@/components/UserMenu'
import React, { ReactNode, Suspense } from 'react'

export default async function DashboardLayout({children}:{children:ReactNode}) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
        {children}
      </div>
    </div>
  )
}
