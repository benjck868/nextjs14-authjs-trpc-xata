import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import Github from "next-auth/providers/github"
import Credentials from "next-auth/providers/credentials"
import bcryptjs from "bcryptjs"
import { SignInSchema } from "./schemas/auth";
import prisma from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { z } from "zod";

export const {handlers, signIn, signOut, auth} = NextAuth({
    adapter: PrismaAdapter(prisma),
    session: {
      strategy: "jwt"
    },
    pages: {
        signIn: "/auth/signin",
    },
    providers: [
        Github,
        Credentials({
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      credentials: {
        email: {
            name: "email"
        },
        password: {
            name:"password"
        },
      },
      authorize: async (credentials) => {  
        if(!credentials) return null
        if(credentials && "email" in credentials && typeof credentials.email === "string" ){
          const user = prisma.user.findUnique({where: {email: credentials.email}})
          return user
        }
        return null
      },
    }),
    ]    
})