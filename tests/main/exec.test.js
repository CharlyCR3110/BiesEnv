import { test, expect } from '@jest/globals'

describe('temporal tests', () => {
  // 1+1 = 2
  test('1+1=2', () => {
    const result = 1 + 1
    expect(result).toBe(2)
  })
})
