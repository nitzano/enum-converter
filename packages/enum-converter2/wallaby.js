module.exports = function() {
  return {
    files: [
      'src/**/*.ts',
      '__tests__/utils/*.ts',
      '!src/**/*.spec.ts',
      {
        pattern: '__tests__/samples/**/*',
        instrument: false
      }
    ],

    tests: ['src/**/*.spec.ts', '!src/cli/*.spec.ts'],

    env: {
      type: 'node',
      runner: 'node'
    },

    testFramework: 'jest'
  };
};
