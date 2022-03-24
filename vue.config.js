const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  publicPath: isProd ? '/apptest/booklendsys' : '/',
  outputDir: 'docs',
  filenameHashing: false,
  productionSourceMap: false
}