module.exports = {
  preset: "jest-expo",
  testPathIgnorePatterns: [
    "/node_modules/",
    "/android/",
    "/ios/",
    "/.history/"
  ],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "jest-styled-components"
  ],
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.tsx",
    "!src/**/*.test.tsx"
  ],
  coverageReporters: [
    "lcov"
  ]
}
