module.exports = {
  config: {
    productionTip: false,
    devtools: true
  },
  server: {
    host: '0.0.0.0',
    port: 3000
  },
  router: {
    linkActiveClass: 'active',
    middleware: 'home'
  },
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js',
  ]
}