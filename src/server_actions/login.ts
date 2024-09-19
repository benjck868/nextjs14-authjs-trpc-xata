"use server"
import { signIn } from "@/auth";
import { SignInSchema } from "@/schemas/auth";
import { AuthError, CredentialsSignin } from "next-auth";
import { z } from "zod";

export async function login_user_using_credentials(formdata:FormData) {
    const email = formdata.get("email")
    const password = formdata.get("password")
    //console.log(email , password)
    try {
        const safeParse = SignInSchema.safeParse(formdata)
        if(!safeParse.success) return safeParse.error
        
    }
    catch(e){
        if(e instanceof CredentialsSignin){
            
        }
    }
    
}