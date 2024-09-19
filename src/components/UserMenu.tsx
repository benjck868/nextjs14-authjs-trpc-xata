import { auth } from "@/auth"
import SignoutButton from "./SignoutButton"

export default async function UserMenu() {
    const session = await auth()
    if(!session) return null
    if(session.user === undefined) return null
    const user = session.user

  return (
    <div>
        {user.name}
        <SignoutButton/>
    </div> 
  )
}
