import { z } from "zod"

export const SignupSchema = z.object({
    name: z.string({required_error:"Name is required."}).min(2,"Name must be 2 characters long."),
    email: z.string({required_error:"Email is required."}).email("Invalid email address"),
    password: z.string({required_error:"Password is required."}).min(5,"Password length atleast 5 characters."),
    password2: z.string()
}).superRefine(({password, password2},ctx)=>{
    if(password2 !== password){
        ctx.addIssue({
            code: "custom",
            message: "The password did not match.",
            path: ["password2"]
        })
    }
})

export const SignInSchema = z.object({
    email: z.string({required_error: "Email is required"}).email(),
    password: z.string({required_error: "Please provide a password."})
})