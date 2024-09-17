import { signIn } from '@/auth'
import prisma from '@/lib/db'

export default async function Home() {
  const user = await prisma.account.findFirst()
  return (
    <div>
      <form action={async () => {
        "use server"
        await signIn("github")
      }}>
        <button type='submit'>sign in with git shit</button>
      </form>
    </div>
  )
}
