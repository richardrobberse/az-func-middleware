import { AzureFunction, Context } from '@azure/functions'
import { Middleware } from './types'

export const withMiddleware = (azureFunction: AzureFunction, middlewares: Middleware[]): AzureFunction => {
  return async (context: Context) => {
    let prevIndex = -1
    const invokeMiddlewareChain = async (context: Context) => {
      const dispatch = async (index: number): Promise<void> => {
        if (index === prevIndex) {
          throw new Error('next() was called twice')
        }
        prevIndex = index
        const middleware = middlewares[index]
        if (middleware) {
          await middleware(context, () => {
            return dispatch(index + 1)
          })
        }
      }
      await dispatch(0)
    }

    await invokeMiddlewareChain(context)
    return await azureFunction(context)
  }
}
