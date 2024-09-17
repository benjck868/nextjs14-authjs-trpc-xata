import NextAuth from "next-auth";
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import { SignInSchema } from "./schemas/auth";
import prisma from "./lib/db";

export const {handlers, signIn, signOut, auth} = NextAuth({
    pages: {
        signIn: "/auth/signin",
    },
    providers: [
        Github,
        Credentials({
            credentials: {
                email: {label: "password", type: "text"},
                password: {label:"password", type: "password"}
            },
            authorize: async (credentials)=> {
                const validateLoginInputFields = SignInSchema.safeParse(credentials)
                if(validateLoginInputFields.success){
                    console.log(JSON.stringify(validateLoginInputFields.data))
                    const {email, password} = validateLoginInputFields.data
                    const user = await prisma.user.findUnique({where:{email:email}})
                    if(!user || !user.password) return null
                    const passwordMatch = await bcryptjs.compare(password, user.password)
                    if(passwordMatch){
                        return user
                    }
                }
                
                return null
            }
        })
    ]    
})