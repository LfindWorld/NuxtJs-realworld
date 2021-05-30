const cookieparser = process.server ? require('cookieparser') : undefined

export const state = () => {
  return {
    user: null,
    staticImg: 'https://static.productionready.io/images/smiley-cyrus.jpg'
  }
}
export const mutations = {
  setUser (state, user) {
    state.user = user
  }
}
export const actions = {
  // 服务器初始化调用，用户信息持久化
  nuxtServerInit ({ commit }, { req }) {
    let user = null
    if (req.headers.cookie) {
      const parsed = cookieparser.parse(req.headers.cookie)
      try {
        user = JSON.parse(parsed.user)
      } catch (err) {
        // No valid cookie found
      }
    }
    commit('setUser', user)
  }
}
