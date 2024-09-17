import prisma from "@/lib/db";

export async function createContext(){
    const session = {user_id : "asdsadasd"}
    return {
        prisma,
        session
    }
}

export type Context = typeof createContext