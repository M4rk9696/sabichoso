module.exports = {
  extends: 'standard',
  plugins: ['prettier', 'mocha'],
  rules: {
    'prettier/prettier': 'error',
    'mocha/no-exclusive-tests': 'error'
  }
}
