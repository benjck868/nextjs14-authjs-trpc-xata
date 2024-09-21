import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { RegularGithub, RegularGoogle } from "lineicons-react";

export default function SigninWithOauth() {
  return (
    <>
        <div className="relative w-full">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Button variant="outline" className="flex items-center justify-between gap-3">
                <RegularGoogle />
                Google
            </Button>
            <form action={async () => {
                "use server"
                await signIn("github")
                }}>
                <Button type="submit" variant="outline" className="flex items-center justify-between gap-3">
                    <RegularGithub />
                    GitHub
                </Button>
            </form>
        </div>
    </>
  )
}
