import { AzureFunction, Context } from '@azure/functions'
import 'jest-extended'
import withMiddleware from '../src/withMiddleware'
import mockedContext from './mocks/mockedContext'
import { Next } from '../src/types'

const mockedAzureFunction: AzureFunction = async () => {}

describe('withMiddleware', () => {
  test('it should return a wrapped Azure Function', async () => {
    const wrapped = withMiddleware(mockedAzureFunction, [])
    expect(typeof wrapped).toBe('function')
  })

  test('it should call the middlewares in the correct order', async () => {
    const middleware1 = jest.fn().mockResolvedValue(Promise.resolve())
    const middleware2 = jest.fn().mockResolvedValue(Promise.resolve())
    const wrapped = withMiddleware(mockedAzureFunction, [middleware1, middleware2])

    await wrapped(mockedContext)

    expect(middleware1).toHaveBeenCalledBefore(middleware2)
  })

  test(`it should call the next middleware if next() is called`, async () => {
    const middleware1 = jest.fn(async (context: Context, next: Next) => {
      await next(context)
    })
    const middleware2 = jest.fn().mockResolvedValue(Promise.resolve())

    const wrapped = withMiddleware(mockedAzureFunction, [middleware1, middleware2])

    await wrapped(mockedContext)

    expect(middleware1.mock.calls.length).toBe(1)
    expect(middleware2.mock.calls.length).toBe(1)
  })

  test(`it shouldn't call the next middleware if next() is not called`, async () => {
    const middleware1 = jest.fn((context: Context, next: Next) => {})
    const middleware2 = jest.fn().mockResolvedValue(Promise.resolve())

    const wrapped = withMiddleware(mockedAzureFunction, [middleware1, middleware2])

    await wrapped(mockedContext)

    expect(middleware1.mock.calls.length).toBe(1)
    expect(middleware2.mock.calls.length).toBe(0)
  })

  test(`it throws the expected error when next() is called twice`, async () => {
    const middleware1 = jest.fn(async (context: Context, next: Next) => {
      await next(context)
      await next(context)
    })

    const wrapped = withMiddleware(mockedAzureFunction, [middleware1])

    await expect(wrapped(mockedContext)).rejects.toThrow(new Error('next() was called twice'))
  })
})
