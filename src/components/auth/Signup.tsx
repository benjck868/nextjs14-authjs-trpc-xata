"use client"
import { z } from 'zod'
import { trpc } from '@/utils/clientTrpc'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { SignupSchema } from '@/schemas/auth'
import { useEffect } from 'react'

function Signup() {
    const {mutate, error, isError, isPending, data} = trpc.signup.useMutation()
    const initialValues:z.infer<typeof SignupSchema> = {
        name: "",
        email: "",
        password: "",
        password2: "",
    }
    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: toFormikValidationSchema(SignupSchema),
        onSubmit: values => {
            mutate(values)          
        }
    })
    useEffect(()=>{
        if(data){
            console.log(data)
        }   
        if(isError){
            console.log(JSON.stringify(error))
        } 
    },[data, isError])

    if(data){
        return(
            <div>
                User created. Click login to proceed.
            </div>
        )
    }

  return (
    <div className="w-1/4 ">
        <form onSubmit={formik.handleSubmit}>
            <div className="relative">
                <div>
                    <input type='text' className="input-text h-8" name='name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
                </div>
                <div>
                    {formik.errors.name&&formik.touched.name&&formik.errors.name}
                </div>
            </div>
            <div className="relative">
                <div>
                    <input type='text' className="input-text" name='email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                </div>
                <div>
                    {formik.errors.email&&formik.touched.email&&formik.errors.email}
                    {error&&error.message}
                </div>
            </div>
            <div className="relative">
                <div>
                    <input type='text' className="input-text" name='password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                </div>
                <div>
                    {formik.errors.password&&formik.touched.password&&formik.errors.password}
                </div>
            </div>
            <div className="relative">
                <div>
                    <input type='text' className="input-text" name='password2' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password2}/>
                </div>
                <div>
                    {formik.errors.password2&&formik.touched.password2&&formik.errors.password2}
                </div>
            </div>
            <div>
                <input type='submit' value={isPending?"Submitting":"Signup"} disabled={isPending}/>
            </div>
        </form>
    </div>
  )
}
export default trpc.withTRPC(Signup)