module.exports = {
  config: {
    productionTip: false,
    devtools: true
  },

  router: {
    linkActiveClass: 'active'
  },
  plugins: [
    '~/plugins/request.js'
  ]
}