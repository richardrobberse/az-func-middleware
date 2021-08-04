![master](https://github.com/richardrobberse/az-func-middleware/actions/workflows/main.yml/badge.svg?branch=master)

# az-func-middleware

Simple middleware for Azure Functions

## Installation

`npm install az-func-middleware`

## Usage

Let's say you have the following HTTP Trigger:

```TypeScript
const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  context.res = {
    body: "This HTTP triggered function executed successfully."
  }
}

export default httpTrigger
```

You can simply wrap it using the `withMiddleware` function and pass an array of middlewares:

```TypeScript
const myMiddleware = async (context: Context, next: Next) => {
  // run your logic
  // ...

  // call next() whenever you want to invoke the next middleware in the chain
  await next(context)
}

export default withMiddleware(httpTrigger, [myMiddleware])

```

## Use cases

### Mutating the context in your middleware

```TypeScript
const myMiddleware = async (context: Context, next: Next) => {
  context.res = {
    status: 401,
    body: { message: 'You do not have access' }
  }

  // call next depending on your use-case
  await next(context)
}

export default withMiddleware(httpTrigger, [myMiddleware])

```

Make sure your function does not execute when the response is already set.

```TypeScript
const httpTrigger: AzureFunction = async function (context: Context): Promise<void> {
  if(context.res) return
}

export default withMiddleware(httpTrigger, [myMiddleware])
```
