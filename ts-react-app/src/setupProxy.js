// config for v0.x.x 
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy('/api/**/*.action', {
      target: 'http://localhost:4001',
      pathRewrite(path) {
        return path.replace('/api', '').replace('.action', '.json')
      }
    })
  )
}