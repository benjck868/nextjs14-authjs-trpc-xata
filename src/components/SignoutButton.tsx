"use client"

import { signOut } from "next-auth/react"
export default function SignoutButton() {
  return (
    <div><button onClick={()=>signOut({callbackUrl:"/auth/signin"})}>SignoutButton</button></div>
  )
}
