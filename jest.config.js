/** @type {import('jest').Config} */
const config = {
  preset: "ts-jest",
  testEnvironment: "node",
  moduleNameMapping: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testMatch: [
    "**/__tests__/**/*.test.(ts|tsx|js)",
    "**/*.(test|spec).(ts|tsx|js)",
  ],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
};

export default config;
