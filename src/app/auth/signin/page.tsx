import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../../components/ui/card'
import SigninWithOauth from '../../../components/auth/SigninWithOauth'
import Signin from '@/components/auth/Signin'
export default async function SignInPage() {
  const session = await auth()
  if(session){
    redirect('/')
  }
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
          <CardDescription>Enter your email below to create your account</CardDescription>
        </CardHeader>
        <CardContent>
          <Signin />
        </CardContent>
        <CardFooter className="flex flex-col">
          <SigninWithOauth />
        </CardFooter>
      </Card>
    </div>
  )
}
