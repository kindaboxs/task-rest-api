import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: true,
}, {
  rules: {
    'no-console': 'off',
    'node/prefer-global/process': 'off',
  },
})
