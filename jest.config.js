'use strict';

const config = {
  transform: {
    '\\.[jt]s?$': 'babel-jest'
  },
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules/(?!d3-color)'],
  clearMocks: true
};

module.exports = config;
