import { signIn } from '@/auth'
import Navbar from '@/components/Navbar'
import { SigninButton } from '@/components/SignoutButton'
import { Button } from '@/components/ui/button'
import UserMenu from '@/components/UserMenu'
import prisma from '@/lib/db'
import Link from 'next/link'

export default async function Home() {
  const user = await prisma.account.findFirst()
  return (
    <div>
      <div className="h-14 bg-cyan-300 px-7 flex justify-between items-center">
          <div>
              app
          </div>
          <div className="flex gap-x-2 items-center">
              <Link href="/">
                  Home
              </Link>
              <Link href="/dashboard">
                  Dashboard
              </Link>
              <SigninButton />
              <Button >Click me babe.</Button>
          </div>
      </div>
      <form action={async () => {
          "use server"
          await signIn("github")
        }}>
        <button type='submit'>sign in with git shit</button>
      </form>
    </div>
  )
}
