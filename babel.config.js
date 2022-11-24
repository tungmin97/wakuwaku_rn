module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '*': '.',
          '@root': './',
          '@src': './src',
          '@components': './src/components',
          '@assets': './src/assets',
          '@types': './src/types',
          '@navigations': './src/app/navigations',
          '@services': './src/services',
          '@screens': '.src/screens',
        },
      },
    ],
  ],
};
