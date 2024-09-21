import { auth } from "@/auth"
import SignoutButton, { SigninButton } from "./SignoutButton"

export default async function UserMenu() {
    const session = await auth()


  return (
    <div>
        {session?.user?.name}{session&&<SignoutButton/> }
    </div> 
  )
}
