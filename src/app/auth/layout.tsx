"use client"
import { signOut, useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

export default function AuthLayout({children}:{children: ReactNode}) {
  const {data: session, status} = useSession()
  if(status === "authenticated"){
    console.log("login na")
  }
  return (
    <div>
        {children}
    </div>
  )
}
