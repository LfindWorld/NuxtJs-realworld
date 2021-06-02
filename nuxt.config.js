module.exports = {
  config: {
    productionTip: false,
    devtools: true
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