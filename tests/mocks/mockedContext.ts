import { Context } from '@azure/functions'

export default {
  invocationId: '',
  bindingData: {},
  executionContext: {
    invocationId: '',
    functionName: '',
    functionDirectory: '',
  },
  bindings: {
    outbound: {},
  },
  traceContext: {
    traceparent: '',
    attributes: {},
    tracestate: '',
  },
  bindingDefinitions: [],
  log: (function () {
    const main = <any>jest.fn(message => message)
    const info = jest.fn(message => message)

    main.info = info
    main.error = info
    main.verbose = info

    return main
  })(),
  done: jest.fn(error => error),
} as Context
