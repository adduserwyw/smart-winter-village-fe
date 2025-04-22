// This is only used by jest
module.exports = {
  sourceMaps: 'inline',
  presets: [
    'module:metro-react-native-babel-preset',
    '@babel/preset-env',
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          'react-tv-space-navigation': 'react-tv-space-navigation',
        },
      },
    ],
    ['@babel/plugin-proposal-class-properties', { loose: false }],
  ],
};
