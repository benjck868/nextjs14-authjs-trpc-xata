import { initTRPC } from '@trpc/server';
import SuperJSON from 'superjson';
import { ZodError } from 'zod';
import { Context, createContext } from './context';

const t = initTRPC.context<Context>().create({
    errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.code === 'BAD_REQUEST' && error.cause instanceof ZodError
            ? error.cause.flatten()
            : null,
      },
    };
  },
    transformer: SuperJSON
})

export const router = t.router
export const publicProcedure = t.procedure