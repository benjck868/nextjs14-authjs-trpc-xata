"use client"
import { signOut, useSession } from 'next-auth/react'
import React, { ReactNode } from 'react'

export default function layout({children}:{children: ReactNode}) {
  const {data: session, status} = useSession()
  if(status === "authenticated"){
    console.log("login na")
  }
  console.log(status)
  return (
    <div>
        <div>
            auth layout
            <button onClick={()=>signOut()}>sign out</button>
        </div>
        {children}
    </div>
  )
}
