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
