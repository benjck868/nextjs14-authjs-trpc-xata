"use client"
import { signIn} from 'next-auth/react'
import { SignInSchema } from '@/schemas/auth'
import { useFormik } from 'formik'
import React from 'react'
import { z } from 'zod'
import { toFormikValidationSchema } from 'zod-formik-adapter'

export default function Signin() {
  const initialValues: z.infer<typeof SignInSchema> = {
    email: "benjack@gmail.com",
    password: "xxxxxxssssss"
  }
  const formik = useFormik({
    initialValues : initialValues,
    validationSchema: toFormikValidationSchema(SignInSchema),
    onSubmit: async(values) => {
      const login = await signIn("credentials",values)
      console.log(JSON.stringify(login))
    }

  })
  return (
    <div>
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
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  )
}
