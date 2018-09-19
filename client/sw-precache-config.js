module.exports = {
  runtimeCaching:[{
    handler: 'networkOnly',
    urlPattern: /\/api\//,
  }, {
    handler:'fastest',
    urlPattern: /.*/,
  }],
  staticFileGlobs: ['build/**/*.{js,html,css,png,jpg,gif}'],
  stripPrefix: './build',
  swFilePath: './build/service-worker.js',
}
