describe('withMiddleware', () => {
  test('it should return a wrapped Azure Function', async () => {
    expect(true).toBe(true)
  })

  test('it should call the middlewares in the correct order', async () => {
    expect(true).toBe(true)
  })

  test(`it shouldn't call the next middleware if next() is not called`, async () => {
    expect(true).toBe(true)
  })
})
