import Link from "next/link";
import UserMenu from "./UserMenu";

export default function Navbar() {
  return (
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
            <UserMenu />
        </div>
    </div>
  )
}
