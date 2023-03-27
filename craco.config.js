/* eslint-disable @typescript-eslint/no-var-requires, import/no-extraneous-dependencies */
const dotenvCra = require('dotenv-cra')
const path = require('path')

dotenvCra.config()

module.exports = {
  webpack: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
    ],
    alias: {
      '@assets': path.resolve(__dirname, './src/assets/'),
      '@components': path.resolve(__dirname, './src/components/'),
      '@views': path.resolve(__dirname, './src/views/'),
      '@src': path.resolve(__dirname, './src/'),
      '@styles': path.resolve(__dirname, './src/assets/styles/'),
      '@shared': path.resolve(__dirname, './src/shared/'),
      // '@stores': path.resolve(__dirname, './src/stores/'),
    }
  },
  // style: {
  //   postcssOptions: {
  //     plugins: [
  //       /* eslint-disable global-require */
  //       require('autoprefixer'),
  //     ],
  //   },
  // },
//   devServer: {
//     proxy: {
//       '/api': {
//         target: process.env.REACT_APP_DEV_PROXY,
//         secure: false,
//         changeOrigin: true,
//       },
//     },
//   },
}