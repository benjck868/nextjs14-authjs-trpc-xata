import { publicProcedure, router } from "./server";
import { SignupSchema } from "@/schemas/auth";
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
    })
})

export type AppRouter = typeof appRouter