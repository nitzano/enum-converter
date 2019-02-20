module.exports = {
  testEnvironment: 'node',
  verbose: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/__tests__/prod/',
    '/__tests__/utils/',
    '/__tests__/samples/',
    '/build/'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node']
};
