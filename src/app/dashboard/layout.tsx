import { auth } from '@/auth'
import UserMenu from '@/components/UserMenu'
import React, { ReactNode, Suspense } from 'react'

export default async function DashboardLayout({children}:{children:ReactNode}) {
  return (
    <div>
        <UserMenu />
        {children}
    </div>
  )
}
