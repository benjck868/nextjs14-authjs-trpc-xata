import { appRouter } from "@/server";
import { createContext } from "@/server/context";
import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
const handler = async (req: Request)=>  fetchRequestHandler({
    onError:(opts)=>{
        const {error} = opts
        if(error.code === "METHOD_NOT_SUPPORTED"){
            return("not supported")
        }
    },
    endpoint: "/api/trpc",
    req,
    router: appRouter,
    createContext: createContext
})

export {handler as GET, handler as POST}