const { test, expect } = require('@jest/globals')

const testText = 'test'

test('github-action-test', () => {
  expect(testText).toBe('test')
})

console.log('fix me')
