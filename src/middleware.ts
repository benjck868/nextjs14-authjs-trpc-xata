import { NextResponse } from "next/server"
import { auth } from "./auth"

export async function middleware(request:Request){
    const session = await auth()
    if(!session){
        return NextResponse.redirect(new URL("/auth/signin",request.url))
    }
    console.log("middleware is running: "+JSON.stringify(session))

    return NextResponse.next()
}

export const config = {
    matcher : ["/dashboard"]
}

