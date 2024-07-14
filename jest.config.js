module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@app/(.*)$': '<rootDir>/src/app/$1',
    '^@entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@infra/(.*)$': '<rootDir>/src/infra/$1',
    '^@ioc/(.*)$': '<rootDir>/src/ioc/$1',
    '^@ui/(.*)$': '<rootDir>/src/ui/$1',
  },
};
