"use client"
import { SignInSchema } from '@/schemas/auth'
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { trpc } from '@/utils/clientTrpc'
import { redirect, useRouter } from 'next/navigation'

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
    email: "benjack@gmail.com",
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
    <div>
      <div>
        {errorMessage}
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <input type="email" name="email" className="input-text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
          <div>
            {formik.errors.email&&formik.touched.email&&formik.errors.email}
          </div>
        </div>
        <div>
          <input type="password" name="password" className="input-text" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
          <div>{formik.errors.password&&formik.touched.password&&formik.errors.password}</div>
        </div>
        <div>
          <button type="submit" disabled={isPending}>{isPending?"loading.....":"Login"}</button>
        </div>
      </form>
    </div>
  )
}

export default trpc.withTRPC(Signin)