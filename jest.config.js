module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: ["default"],
  collectCoverageFrom: [
    "src/**/*.{ts,tsx,js,jsx}"
  ],
  coverageReporters: ["cobertura"],
  modulePathIgnorePatterns: ["dist"],
  roots: ['tests']
};