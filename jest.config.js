module.exports = {
  collectCoverageFrom: ['(components|pages|containers)/**/*.{js,jsx,tsx}'],
  coveragePathIgnorePatterns: ['<rootDir>/pages/_(app|document).tsx'],
  moduleDirectories: ['node_modules', 'components', 'containers', 'icons', 'lib', 'utils', '<rootDir>'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'jsx'],
  moduleNameMapper: {
    '^@components(.*)$': '<rootDir>/components$1',
    '^@containers(.*)$': '<rootDir>/containers$1',
    '^@icons(.*)$': '<rootDir>/icons$1',
    '^@lib(.*)$': '<rootDir>/lib$1',
    '^@utils(.*)$': '<rootDir>/utils$1',
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png|jpeg)$': '<rootDir>/test/__mocks__/fileMock.js',
  },
  roots: ['<rootDir>'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next|cypress)[/\\\\]'],
  testEnvironment: 'jsdom',
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
    '\\.js$': '<rootDir>/node_modules/babel-jest',
  },
};
