"use client"
import { SignInSchema } from '@/schemas/auth'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { trpc } from '@/utils/clientTrpc'
import { redirect, useRouter } from 'next/navigation'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Label } from '@radix-ui/react-label'
import { Input } from '../ui/input'
import { signIn } from '@/auth'
import { RegularGoogle, RegularGithub } from 'lineicons-react'
import { Alert, AlertDescription } from '../ui/alert'
import SigninWithOauth from './SigninWithOauth'

function Signin() {
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("")
  const {mutate,data,isPending,error} = trpc.signin.useMutation()
  useEffect(()=>{
    if(data){
      console.log(data)
      redirect('/dashboard')
    }
    if(error){
      setErrorMessage(error.message)
    }
  }, [data, error, router])
  const initialValues:z.infer<typeof SignInSchema> = {
    email: "",
    password: ""
  }
  const formik = useFormik({
    initialValues : initialValues,
    validationSchema: toFormikValidationSchema(SignInSchema),
    onSubmit: async(values) => {
       mutate(values)
    }
  })
  
  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="m@example.com"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="text-xs text-red-400">
              {formik.errors.email&&formik.touched.email&&formik.errors.email}
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            <div className="text-xs text-red-400">
              {formik.errors.password&&formik.touched.password&&formik.errors.password}
            </div>
          </div>
        </div>
        <Button className="w-full mt-6" type="submit" disabled={isPending}>
          {isPending ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>
      {error && (
        <Alert variant="destructive" className="mt-4">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </>
  )
}

export default trpc.withTRPC(Signin)