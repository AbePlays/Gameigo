module.exports = {
  collectCoverageFrom: ['(components|pages|containers)/**/*.{js,jsx,tsx}'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  moduleNameMapper: {
    '^@/components(.*)$': '<rootDir>/components$1',
    '^@/containers(.*)$': '<rootDir>/containers$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '\\.js$': '<rootDir>/node_modules/babel-jest',
  },
};
