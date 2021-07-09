import { Context } from '@azure/functions'

export type Next = (context: Context) => Promise<void> | void
export type Middleware = (context: Context, next: Next) => Promise<void> | void
