module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: [
    '/node_modules',
    './src/part1.base',
    './src/part2.project',
  ],
};