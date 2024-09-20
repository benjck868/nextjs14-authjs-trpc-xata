"use client"

import { signOut } from "next-auth/react"
import Link from "next/link"
export function SigninButton(){
  return(
    <div>
      <Link href="/auth/signin">Signin</Link>
    </div>
  )
}
export default function SignoutButton() {
  return (
    <div><button onClick={()=>signOut({callbackUrl:"/auth/signin"})}>SignoutButton</button></div>
  )
}
