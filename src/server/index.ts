import { signIn } from "@/auth";
import { publicProcedure, router } from "./server";
import { SignInSchema, SignupSchema } from "@/schemas/auth";
import { TRPCError } from "@trpc/server";
import bcryptjs from 'bcryptjs'

export const appRouter = router({
    signup : publicProcedure.input(SignupSchema).mutation(async ({ctx, input})=>{
        const {prisma} = ctx
        const hashedPassword = await bcryptjs.hash(input.password, 10)
        const checkEmailToDatabaseIfExist = await prisma.user.findUnique({where: {email: input.email}, select:{email: true, name: true}})
        if(checkEmailToDatabaseIfExist){
            throw new TRPCError({
                code: "BAD_REQUEST",
                cause: "user_already_exist_in_database",
                message: `This ${input.email} already in used.`
            })
        }
        const newUser = await prisma.user.create({
            data: {
                name: input.name,
                email: input.email,
                password : hashedPassword
            }
        })
        return newUser
    }),
    signin: publicProcedure.input(SignInSchema).mutation(async ({ctx, input})=>{
        const {email, password} = input
        const {prisma} = ctx
        const dbuser = await prisma.user.findUnique({where:{email: email},select:{
            email: true,
            password: true
        }})
        let comparePassword = false
        
        if(!dbuser) throw new TRPCError({code:"BAD_REQUEST", message:"Incorrect credentials."})
        if(dbuser.password){
            comparePassword = await bcryptjs.compare(password, dbuser.password)
        }
        if(!comparePassword) throw new TRPCError({code:"BAD_REQUEST", message:"Incorrect password."})
        const signinUserUsingCredentials = await signIn("credentials", {email: email, password: password, redirect:false})
        return dbuser
    })
})

export type AppRouter = typeof appRouter