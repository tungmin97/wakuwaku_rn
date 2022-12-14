module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': '.',
          '@root': './',
          '@screens': './src/screens',
          '@src': './src',
          '@app': './src/app',
          '@components': './src/components',
          '@assets': './src/assets',
          '@navigations': './src/app/navigations',
          '@services': './src/services',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
