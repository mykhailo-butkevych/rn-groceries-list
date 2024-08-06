module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
          api: './src/api',
          assets: './src/assets',
          components: './src/components',
          constants: './src/constants',
          hooks: './src/hooks',
          navigation: './src/navigation',
          screens: './src/screens',
          styles: './src/styles',
          utils: './src/utils',
          types: './src/types',
        },
      },
    ],
  ],
};
